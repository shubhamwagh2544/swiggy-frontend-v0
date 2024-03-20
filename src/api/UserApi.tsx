import { useMutation } from "react-query"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

type CreateUserRequest = {
    auth0Id: string
    email: string
}

export const useCreateUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createUserRequest = async (user: CreateUserRequest) => {
        const accesstoken = await getAccessTokenSilently()
        const response = await axios.post(`${API_BASE_URL}/api/user`, user, {
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.data) {
            throw new Error('Error creating user')
        }
        return response.data
    }

    const {
        mutateAsync: createUser,
        isLoading,
        isSuccess,
        isError
    } = useMutation(createUserRequest)

    return {
        createUser,
        isLoading,
        isSuccess,
        isError
    }
}

type UserUpdateRequest = {
    name: string
    addressLine: string
    city: string
    country: string
}

export const useUpdateUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const updateUserRequest = async (user: UserUpdateRequest) => {
        const accesstoken = await getAccessTokenSilently()
        const response = await axios.put(`${API_BASE_URL}/api/user`, user, {
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.data) {
            throw new Error('Error updating user')
        }
        return response.data
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        isError,
        reset
    } = useMutation(updateUserRequest)

    return {
        updateUser,
        isLoading,
        isSuccess,
        isError,
        reset
    }
}