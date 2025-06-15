import { useEffect, useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import ProductComparison from "../components/ProductComparison";
import ProductFormDialog from "../components/ProductFormDialog";
import type { Zone } from "../interfaces/zoneInterface";
import type { Product } from "../interfaces/productInterface";
import Typography from "@mui/material/Typography";
import ProductActionsMenu from "../components/ProductActionsMenu";
import { useUser } from "../contexts/UserContext";
import { useLocation } from "react-router-dom";

function ProductsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [value, setValue] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null
  );
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();
  const isAlcaldia = user?.role === "alcaldía";

  const {
    products,
    zones,
    error,
    formik,
    editProductHandler,
    goToProduct,
    deleteProduct,
    closeDialogHandler,
    openDialogHandler,
    openDialog,
    fetchProductsByName,
  } = useProducts();

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    productId: string
  ) => {
    if (!isAlcaldia) {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      setSelectedProductId(productId);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      formik.setFieldValue("imageUrl", imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const filteredProducts = selectedZone
    ? products.filter(
        (product) => product.zone_id === selectedZone.id && !product.isEdited
      )
    : products.filter((product) => !product.isEdited);

  const productNames = Array.from(new Set(products.map((p) => p.name)));

  const { state } = useLocation() as { state?: { zoneId?: string } };
  const initialZoneId = state?.zoneId ?? null;

  useEffect(() => {
    if (initialZoneId && zones.length && !selectedZone) {
      const z = zones.find((z) => z.id === initialZoneId);
      if (z) setSelectedZone(z);
    }
  }, [initialZoneId, zones, selectedZone]);

  return (
    <>
      <ProductHeader
        openDialogHandler={isAlcaldia ? () => {} : openDialogHandler}
        value={value}
        setValue={(newValue) => {
          setValue(newValue);
          if (newValue === 0) {
            setSelectedProductName(null);
            setComparisonProducts([]);
          }
        }}
        zones={zones}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
      />
      {error && <Typography color="error">{error}</Typography>}
      {value === 0 ? (
        <ProductList
          filteredProducts={filteredProducts}
          zones={zones}
          handleOpenMenu={handleOpenMenu}
          goToProduct={goToProduct}
        />
      ) : (
        <ProductComparison
          productNames={productNames}
          selectedProductName={selectedProductName}
          setSelectedProductName={setSelectedProductName}
          comparisonProducts={comparisonProducts}
          setComparisonProducts={setComparisonProducts}
          fetchProductsByName={fetchProductsByName}
          zones={zones}
        />
      )}
      {!isAlcaldia && (
        <ProductActionsMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && selectedProductId !== null}
          productId={selectedProductId}
          handleCloseMenu={handleCloseMenu}
          editProductHandler={editProductHandler}
          deleteProduct={deleteProduct}
          setImagePreview={setImagePreview}
          products={products}
        />
      )}
      <ProductFormDialog
        openDialog={openDialog}
        closeDialogHandler={closeDialogHandler}
        formik={formik}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleImageUpload={handleImageUpload}
        handleImageClick={handleImageClick}
        fileInputRef={fileInputRef}
        zones={zones}
        isEditing={!!products[0]?.id}
      />
    </>
  );
}

export default ProductsPage;
