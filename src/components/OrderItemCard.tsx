import { Order, OrderStatus } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ORDER_STATUS } from "@/config/orderStatusConfig"
import { useUpdateOrderStatus } from "@/api/RestaurantApi"
import { useEffect, useState } from "react"

type Props = {
    order: Order
}

export default function OrderItemCard({ order }: Props) {

    const { updateOrderStatus, isLoading } = useUpdateOrderStatus()
    const [status, setStatus] = useState<OrderStatus>(order.status)

    async function handleStatusUpdate(newStatus: OrderStatus) {
        await updateOrderStatus({
            orderId: order._id,
            status: newStatus
        })
        setStatus(newStatus)
    }

    useEffect(() => {
        setStatus(order.status)
    }, [order.status])

    function getOrderTime() {
        const date = new Date(order.createdAt)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${hours}:${paddedMinutes}`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery Address:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.addressLine},
                            {order.deliveryDetails.city}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-2 font-normal">
                            {getOrderTime()}
                        </span>
                    </div>
                    <div>
                        Total Amount:
                        <span className="ml-2 font-normal">
                            {order.totalAmount}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {
                        order.cartItems.map(cartItem => (
                            <span>
                                <Badge variant="outline" className="mr-2">
                                    {cartItem.quantity}
                                </Badge>
                                {cartItem.name} : {cartItem.price} $
                            </span>
                        ))
                    }
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">
                        What is the status of this order ?
                    </Label>
                    <Select
                        value={status}
                        disabled={isLoading}
                        onValueChange={(value) => {
                            handleStatusUpdate(value as OrderStatus)
                        }}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {
                                ORDER_STATUS.map(status => (
                                    <SelectItem value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}