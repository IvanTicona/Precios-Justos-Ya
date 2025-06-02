import {Card, CardHeader, CardBody, Image} from "@heroui/react";

export default function BannerComponent() {
  return (
    <Card className="w-full max-w-[1000px] mx-auto py-4 shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col items-center ">
        <h1 className="text-default-1000 uppercase font-bold text-2xl">Precios Justos a un Click</h1>
        <small className="text-default-500">Puedes Calificar los productos</small>
        <h4 className="font-bold text-large">Tu creas tus propios precios </h4>
      </CardHeader>
      <CardBody className="overflow-visible items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://cdn.venngage.com/template/thumbnail/small/712e6937-dfb2-4790-a7e1-566d3f1a2f06.webp"
          width={1000}
        />
      </CardBody>
    </Card>
  );
}
