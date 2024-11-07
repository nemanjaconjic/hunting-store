import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/rating";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useState, useEffect } from "react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();
    const { cartItems } = useSelector((state) => state.shopCart);
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);
    const { reviews } = useSelector((state) => state.shopReview);

    function handleAddToCart(getCurrentProductId, getTotalStock) {
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
    
    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }

    function handleRatingChange(getRating) {
        setRating(getRating);
    }

    function handleAddReview() {
        dispatch(
          addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
          })
        ).then((data) => {
            if (data.payload.success) {
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails?._id));
                toast({
                  title: "Review added successfully!",
                });
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);
    
    const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
    : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose} className="overflow-auto">
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] overflow-auto">
                <div className="relative overflow-auto rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="overflow-auto">
                    <h1 className="text-2xl font-extrabold">{productDetails?.title}</h1>
                    <p className="text-muted-foreground mb-5 mt-4">{productDetails?.description}</p>
                    <div className="flex justify-between">
                        <p className={`text-3xl font-bold text-muted-foreground ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-3xl font-extrabold">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex item-center gap-2">
                        <div className="flex items-center gap-0.5 mt-3">
                            <StarRatingComponent rating={averageReview} />
                        </div>
                        <span className="text-muted-foreground mt-5 font-bold">
                            {averageReview.toFixed(2)}
                        </span>
                    </div>
                    <div className="mt-5 mb-5">
                    {productDetails?.totalStock === 0 ? (
                    <Button className="w-full opacity-60 cursor-not-allowed">
                        Out of Stock
                    </Button>
                    ) : (
                    <Button className="w-full" onClick={() =>handleAddToCart(
                        productDetails?._id,
                        productDetails?.totalStock)}>
                        Add to Cart
                    </Button>
                    )}
                    </div>
                    <Separator/>
                    <div className="max-h-[100px] overflow-auto">
                        <div className="grid gap-6">
                        {reviews && reviews.length > 0 ? ( reviews.map((reviewItem) => (
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>
                                    {reviewItem?.userName[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold">{reviewItem?.userName}</h3>
                            </div>
                        <div className="flex items-center gap-0.5">
                            <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                            <p className="text-muted-foreground">
                            {reviewItem.reviewMessage}
                            </p>
                        </div>
                    </div>
                    ))
                    ) : (
                    null
                    )}
                    </div>
                </div>
                    <div className="flex flex-col gap-2 mt-10">
                        <Label>Write a review</Label>
                        <div className="flex gap-1">
                            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange}/>
                        </div>
                        <Input
                            name="reviewMsg"
                            value={reviewMsg}
                            onChange={(event) => setReviewMsg(event.target.value)}
                            placeholder="Write a review..."/>
                        <Button disabled={reviewMsg.trim() === ""} onClick={handleAddReview}>Submit</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;