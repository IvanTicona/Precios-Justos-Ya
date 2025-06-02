// src/components/ProductComponent.tsx
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

interface ProductProps {
  title: string;
  img: string;
  price: number;
}

export default function ProductComponent({ title, img, price }: ProductProps) {
  return (
    <Card isPressable shadow="sm" onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          alt={title}
          className="object-cover h-[140px]"
          radius="lg"
          shadow="sm"
          src={img}
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{title}</b>
        <p className="text-default-500">${price}</p>
      </CardFooter>
    </Card>
  );
}
