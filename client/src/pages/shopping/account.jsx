import accountpicture from "../../assets/account-picture.jpg";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping/address";
import ShoopingOrders from "@/components/shopping/orders";

function ShoppingAccount() {
    return (
      <div className="flex flex-col">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img src={accountpicture} className="h-full w-full object-cover object-center"/>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address" className="ml-0.5">Address</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <ShoopingOrders/>
              </TabsContent>
              <TabsContent value="address">
                <Address/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  
  export default ShoppingAccount;