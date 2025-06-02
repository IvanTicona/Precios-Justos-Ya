import { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  NumberInput,
} from "@heroui/react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Por favor, ingresa el nombre del producto"),
  description: yup.string().required("Por favor, ingresa la descripción del producto"),
  price: yup
    .number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor que 0")
    .required("Por favor, ingresa el precio del producto"),
  category: yup.string().required("Por favor, selecciona una categoría"),
  stock: yup
    .number()
    .typeError("El stock debe ser un número")
    .integer("El stock debe ser un valor entero")
    .min(0, "El stock no puede ser negativo")
    .required("Por favor, ingresa la cantidad en stock"),
  zone: yup.string().required("Por favor, selecciona una zona"),
  image: yup
    .string()
    .url("La imagen debe ser una URL válida")
    .required("Por favor, ingresa la URL de la imagen del producto"),
});


// 1) Definimos la interfaz según lo que devuelve el backend
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  zone: string;
  image: string;
}

export default function ActualizarProductoPage() {
  // 2) Estados para manejar producto, loading y posibles errores
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 3) Al montar el componente, pedimos todos los productos
  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:3000/products")
      .then((response) => {
        const productsList = response.data;
        if (productsList.length === 0) {
          setFetchError("No hay productos disponibles en el sistema.");
          setLoading(false);
          return;
        }
        // Tomamos el primer producto (o cualquiera que desees):
        setProduct(productsList[0]);
        console.log("Producto obtenido:", productsList[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        setFetchError("No se pudo cargar la lista de productos.");
        setLoading(false);
      });
  }, []);

  // 4) Configuramos Formik, usando enableReinitialize para que 
  // cuando `product` se establezca, el formulario reciba esos valores
  const formik = useFormik<Product>({
    initialValues: {
      id: product?.id || "",
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
      stock: product?.stock || 0,
      zone: product?.zone || "",
      image: product?.image || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Formulario enviado con valores:", values);
    },
    onReset: () => {
      if (product) {
        formik.setValues({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          zone: product.zone,
          image: product.image,
        });
      }
    },
  });

  // 7) Renderizado condicional: mientras cargamos, luego error o formulario
  if (loading) {
    return <div className="text-center p-8">Cargando producto...</div>;
  }

  if (fetchError) {
    return <div className="text-danger p-8">{fetchError}</div>;
  }

  return (
    <Form
      className="w-1/2 mx-auto p-6 space-y-6 border border-default-200 rounded-xl bg-default-50 shadow-lg"
      validationErrors={formik.errors}
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <h2 className="text-2xl mb-4">Editar Producto</h2>

      <div className="flex flex-col gap-4">
        {/* ----- Nombre ----- */}
        <Input
          name="name"
          label="Nombre"
          labelPlacement="outside"
          placeholder="Ingresa el nombre del producto"
          isRequired
          value={formik.values.name}
          onValueChange={(val) => formik.setFieldValue("name", val)}
          isInvalid={formik.touched.name && !!formik.errors.name}
          errorMessage={() =>
            formik.touched.name && formik.errors.name ? formik.errors.name : null
          }
          onBlur={() => formik.setFieldTouched("name", true)}
        />

        {/* ----- Descripción ----- */}
        <Input
          name="description"
          label="Descripción"
          labelPlacement="outside"
          placeholder="Ingresa la descripción del producto"
          isRequired
          value={formik.values.description}
          onValueChange={(val) => formik.setFieldValue("description", val)}
          isInvalid={formik.touched.description && !!formik.errors.description}
          errorMessage={() =>
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
          onBlur={() => formik.setFieldTouched("description", true)}
        />

        {/* ----- Precio ----- */}
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
          errorMessage={() =>
            formik.touched.price && formik.errors.price ? formik.errors.price : null
          }
          onBlur={() => formik.setFieldTouched("price", true)}
        />

        {/* ----- Stock ----- */}
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
          errorMessage={() =>
            formik.touched.stock && formik.errors.stock ? formik.errors.stock : null
          }
          onBlur={() => formik.setFieldTouched("stock", true)}
        />

        <Select
          name="category"
          label="Categoría"
          labelPlacement="outside"
          placeholder="Selecciona una categoría"
          isRequired
          selectedKeys={ new Set([formik.values.category]) }
          onSelectionChange={(keys) => {
            const [categorySeleccionada] = Array.from(keys);
            formik.setFieldValue("category", categorySeleccionada);
          }}
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
        {formik.touched.category && formik.errors.category && (
          <span className="text-danger text-small">{formik.errors.category}</span>
        )}

        <Select
          name="zone"
          label="Zona"
          labelPlacement="outside"
          placeholder="Selecciona una zona"
          isRequired
          selectedKeys={ new Set([formik.values.zone]) }
          onSelectionChange={(keys) => {
            const [zoneSeleccionada] = Array.from(keys);
            formik.setFieldValue("zone", zoneSeleccionada);
          }}
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
        {formik.touched.zone && formik.errors.zone && (
          <span className="text-danger text-small">{formik.errors.zone}</span>
        )}

        <Input
          name="image"
          label="Imagen"
          labelPlacement="outside"
          placeholder="Ingresa la URL de la imagen del producto"
          type="text"
          isRequired
          value={formik.values.image}
          onValueChange={(val) => formik.setFieldValue("image", val)}
          isInvalid={formik.touched.image && !!formik.errors.image}
          errorMessage={() =>
            formik.touched.image && formik.errors.image ? formik.errors.image : null
          }
          onBlur={() => formik.setFieldTouched("image", true)}
        />

        {/* ----- Botones Guardar / Reset ----- */}
        <div className="flex gap-4 mt-4">
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={formik.isSubmitting}
          >
            Guardar cambios
          </Button>
          <Button className="w-full" variant="bordered" type="reset">
            Resetear
          </Button>
        </div>
      </div>
    </Form>
  );
}
