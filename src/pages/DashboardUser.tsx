import React, { useEffect, useState } from "react";
import ProductComponent from "../components/ProductComponent";
import BarrioComponent from "../components/BarrioComponente";
import { getProducts } from "../service/productService";
import { getBarrios } from "../service/barriosService";
import { getRandomSample } from "../utils/randomSample";
import ModalComponent from "../components/ModalComponent";
import BannerComponent from "../components/BannerComponent";
import FooterComponent from "../components/FooterComponent";

function DashboardUser() {
  const [products, setProducts] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(getRandomSample(data, 4)));
    getBarrios().then((data) => setBarrios(getRandomSample(data, 4)));
  }, []);

  return (
    <div className="bg-[#fdf6e3]">
      <div className="flex flex-col gap-10 p-10 min-h-screen ">
        <section>
          <h1 className="text-xl font-bold mb-4">
            Algunos de nuestros productos
          </h1>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {products.map((product) => (
              <ProductComponent
                key={product.id}
                title={product.name}
                img={
                  product.imageUrl ||
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                }
                price={product.price}
              />
            ))}
          </div>
        </section>
        <section>
          <h1 className="text-xl font-bold mb-4">
            Algunos Barrios Interesantes
          </h1>
          <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {barrios.map((barrio) => (
              <BarrioComponent
                key={barrio.id}
                name={barrio.name}
                description={barrio.description}
                location={barrio.location}
                img={
                  barrio.img ||
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                }
              />
            ))}
          </div>
        </section>
        <BannerComponent />
      </div>
      <FooterComponent />
    </div>
  );
}

export default DashboardUser;
