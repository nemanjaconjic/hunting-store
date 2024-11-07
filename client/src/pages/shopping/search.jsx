import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping/product-details";

function SearchProducts() {

    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResults } = useSelector((state) => state.shopSearch);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { toast } = useToast();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { productDetails } = useSelector((state) => state.shopProducts);

    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];
        if (getCartItems.length) {
          const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductId
          );
          if (indexOfCurrentItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              toast({
                title: `Only ${getQuantity} quantity can be added for this item!`,
                variant: "destructive",
              });
    
              return;
            }
          }
        }
        dispatch(
          addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({
              title: "Product is added to cart!",
              variant: "custom"
            });
          }
        });
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
          setTimeout(() => {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(getSearchResults(keyword));
          }, 1000);
        } else {
          setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
          dispatch(resetSearchResults());
        }
    }, [keyword]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
      }, [productDetails]);

    return(
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                <Input
                    value={keyword}
                    name="keyword"
                    onChange={(event) => setKeyword(event.target.value)}
                    className="py-6"
                    placeholder="Search Products..."
                />
                </div>
            </div>
            {!searchResults.length ? (
                <h1 className="text-3xl font-bold">No products found!</h1>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {searchResults.map((item) => (
                <ShoppingProductTile
                    product={item}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                />
            ))}
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default SearchProducts;