import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsersAdmin, deleteUserAdmin } from "@/store/admin/users-slice";
import { Button } from "@/components/ui/button";

function AdminUsers(){

    const {usersList} = useSelector((state)=>state.adminUsers);
    const dispatch = useDispatch();

    function handleDelete(userId){
        dispatch(deleteUserAdmin(userId)).then((data) => {
            if (data?.payload?.success) {
              dispatch(getAllUsersAdmin());
            }
        });
    };

    useEffect(()=>{
        dispatch(getAllUsersAdmin());
    },[dispatch]);

    console.log(usersList,"userList");

    return(
        <Card>
            <CardHeader>
                <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">User ID</TableHead>
                            <TableHead className="text-center">User Name</TableHead>
                            <TableHead className="text-center">User Email</TableHead>
                            <TableHead className="text-center">User Role</TableHead>
                            <TableHead className="text-center">
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {usersList && usersList.length > 0 ? usersList.map((userItem) => (
                        <TableRow>
                            <TableCell>{userItem?._id}</TableCell>
                            <TableCell>{userItem?.userName}</TableCell>
                            <TableCell>{userItem?.email}</TableCell>
                            <TableCell>{userItem?.role}</TableCell>
                            <TableCell>
                                
                                <Button onClick={()=>handleDelete(userItem?._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                        )): null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default AdminUsers;