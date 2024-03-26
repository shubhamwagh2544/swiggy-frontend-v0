import { Order } from "@/types"
import { Progress } from "./ui/progress"
import { ORDER_STATUS } from "@/config/orderStatusConfig"

type Props = {
    order: Order
}

export default function OrderStatusHeader({ order }: Props) {

    function getExpectedDelivery() {
        const date = new Date(order.createdAt)
        date.setMinutes(date.getMinutes() + order.restaurant.estimatedDeliveryTime)

        const hours = date.getHours()
        const minutes = date.getMinutes()
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${hours}:${paddedMinutes}`
    }

    function getOrderStatusInfo() {
        return (
            ORDER_STATUS.find(status => status.value === order.status) || ORDER_STATUS[0]
        )
    }

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span>Order Status: {getOrderStatusInfo().label}</span>
                <span>Expected By: {getExpectedDelivery()}</span>
            </h1>
            <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue} />
        </>
    )
}