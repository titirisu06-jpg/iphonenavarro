import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, Box, Home, List } from 'lucide-react';
import { products as localProducts } from '../data/products';
import { ProductFormModal } from './ProductFormModal';
import { VariantListModal } from './VariantListModal';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [managingVariantsFor, setManagingVariantsFor] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
    }
    fetchProducts();
  };

  const fetchProducts = async () => {
    setLoading(true);
    if (!import.meta.env.VITE_SUPABASE_URL) {
      // Mock data local si no hay SB
      setProducts(localProducts);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching products', error);
      // Fallback a local
      setProducts(localProducts);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.auth.signOut();
    }
    navigate('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setProducts(products.filter(p => p.id !== id));
      return;
    }

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-iphone-blue rounded-lg flex items-center justify-center">
            <Box size={16} color="white" />
          </div>
          <span className="font-bold text-ink">iPhone Navarro</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-ink-secondary hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <List size={22} className="rotate-90 transition-transform" /> : <List size={22} />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-[80] lg:z-0
        w-72 lg:w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-full
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="hidden lg:flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-iphone-blue rounded-lg flex items-center justify-center">
            <Box size={16} color="white" />
          </div>
          <span className="font-bold text-ink">iPhone Navarro</span>
        </div>

        <nav className="flex-1 space-y-2 lg:mt-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-iphone-blue/10 text-iphone-blue rounded-xl font-medium text-sm transition-colors">
            <Box size={18} /> Productos
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-ink-secondary hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">
            <Home size={18} /> Volver a la Web
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition-colors mt-auto"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink mb-1">Catálogo de Productos</h1>
              <p className="text-ink-tertiary text-sm">Administrá tu inventario, precios y unidades.</p>
            </div>
            <button 
              onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
              className="btn-primary w-full sm:w-auto" 
              style={{ padding: '12px 20px', borderRadius: 12 }}
            >
              <Plus size={18} /> Nuevo Producto
            </button>
          </header>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-20 lg:mb-0">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-ink-secondary font-semibold">
                    <th className="p-4">Producto</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={4} className="p-8 text-center text-ink-tertiary">Cargando catálogo...</td></tr>
                  ) : products.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-ink-tertiary">No tenés productos cargados.</td></tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100" />
                            <div>
                              <p className="font-bold text-ink">{product.name}</p>
                              <p className="text-xs text-ink-tertiary font-mono">{product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-ink-secondary border border-gray-200">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-ink">
                          {product.currency === 'USD' ? 'U$D' : '$'} {product.price}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => setManagingVariantsFor(product)} 
                                className="p-2 text-ink-secondary hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Gestionar Variantes"
                            >
                              <List size={16} />
                            </button>
                            <button 
                                onClick={() => { setEditingProduct(product); setIsProductModalOpen(true); }}
                                className="p-2 text-ink-secondary hover:text-iphone-blue hover:bg-iphone-blue/10 rounded-lg transition-colors"
                                title="Editar Producto"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(product.id)} 
                                className="p-2 text-ink-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar Producto"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
              {loading ? (
                <div className="p-8 text-center text-ink-tertiary">Cargando catálogo...</div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-ink-tertiary">No tenés productos cargados.</div>
              ) : (
                products.map(product => (
                  <div key={product.id} className="p-4 flex flex-col gap-4 active:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-contain bg-gray-50 p-2 border border-gray-100" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-ink truncate pr-2">{product.name}</p>
                          <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-ink-secondary border border-gray-200">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-iphone-blue mb-1">
                          {product.currency === 'USD' ? 'U$D' : '$'} {product.price}
                        </p>
                        <p className="text-[10px] text-ink-tertiary font-mono truncate">{product.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                      <button 
                        onClick={() => setManagingVariantsFor(product)} 
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-50 text-purple-600 rounded-xl font-bold text-xs"
                      >
                        <List size={14} /> Variantes
                      </button>
                      <button 
                        onClick={() => { setEditingProduct(product); setIsProductModalOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-iphone-blue/10 text-iphone-blue rounded-xl font-bold text-xs"
                      >
                        <Edit2 size={14} /> Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {isProductModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => setIsProductModalOpen(false)} 
          onSaved={() => { setIsProductModalOpen(false); fetchProducts(); }} 
        />
      )}

      {managingVariantsFor && (
        <VariantListModal 
          product={managingVariantsFor} 
          onClose={() => setManagingVariantsFor(null)} 
        />
      )}
    </div>
  );
};
