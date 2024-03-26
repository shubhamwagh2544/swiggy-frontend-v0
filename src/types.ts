export type User = {
    _id: string
    email: string
    name: string
    addressLine: string
    city: string
    country: string
}

export type MenuItem = {
    _id: string
    name: string
    price: number
}

export type Restaurant = {
    _id: string
    user: string
    restaurantName: string
    city: string
    country: string
    deliveryPrice: number
    estimatedDeliveryTime: number
    cuisines: string[]
    menuItems: MenuItem[]
    imageUrl: string
    lastUpdated: Date | string
}

export type RestaurantSearchResponse = {
    data: Restaurant[]
    pagination: {
        total: number
        page: number
        pages: number
    }
}

export type OrderStatus = 'placed' | 'paid' | 'inProgress' | 'outForDelivery' | 'delivered'

export type Order = {
    _id: string
    restaurant: Restaurant
    user: User
    cartItems: {
        menuItemId: string
        name: string
        quantity: string
        price: number
    }[]
    deliveryDetails: {
        email: string
        name: string
        addressLine: string
        city: string
        country: string
    }
    totalAmount: number
    status: OrderStatus,
    createdAt: Date | string
    restaurantId: string
}