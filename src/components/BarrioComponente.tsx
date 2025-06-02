import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";

interface BarrioInterface {
  name: string;
  description: string;
  location: string;
  img:string
}

export default function BarrioComponent({
  name,
  description,
  location,
  img,
}: BarrioInterface) {
  return (
    <div >
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-black/60 uppercase font-bold ">
            {name}
          </p>
          <h4 className="text-black/90 font-medium text-xl">
            {description}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={img}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Buenos Alimentos</p>
              <p className="text-tiny text-white/60">
                {location}
              </p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Ir a Comprar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
