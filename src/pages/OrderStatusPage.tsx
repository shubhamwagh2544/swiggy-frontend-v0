import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";

export default function OrderStatusPage() {
    const { orders, isLoading } = useGetMyOrders()

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (!orders || orders.length === 0) {
        return <span>No orders found</span>
    }

    return (
        <div className="space-y-10">
            {
                orders.map(order => (
                    <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                        <OrderStatusHeader order={order} />
                    </div>
                ))
            }
        </div>
    )
}