import { Order } from "@/types"
import { Separator } from "./ui/separator"

type Props = {
    order: Order
}

export default function OrderStatusDetail({ order }: Props) {
    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold">Delivery To: </span>
                <span>{order.deliveryDetails.name}</span>
                <span>{order.deliveryDetails.addressLine}, {order.deliveryDetails.city}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">Your Order: </span>
                <ul>
                    {
                        order.cartItems.map(item => (
                            <li>
                                {item.name} : {item.price} $
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Separator />
            <div className="flex flex-col">
                <span className="font-bold">Total: </span>
                <span>$ {order.totalAmount}</span>
            </div>
        </div>
    )
}