// src/components/ReportCard.tsx
import React from "react";
import { Card, CardHeader, CardFooter, Image } from "@heroui/react";

interface ReportCardProps {
  title: string;
  img: string;
  stock: number;
  onPress?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  onPress,
  title,
  img,
  stock,
}) => (
  <Card
    isPressable={!!onPress}
    onPress={onPress}
    isFooterBlurred
    className="w-full h-[300px] sm:h-[350px] md:h-[300px] rounded-lg overflow-hidden"
  >
    <CardHeader className="absolute z-10 top-1 left-1 flex flex-col items-start gap-1">
      <h4 className="text-black/90 font-medium text-lg sm:text-xl">
        {title}
      </h4>
    </CardHeader>

    <Image
      removeWrapper
      alt={title}
      className="z-0 w-full h-full object-cover"
      src={img}
    />

    <CardFooter className="absolute bg-black/40 bottom-0 left-0 right-0 z-10 flex items-center justify-between px-2 py-1">
      <div className="flex flex-col">
        <span className="text-tiny text-white/60">{title}</span>
        <span className="text-tiny text-white/60">
          Solo queda este stock: {stock}.
        </span>
      </div>
    </CardFooter>
  </Card>
);
