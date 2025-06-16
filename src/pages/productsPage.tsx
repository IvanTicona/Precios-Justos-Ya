import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import ProductComparison from "../components/ProductComparison";
import ProductFormDialog from "../components/ProductFormDialog";
import type { Zone } from "../interfaces/zoneInterface";
import type { Product } from "../interfaces/productInterface";
import Typography from "@mui/material/Typography";
import ProductActionsMenu from "../components/ProductActionsMenu";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

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
  const [showEdition, setShowEdition] = useState(false); 
  const role = useAuthStore((s) => s.user?.role);
  const isAlcaldia = role === 'alcaldía';

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

  const handleCreateProduct = () => {
    setShowEdition(false);
    setImagePreview(null);
    formik.resetForm(); 
    openDialogHandler(); 
  };

  
  const handleEditProductSave = (product: Product) => {
    setShowEdition(true);
    product.isEdited = true;
    editProductHandler(product); 
    setImagePreview(product.imageUrl || null);
    openDialogHandler(); 
  };
    const handleEditProductClose = (product: Product) => {
    setShowEdition(true);
    product.isEdited = false;
  };

  
  const handleCloseDialog = () => {
    setShowEdition(false); 
    setImagePreview(null); 
    formik.resetForm(); 
    closeDialogHandler(); 
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, productId: string) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      setSelectedProductId(productId);
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
      console.log('Image uploaded, preview URL:', imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const filteredProducts = useMemo(() => {
    return selectedZone
      ? products.filter(
          (product) =>
            product.zone_id === selectedZone.id && !product.isEdited
        )
      : products.filter((product) => !product.isEdited);
  }, [products, selectedZone]);

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
        openDialogHandler={handleCreateProduct}
        value={value}
        setValue={(newValue) => {
          setValue(newValue);
          if (newValue === 0) {
            setSelectedProductName(null);
            setComparisonProducts([]);
          }
        } }
        zones={zones}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone} 
        role={role || ''}      
        />
      {error && <Typography color="error">{error}</Typography>}
      {value === 0 ? (
        <ProductList
          filteredProducts={filteredProducts}
          zones={zones}
          handleOpenMenu={handleOpenMenu}
          goToProduct={goToProduct} 
          isAlcaldia={isAlcaldia}        
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
        {isAlcaldia && (

        <ProductActionsMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && selectedProductId !== null}
          productId={selectedProductId}
          handleCloseMenu={handleCloseMenu}
          editProductHandlerSave={handleEditProductSave}
          editProductHandlerClose={handleEditProductClose}
          deleteProduct={deleteProduct}
          setImagePreview={setImagePreview}
          products={products}
        />
        )}

        <ProductFormDialog
          openDialog={openDialog}
          closeDialogHandler={handleCloseDialog}
          formik={formik}
          imagePreview={imagePreview}
          handleImageUpload={handleImageUpload}
          handleImageClick={handleImageClick}
          fileInputRef={fileInputRef}
          zones={zones}
          isEditing={showEdition}
        />
    </>
  );
}

export default ProductsPage;