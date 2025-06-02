// src/components/CommentComponent.tsx
import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";

export default function CommentComponent() {
  return (
    <Card className="w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
        <Avatar
          isBordered
          radius="full"
          size="md"
          src="https://heroui.com/avatars/avatar-1.png"
          className="flex-shrink-0"
        />
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h4 className="text-base font-semibold text-default-600 leading-tight">
            Zoey Lang
          </h4>
          <h5 className="text-sm tracking-tight text-default-400">
            @zoeylang
          </h5>
        </div>
      </CardHeader>

      <CardBody className="px-4 pb-4 pt-0 text-base text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
      </CardBody>
    </Card>
  );
}
