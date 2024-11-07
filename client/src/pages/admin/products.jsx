import { Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {addNewProduct, deleteProduct, editProduct, fetchAllProducts} from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin/product-tile";


const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

function AdminProducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] =useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.adminProducts);
    const { toast } = useToast();
    const [currentEditedId, setCurrentEditedId] = useState(null);

    function onSubmit(event){
        event.preventDefault();
        currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
        :dispatch(addNewProduct({
              ...formData,
              image: uploadedImageUrl
            })).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setOpenCreateProductsDialog(false);
                setImageFile(null);
                setFormData(initialFormData);
                toast({
                  title: "Product add successfully",
                  variant: "custom"
                });
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData)
          .filter((currentKey) => currentKey !== "averageReview")
          .map((key) => formData[key] !== "")
          .every((item) => item);
      }

    function handleDelete(getCurrentProductId) {
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
          }
        });
      }

    useEffect(() => {
        dispatch(fetchAllProducts());
      }, [dispatch]);

      console.log(formData);
    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end ">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 h-10">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => {setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);}}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState} isEditMode={currentEditedId !== null}/>
                    <div className="py-6">
                        <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? "Edit" : "Add"} formControls={addProductFormElements} isBtnDisabled={!isFormValid()}/>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;