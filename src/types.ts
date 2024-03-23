export type User = {
    _id: string
    email: string
    name: string
    addressLine: string
    city: string
    country: string
}

export type MenuItem = {
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