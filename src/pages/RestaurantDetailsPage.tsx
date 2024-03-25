import { useGetSearchedRestaurant } from "@/api/SearchApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string
    name: string
    price: number
    quantity: number
}


export default function RestaurantDetailsPage() {

    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetSearchedRestaurant(restaurantId)

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
        return storedCartItems ? JSON.parse(storedCartItems) : []
    })

    if (isLoading || !restaurant) {
        return <span>Loading...</span>
    }

    function onCheckout(userFormData: UserFormData) {
        console.log('user', userFormData)
    }

    function addToCart(menuItem: MenuItem) {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );

            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }

            // save state to sessionStorage
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            )

            return updatedCartItems;
        });
    };

    function removeFromCart(cartItem: CartItem) {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => item._id !== cartItem._id
            )

            // save state to sessionStorage
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            )

            return updatedCartItems
        })
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    alt="restaurant_image"
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tighter">Menu</span>
                    {
                        restaurant.menuItems.map((menuItem) => (
                            <MenuItemComponent menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                        ))
                    }
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}