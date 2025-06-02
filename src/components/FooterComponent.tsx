export default function FooterComponent() {
  return (
    <footer className=" w-full bg-[#dc2c48] text-white pt-12 pb-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Sobre PreciosJustos</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacidad
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Top comidas</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Top cadenas
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Top ciudades
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Registra tu negocio</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Centro de Socios
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Para colaboradores</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Trabaja con nosotros
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="border-t border-white/40 my-8"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto text-center text-white/90 font-bold text-base">
        PreciosJustos © 2025
      </div>
    </footer>
  );
}
