import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

const FeaturedCatalog: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight">
              Diseñados para destacar.<br/>
              <span className="text-ink/40">Nuestra selección.</span>
            </h2>
          </div>
          <Link 
            to="/catalogo" 
            className="group flex items-center gap-2 text-iphone-blue font-medium hover:text-blue-600 transition-colors"
          >
            Ver todos los modelos
            <div className="bg-iphone-blue/10 rounded-full p-1 group-hover:bg-iphone-blue/20 transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[450px]">
          
          {/* Main Hero Card (2 cols) */}
          <div className="lg:col-span-2 bg-[#f5f5f7] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative border border-black/5 hover:shadow-xl transition-shadow duration-500 min-h-[350px] lg:min-h-0">
            <div className="relative z-20 flex flex-col md:flex-row md:justify-between md:items-start gap-6 max-w-[60%]">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-ink mb-2">iPhone 15 Pro</h3>
                <p className="text-ink-secondary text-lg font-light">Titanio aeroespacial. Fuerte. Ligero. Pro.</p>
              </div>
              <Link 
                to="/catalogo" 
                className="inline-flex items-center justify-center bg-ink text-white px-6 py-3 rounded-full font-medium hover:bg-black hover:scale-105 transition-all duration-300 w-fit shrink-0"
              >
                Más información
              </Link>
            </div>
            
            {/* Product Image */}
            <div className="absolute right-[-10%] bottom-[-5%] w-[110%] h-[130%] md:right-[-5%] md:bottom-[2%] md:w-[85%] md:h-[140%] z-10 transition-transform duration-700 group-hover:scale-105 origin-bottom-right">
              <img 
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=png-alpha" 
                alt="iPhone 15 Pro" 
                className="w-full h-full object-contain object-right-bottom mix-blend-multiply"
              />
            </div>
          </div>

          {/* Secondary Cards Column */}
          <div className="flex flex-col gap-6 lg:h-[450px]">
            
            {/* Secondary Card 1 */}
            <div className="flex-1 bg-[#f5f5f7] rounded-[2rem] p-6 flex flex-col justify-between group overflow-hidden relative border border-black/5 hover:shadow-xl transition-shadow duration-500 min-h-[220px]">
              <div className="relative z-20 max-w-[65%]">
                <h3 className="text-2xl font-bold text-ink mb-1">iPhone 14 Pro</h3>
                <p className="text-ink-secondary text-sm font-light">Un salto increíble.</p>
              </div>
              
              <Link 
                to="/catalogo" 
                className="absolute bottom-6 left-6 z-20 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors duration-300"
              >
                <Plus size={20} />
              </Link>

              <div className="absolute right-[-15%] bottom-[-15%] w-[100%] h-[130%] z-10 transition-transform duration-700 group-hover:scale-105 origin-bottom-right">
                <img 
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=5120&hei=2880&fmt=png-alpha" 
                  alt="iPhone 14 Pro" 
                  className="w-full h-full object-contain object-right-bottom mix-blend-multiply"
                />
              </div>
            </div>

            {/* Secondary Card 2 */}
            <div className="flex-1 bg-[#f5f5f7] rounded-[2rem] p-6 flex flex-col justify-between group overflow-hidden relative border border-black/5 hover:shadow-xl transition-shadow duration-500 min-h-[220px]">
              <div className="relative z-20 max-w-[65%]">
                <h3 className="text-2xl font-bold text-ink mb-1">iPhone 13</h3>
                <p className="text-ink-secondary text-sm font-light">Tu nuevo superpoder.</p>
              </div>
              
              <Link 
                to="/catalogo" 
                className="absolute bottom-6 left-6 z-20 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors duration-300"
              >
                <Plus size={20} />
              </Link>

              <div className="absolute right-[-15%] bottom-[-15%] w-[100%] h-[130%] z-10 transition-transform duration-700 group-hover:scale-105 origin-bottom-right">
                <img 
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-starlight?wid=5120&hei=2880&fmt=png-alpha" 
                  alt="iPhone 13" 
                  className="w-full h-full object-contain object-right-bottom mix-blend-multiply"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedCatalog;
