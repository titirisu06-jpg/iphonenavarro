import React from 'react';

const FaqPrivacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-4">
          Política de Privacidad
        </h1>
        <p className="text-ink-tertiary">Última actualización: 30 de abril de 2026</p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <p className="leading-relaxed text-ink-secondary">
          En <strong className="text-ink">iPhone Navarro</strong> valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando te comunicas con nosotros a través de nuestros canales de atención, incluyendo WhatsApp.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-ink mt-8 mb-4">1. Información que recopilamos</h2>
          <p className="leading-relaxed mb-4 text-ink-secondary">Cuando te contactas con nosotros a través de nuestro asistente virtual (bot) o atención humana en WhatsApp, podemos recopilar la siguiente información:</p>
          <ul className="list-disc pl-6 space-y-2 text-ink-secondary">
            <li>Tu número de teléfono.</li>
            <li>El nombre de perfil público que tienes configurado en WhatsApp.</li>
            <li>El contenido de los mensajes que nos envías (consultas sobre stock, modelos, precios, comprobantes de pago, etc.).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mt-8 mb-4">2. Uso de la información</h2>
          <p className="leading-relaxed mb-4 text-ink-secondary">La información que recopilamos se utiliza exclusivamente para:</p>
          <ul className="list-disc pl-6 space-y-2 text-ink-secondary">
            <li>Responder a tus consultas y brindarte asesoramiento sobre nuestros productos (iPhones y accesorios).</li>
            <li>Procesar reservas, compras o envíos.</li>
            <li>Mejorar la calidad de nuestro servicio de atención al cliente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mt-8 mb-4">3. Protección y uso compartido de datos</h2>
          <ul className="list-disc pl-6 space-y-2 text-ink-secondary">
            <li>No vendemos, alquilamos ni compartimos tu información personal a terceros para fines comerciales.</li>
            <li>Tus mensajes son procesados utilizando la infraestructura oficial de la API de WhatsApp (Meta Platforms, Inc.) y nuestros sistemas seguros de gestión de atención al cliente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mt-8 mb-4">4. Retención de datos y Derechos del Usuario</h2>
          <p className="leading-relaxed text-ink-secondary">
            Conservamos el historial de chat únicamente durante el tiempo necesario para fines de atención al cliente y garantías. Tienes derecho a solicitar en cualquier momento la eliminación de tus datos o de tu historial de chat enviando un mensaje a nuestro WhatsApp con la frase <strong className="text-ink">"Solicito eliminación de mis datos"</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mt-8 mb-4">5. Cambios a esta Política</h2>
          <p className="leading-relaxed text-ink-secondary">
            Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cualquier cambio importante actualizando la fecha en la parte superior de esta página.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mt-8 mb-4">Contacto</h2>
          <p className="leading-relaxed text-ink-secondary">
            Si tienes alguna duda sobre esta política, puedes comunicarte con nosotros a través de nuestro número oficial de WhatsApp o visitando nuestro local en Lobos / Navarro.
          </p>
        </section>

        <div className="h-px bg-black/5 my-16"></div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4">
            Preguntas Frecuentes (FAQ)
          </h1>
        </div>

        <section className="space-y-10">
          <div>
            <h3 className="text-xl font-bold text-ink mb-3">¿Con quién estoy hablando, con un robot o con una persona?</h3>
            <p className="leading-relaxed text-ink-secondary">
              ¡Con ambos! Para darte respuestas súper rápidas (incluso de madrugada), nuestro asistente virtual "Wally" se encarga de recibirte y responder las dudas más comunes sobre modelos, precios y stock. Si en algún momento necesitas atención personalizada, Wally te transferirá automáticamente con un humano de nuestro equipo.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-ink mb-3">¿Es seguro enviar mis datos o comprobantes por este medio?</h3>
            <p className="leading-relaxed text-ink-secondary">
              Sí, totalmente. Utilizamos la API oficial de WhatsApp Empresarial (Meta). Todas las conversaciones están cifradas y tu información de pago se maneja con estricta confidencialidad.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-ink mb-3">¿Guardan mis mensajes para enviarme publicidad?</h3>
            <p className="leading-relaxed text-ink-secondary">
              No somos de hacer spam. Tu número queda registrado en nuestro sistema únicamente para poder darte seguimiento a tu compra o consulta. Solo te enviaremos mensajes promocionales si nos das tu consentimiento explícito.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaqPrivacy;
