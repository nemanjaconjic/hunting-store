import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import ShoopingOrdersDetailsView from "./order-details";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { Badge } from "../ui/badge";

function ShoopingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetails(getId));
      }

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id));
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    console.log(orderList,"order list");

    return(
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Order ID</TableHead>
                            <TableHead className="text-center">Order Date</TableHead>
                            <TableHead className="text-center">Order Status</TableHead>
                            <TableHead className="text-center">Order Price</TableHead>
                            <TableHead className="text-center">
                                <span className="sr-only">Details</span>
                             </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderList && orderList.length > 0 ? orderList.map((orderItem) => (
                        <TableRow>
                            <TableCell>{orderItem?._id}</TableCell>
                            <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                            <TableCell>
                                <Badge className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                                    ? "bg-green-500"
                                    : orderItem?.orderStatus === "rejected"
                                    ? "bg-red-600"
                                    : "bg-black"}`}>
                                    {orderItem?.orderStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>${orderItem?.totalAmount}</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={() => {
                                    setOpenDetailsDialog(false);
                                    dispatch(resetOrderDetails());}}>
                                    <Button onClick={() =>handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                    <ShoopingOrdersDetailsView orderDetails={orderDetails}/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                        )): null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default ShoopingOrders;