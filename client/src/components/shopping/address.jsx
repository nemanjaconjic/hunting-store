import { addNewAddress, fetchAllAddresses, deleteAddress, editAddress } from "@/store/shop/address-slice";
import CommonForm from "../common/form";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./address-card";

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
  };

function Address({setCurrentSelectedAddress, selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const { toast } = useToast();
    const [currentEditedId, setCurrentEditedId] = useState(null);

    function isFormValid() {
        return Object.keys(formData)
          .map((key) => formData[key].trim() !== "")
          .every((item) => item);
    }

    function handleManageAddress(event) {
        event.preventDefault();
        if (addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast({
              title: "You can add max 3 addresses",
              variant: "destructive",
            });
      
            return;
          }
        currentEditedId !== null ? dispatch(editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully!",
              variant: "custom"
            });
          }
        })
      :dispatch(addNewAddress({
            ...formData,
            userId : user?.id
        })).then(data=>{
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                setFormData(initialAddressFormData);
                toast({
                  title: "Address added successfully!",
                  variant: "custom"
                });
            }
        })
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
          deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            toast({
              title: "Address deleted successfully",
              variant: "custom"
            });
          }
        });
    }

    function handleEditAddress(getCuurentAddress) {
        setCurrentEditedId(getCuurentAddress?._id);
        setFormData({
          ...formData,
          address: getCuurentAddress?.address,
          city: getCuurentAddress?.city,
          phone: getCuurentAddress?.phone,
          pincode: getCuurentAddress?.pincode,
          notes: getCuurentAddress?.notes,
        });
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id));
    }, [dispatch]);

    return(
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
            {addressList && addressList.length > 0 ? addressList.map((singleAddressItem) => (
              <AddressCard
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
              />
            ))
            : null}
            </div>
            <CardHeader>
                {currentEditedId !== null ? "Edit Address" : "Add New Address"}
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm 
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Edit Address" : "Add New Address"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
}

export default Address;