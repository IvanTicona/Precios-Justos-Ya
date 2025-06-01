import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link,
} from "@heroui/react";

export const ProductPage = () => {
  const productId = "hero-card-complete";
  const product = {
    id: productId,
    name: "Aceite de Oliva Extra Virgen",
    description:
      "Un aceite de oliva extra virgen de alta calidad, prensado en frío y con un sabor excepcional. Ideal para ensaladas, cocinar o simplemente disfrutar con pan.",
    imageUrl: "https://heroui.com/images/hero-card-complete.jpeg",
    price: "$29.99",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center gap-5">
      <Image
        alt="HeroUI hero Image"
        src="https://heroui.com/images/hero-card-complete.jpeg"
        width={300}
      />
      <Card className="max-w-[400px] border border-gray-200 shadow-lg">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">{product.name}</p>
            <div className="flex">
              <Chip color="primary">Etiqueta 1</Chip>
              <Chip color="success">Etiqueta 2</Chip>
            </div>
            <p className="text-default-500">{product.price}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{product.description}</p>
          <div className="flex">
            <Chip color="warning" variant="bordered">Etiqueta 3</Chip>
            <Chip color="danger" variant="bordered">Etiqueta 4</Chip>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="/products/hero-card-complete/map"
          >
            Ver en Mapa
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
