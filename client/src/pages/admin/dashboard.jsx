import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllProductsForAdmin, getAllUsersForAdmin, getAllOrdersForAdmin, getSummaryForAdmin, getChartData } from "@/store/admin/dashboard-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function AdminDashboard() {

    const {userList} = useSelector((state)=>state.adminDashboard);
    const {orderList} = useSelector((state)=>state.adminDashboard);
    const {productList} = useSelector((state)=>state.adminDashboard);
    const {totalSum} = useSelector((state)=>state.adminDashboard);
    const {chartData} = useSelector((state) => state.adminDashboard);
    const dispatch = useDispatch();  
    
    useEffect(()=>{
        dispatch(getAllUsersForAdmin());
        dispatch(getAllProductsForAdmin());
        dispatch(getAllOrdersForAdmin());
        dispatch(getSummaryForAdmin());
        dispatch(getChartData());
    },[dispatch]);

    const formattedData = {
        labels: chartData.map(item => item._id), // Dates as labels
        datasets: [
            {
                label: 'Total Sales by Day',
                data: chartData.map(item => item.totalAmount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    return (
    <div className="flex flex-col">
        <div className="flex flex-row gap-5">
        <Card className="w-60">
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent className="font-bold text-4xl">
                {userList?.length}
            </CardContent>
        </Card>

        <Card className="w-60">
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent className="font-bold text-4xl">
                {productList?.length}
            </CardContent>
        </Card>

        <Card className="w-60">
            <CardHeader>
                <CardTitle>Sales</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent className="font-bold text-4xl">
                {orderList?.length}
            </CardContent>
        </Card>

        <Card className="w-60">
            <CardHeader>
                <CardTitle>Profit</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent className="font-bold text-4xl">
                ${totalSum}
            </CardContent>
        </Card>
        </div>
        <div>
            <Card className="mt-5">
            <h2 className="font-bold text-2xl">Sales Chart by Day</h2>
            <Line data={formattedData} />
            </Card>
        </div>
    </div>
    );
}

export default AdminDashboard;