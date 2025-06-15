import { useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore";
import { useFormik } from "formik";
import type { Product } from "../interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

export const useProducts = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const { 
    fetchProducts, 
    createProduct,
    editProduct,
    deleteProduct,
    getAllZones,
    fetchProductHistory,
    fetchProductsByName,
    products, 
    zones,
    error
  } = useProductsStore((state) => state);

  useEffect(() => {
    fetchProducts();
    getAllZones();

  }, [fetchProducts, getAllZones]);

    const handleSubmit = async (values: Product) => {
      if (product?.id){
        await editProduct(product, {
        name: values.name,
        price: values.price,
        description: values.description,
        imageUrl: values.imageUrl,
        stock: values.stock,
        zone_id: values.zone_id,
      });
      }else {
        await createProduct({
        id: uuidv4(),
        name: values.name,
        price: values.price,
        description: values.description,
        imageUrl: values.imageUrl,
        stock: values.stock,
        zone_id: values.zone_id,
        isEdited: false
      });
      }
        formik.resetForm();
        setProduct(null);
        setOpenDialog(false);
    };


  const formik  = useFormik({
    initialValues: {
      id: '',
      name: '',
      price: 0,
      description: "",
      imageUrl: "",
      stock: 0,
      zone_id: "",
      isEdited: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required").positive(),
      imageUrl: Yup.string().url("Invalid URL").optional(),
      stock: Yup.number().required("Required").integer().min(0),
      zone_id: Yup.string().required("Seleccione un mercado"),
    }),
    onSubmit: handleSubmit,
  });

  const editProductHandler = async (product: Product) => {
    formik.setValues({ 
        id:product.id,
        name: product.name, 
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl || "", 
        stock: product.stock,
        zone_id: product.zone_id || "",
        isEdited: false
    });
    setProduct(product);
    setOpenDialog(true);
  };

  const openDialogHandler = () => {
    formik.resetForm();
    setProduct(null);
    setOpenDialog(true);
  };

  const closeDialogHandler = () => {
    formik.resetForm();
    setProduct(null);
    setOpenDialog(false);
  };

  const goToProduct = (productId: string) => {
    navigate(`/app/products/${productId}`);
  };

  return { 
    products,
    zones,
    formik,
    editProductHandler,
    goToProduct,
    deleteProduct,
    openDialog,
    openDialogHandler,
    closeDialogHandler,
    error,
    fetchProductHistory,
    fetchProductsByName

  };
};