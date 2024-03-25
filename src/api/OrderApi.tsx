import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string
        name: string
        quantity: string
    }[]
    deliveryDetails: {
        email: string | undefined
        name: string
        addressLine: string
        city: string
        country: string
    }
    restaurantId: string
}

export const useCreateCheckoutSession = () => {

    const { getAccessTokenSilently } = useAuth0()

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const token = await getAccessTokenSilently()
        const response = await axios.post(
            `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
            checkoutSessionRequest, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if (!response.data) {
            throw new Error('Error creating checkout session')
        }
        return response.data
    }

    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        isSuccess,
        isError,
        error,
        reset
    } = useMutation(createCheckoutSessionRequest)

    if (error) {
        toast.error(error.toString())
        reset()
    }

    return {
        createCheckoutSession,
        isLoading,
        isSuccess,
        isError,
        error
}
}