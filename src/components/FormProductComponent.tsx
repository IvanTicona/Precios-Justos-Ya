import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];


export default function FormProduct() {
  const [action, setAction] = React.useState(null);

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-2"
      //   onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        // setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid product name"
        label="Product Name"
        labelPlacement="outside"
        name="productname"
        placeholder="Enter your product name"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid description"
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter your description product"
        type="description"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid price"
        label="Price"
        labelPlacement="outside"
        name="price"
        placeholder="Enter your product price"
        type="numeric"
      />

      <Select
        isRequired
        className="max-w-xs"
        defaultSelectedKeys={["cat"]}
        label="Select Category"
        placeholder="Select an category"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>

      <Input
        isRequired
        errorMessage="Please enter a valid stock"
        label="Stock"
        labelPlacement="outside"
        name="stock"
        placeholder="Enter your stock"
        type="numeric"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid image"
        label="Image"
        labelPlacement="outside"
        name="image"
        placeholder="Enter your product image"
        type="string"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}
