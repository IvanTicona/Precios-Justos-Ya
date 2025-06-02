import { useEffect, useState } from "react";
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
import jsonServerInstance from "../api/jsonInstance";
import { useNavigate, useParams } from "react-router-dom"; 

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
  imageUrl: yup
    .string()
    .url("La imagen debe ser una URL válida")
    .required("Por favor, ingresa la URL de la imagen del producto"),
});

interface Item {
  id: string;
  name: string;
}
interface FormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  zone: string;
  imageUrl: string;
}

export default function ActualizarProductoPage() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState<Item[]>([]);
  const [zoneList, setZoneList] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, zonesRes, productRes] = await Promise.all([
          jsonServerInstance.get<Item[]>("/categories"),
          jsonServerInstance.get<Item[]>("/zones"),
          jsonServerInstance.get<FormValues>(`/products/${id}`), 
        ]);

        setCategoryList(categoriesRes.data);
        setZoneList(zonesRes.data);
        formik.setValues({
          name: productRes.data.name,
          description: productRes.data.description,
          price: productRes.data.price,
          category: productRes.data.category,
          stock: productRes.data.stock,
          zone: productRes.data.zone,
          imageUrl: productRes.data.imageUrl,
        });
      } catch (error) {
        console.error("Error al cargar datos para actualizar:", error);
        setFetchError("No se pudo cargar la información del producto o listas necesarias.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      zone: "",
      imageUrl: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await jsonServerInstance.put(`/products/${id}`, values);
        formik.resetForm();
        navigate("/products");
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    },
    onReset: () => {
      const reloadOriginal = async () => {
        try {
          const productRes = await jsonServerInstance.get<FormValues>(`/products/${id}`);
          formik.setValues({
            name: productRes.data.name,
            description: productRes.data.description,
            price: productRes.data.price,
            category: productRes.data.category,
            stock: productRes.data.stock,
            zone: productRes.data.zone,
            imageUrl: productRes.data.imageUrl,
          });
        } catch (error) {
          console.error("Error al recargar valores originales:", error);
        }
      };
      reloadOriginal();
    },
  });

  if (loading) {
    return (
      <div className="text-center p-8">
        Cargando datos del producto...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-danger p-8">
        {fetchError}
      </div>
    );
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
          selectedKeys={new Set([formik.values.category])}
          onSelectionChange={(keys) => {
            const [catSeleccionada] = Array.from(keys);
            formik.setFieldValue("category", catSeleccionada);
          }}
          isInvalid={formik.touched.category && !!formik.errors.category}
          onBlur={() => formik.setFieldTouched("category", true)}
        >
          {categoryList.map((cat) => (
            <SelectItem key={cat.id}>{cat.name}</SelectItem>
          ))}
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
          selectedKeys={new Set([formik.values.zone])}
          onSelectionChange={(keys) => {
            const [zoneSeleccionada] = Array.from(keys);
            formik.setFieldValue("zone", zoneSeleccionada);
          }}
          isInvalid={formik.touched.zone && !!formik.errors.zone}
          onBlur={() => formik.setFieldTouched("zone", true)}
        >
          {zoneList.map((zon) => (
            <SelectItem key={zon.id}>{zon.name}</SelectItem>
          ))}
        </Select>
        {formik.touched.zone && formik.errors.zone && (
          <span className="text-danger text-small">{formik.errors.zone}</span>
        )}

        <Input
          name="imageUrl"
          label="Imagen"
          labelPlacement="outside"
          placeholder="Ingresa la URL de la imagen del producto"
          isRequired
          value={formik.values.imageUrl}
          onValueChange={(val) => formik.setFieldValue("imageUrl", val)}
          isInvalid={formik.touched.imageUrl && !!formik.errors.imageUrl}
          errorMessage={() =>
            formik.touched.imageUrl && formik.errors.imageUrl
              ? formik.errors.imageUrl
              : null
          }
          onBlur={() => formik.setFieldTouched("imageUrl", true)}
        />

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
