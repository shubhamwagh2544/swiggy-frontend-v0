import { CartItem } from "@/pages/RestaurantDetailsPage"
import { Restaurant } from "@/types"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
}

export default function OrderSummary({ restaurant, cartItems }: Props) {

    function getTotalCost() {
        let totalCost = 0
        cartItems.forEach((item) => {
            totalCost += item.price * item.quantity
        })
        totalCost += restaurant.deliveryPrice
        return totalCost
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tighter flex justify-between">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {
                    cartItems.map((item) => (
                        <div className="flex justify-between">
                            <span>
                                <Badge variant="outline" className="mr-2">
                                    {item.quantity}
                                </Badge>
                                {item.name}
                            </span>
                            <span className="flex items-center gap-1">
                                ${item.price * item.quantity}
                            </span>
                        </div>
                    ))
                }
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{restaurant.deliveryPrice}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}