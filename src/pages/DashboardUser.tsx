import { useEffect, useState } from "react";
import BannerComponent from "../components/BannerComponent";
import BarrioComponent from "../components/BarrioComponente";
import FooterComponent from "../components/FooterComponent";
import ProductComponent from "../components/ProductComponent";
import { Link } from "react-router-dom";
import { getBarrios } from "../service/barriosService";
import { getProducts } from "../service/productService";
import { getRandomSample } from "../utils/randomSample";

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
            <Link key={product.id} to={`/app/products/${product.id}`}>
              <ProductComponent
                title={product.name}
                img={
                  product.imageUrl ||
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                }
                price={product.price}
              />
            </Link>
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
