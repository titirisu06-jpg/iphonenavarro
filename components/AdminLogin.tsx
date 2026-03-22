import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) navigate('/admin/dashboard');
      });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Si no hay .env reales y el error es fail to fetch, simulamos acceso en preview.
    if (!import.meta.env.VITE_SUPABASE_URL) {
       console.log('Login simulado activado por falta de .env');
       setTimeout(() => navigate('/admin/dashboard'), 500);
       return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas o error de conexión.');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12 relative">
      
      {/* Botón flotante global para volver */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white text-ink-secondary hover:text-ink hover:bg-gray-100 rounded-full shadow-sm border border-gray-200 font-medium text-sm transition-colors z-10"
      >
        <ArrowLeft size={16} /> Volver a la Tienda
      </button>

      <div className="card-white p-10 max-w-md w-full relative" style={{ borderRadius: 28 }}>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-iphone-blue rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck size={32} color="white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-ink text-center tracking-tight mb-2">Panel de Administración</h2>
        <p className="text-ink-tertiary text-sm text-center mb-8">
          Ingresá tus credenciales de Supabase
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="lead-input pl-11"
                placeholder="admin@iphonenavarro.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="lead-input pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center group mt-4"
            style={{ padding: '16px', borderRadius: 16 }}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        {!import.meta.env.VITE_SUPABASE_URL && (
          <p className="mt-6 text-xs text-orange-600 text-center font-medium bg-orange-50 p-3 rounded-xl border border-orange-100">
            Modo Demo: No se detectó configuración de Supabase. El login está simulado.
          </p>
        )}
      </div>
    </div>
  );
};
