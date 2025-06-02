import { useState } from "react";
import { Form, Input, Select, SelectItem, Button, NumberInput } from "@heroui/react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Por favor, ingresa el nombre del producto"),
  description: yup.string().required("Por favor, ingresa la descripción del producto"),
  price: yup.number().required("Por favor, ingresa el precio del producto"),
  category: yup.string().required("Por favor, selecciona una categoría"),
  stock: yup.number().required("Por favor, ingresa la cantidad en stock"),
  zone: yup.string().required("Por favor, selecciona una zona"),
});

interface FormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  zone: string;
}

export default function AgregarProductoPage() {
  
  const [submitted, setSubmitted] = useState<FormValues>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    zone: "",
  });
  
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      zone: "",
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      setSubmitted(values);
      console.log("Form submitted with values:", values);
    },
    onReset: () => {
      setSubmitted({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        zone: "",
      });
    },
  });

  return (
    <Form
      className="w-1/2 justify-center items-center space-y-4 p-5 rounded-xl mx-auto border border-default-200 bg-default-50 shadow-lg"
      validationErrors={formik.errors}
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          name="name"
          label="Nombre"
          labelPlacement="outside"
          placeholder="Ingresa el nombre del producto"
          isRequired
          value={formik.values.name}
          onValueChange={(val) => formik.setFieldValue("name", val)}
          isInvalid={formik.touched.name && !!formik.errors.name}
          onBlur={() => formik.setFieldTouched("name", true)}
        />

        <Input
          name="description"
          label="Descripción"
          labelPlacement="outside"
          placeholder="Ingresa la descripción del producto"
          isRequired
          value={formik.values.description}
          onValueChange={(val) => formik.setFieldValue("description", val)}
          isInvalid={formik.touched.description && !!formik.errors.description}
          onBlur={() => formik.setFieldTouched("description", true)}
        />

        <NumberInput
          hideStepper
          name="price"
          label="Precio"
          labelPlacement="outside"
          placeholder="Ingresa el precio del producto"
          isRequired
          value={formik.values.price}
          onValueChange={(val) => formik.setFieldValue("price", val)}
          isInvalid={formik.touched.price && !!formik.errors.price}
          onBlur={() => formik.setFieldTouched("price", true)}
        />

        <NumberInput
          hideStepper
          name="stock"
          label="Stock"
          labelPlacement="outside"
          placeholder="Ingresa la cantidad en stock"
          isRequired
          value={formik.values.stock}
          onValueChange={(val) => formik.setFieldValue("stock", val)}
          isInvalid={formik.touched.stock && !!formik.errors.stock}
          onBlur={() => formik.setFieldTouched("stock", true)}
        />

        <Select
          name="category"
          label="Categoría"
          labelPlacement="outside"
          placeholder="Selecciona una categoría"
          isRequired
          value={formik.values.category}
          onChange={(event) => formik.setFieldValue("category", event.target.value)}
          isInvalid={formik.touched.category && !!formik.errors.category}
          onBlur={() => formik.setFieldTouched("category", true)}
        >
          <SelectItem key="electronics">
            Electrónica
          </SelectItem>
          <SelectItem key="clothing">
            Ropa
          </SelectItem>
          <SelectItem key="home">
            Hogar
          </SelectItem>
          <SelectItem key="books">
            Libros
          </SelectItem>
          <SelectItem key="toys">
            Juguetes
          </SelectItem>
        </Select>

        <Select
          name="zone"
          label="Zona"
          labelPlacement="outside"
          placeholder="Selecciona una zona"
          isRequired
          value={formik.values.zone}
          onChange={(event) => formik.setFieldValue("zone", event.target.value)}
          isInvalid={formik.touched.zone && !!formik.errors.zone}
          onBlur={() => formik.setFieldTouched("zone", true)}
        >
          <SelectItem key="ar">
            Argentina
          </SelectItem>
          <SelectItem key="us">
            United States
          </SelectItem>
          <SelectItem key="ca">
            Canada
          </SelectItem>
          <SelectItem key="uk">
            United Kingdom
          </SelectItem>
          <SelectItem key="au">
            Australia
          </SelectItem>
        </Select>
        
        {/* Cloudinary */}

        {/* Paquete para cargar imagenes:  */}

        <Input
          name="image"
          label="Imagen"
          labelPlacement="outside"
          placeholder="Ingresa la URL de la imagen del producto"
          value={formik.values.image}
          onValueChange={(val) => formik.setFieldValue("image", val)}
          isInvalid={formik.touched.image && !!formik.errors.image}
          errorMessage={() => {
            if (formik.touched.image && formik.errors.image) {
              return formik.errors.image;
            }
            return null;
          }}
          onBlur={() => formik.setFieldTouched("image", true)}
          type="file"
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>
    </Form>
  );
}
