import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import type { Market } from "../interfaces/marketInterface";
import { useMarketStore } from "../store/useMarketStore";

const marketSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  tipo: Yup.mixed<Market["tipo"]>()
    .oneOf(["zona", "barrio", "otro"])
    .required("El tipo es obligatorio"),
  latitude: Yup.number()
    .min(-90, "Rango -90 a 90")
    .max(90, "Rango -90 a 90")
    .required("Latitud requerida"),
  longitude: Yup.number()
    .min(-180, "Rango -180 a 180")
    .max(180, "Rango -180 a 180")
    .required("Longitud requerida"),
  imgUrl: Yup.string().url("Debe ser una URL válida").optional(),
});

export const useMarkets = () => {
  const {
    markets,
    getMarkets,
    createMarket,
    updateMarket,
    deleteMarket,
  } = useMarketStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      tipo: "zona" as Market["tipo"],
      latitude: 0,
      longitude: 0,
      imgUrl: "",
    },
    validationSchema: marketSchema,
    onSubmit: async (values) => {
      if (editingMarket) {
        await updateMarket({ ...editingMarket, ...values });
      } else {
        await createMarket({
          id: uuidv4() as any,
          ...values,
          products: [],
        } as Market);
      }
      formik.resetForm();
      setEditingMarket(null);
      setOpenDialog(false);
    },
  });

  const openDialogHandler = () => setOpenDialog(true);

  const closeDialogHandler = () => {
    formik.resetForm();
    setEditingMarket(null);
    setOpenDialog(false);
  };

  const editMarketHandler = (market: Market) => {
    formik.setValues({
      name: market.name,
      description: market.description,
      tipo: market.tipo,
      latitude: market.latitude,
      longitude: market.longitude,
      imgUrl: market.imgUrl ?? "",
    });
    setEditingMarket(market);
    setOpenDialog(true);
  };

  useEffect(() => {
    if (markets.length === 0) getMarkets();
  }, [getMarkets, markets.length]);

  const goToMarket = (id: number | string) => navigate(`/app/markets/${id}`);// Tu pagina Alex

  return {
    markets,
    editingMarket,
    marketSchema,
    formik,
    openDialog,
    openDialogHandler,
    closeDialogHandler,
    editMarketHandler,
    deleteMarketById: (id: string | number) => deleteMarket(String(id)),
    goToMarket,
  };
};
