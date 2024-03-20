import { useEffect, useRef } from "react"
import { useCreateUser } from "@/api/UserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

export default function AuthCallbackPage() {

    const { user } = useAuth0()
    const { createUser } = useCreateUser()
    const navigate = useNavigate()
    const hasUserCreated = useRef(false)

    useEffect(() => {
        if (user?.sub && user.email && !hasUserCreated.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email
            })
            hasUserCreated.current = true
        }
        navigate('/')
    }, [user, createUser, navigate])

    return (
        <>Loading...</>
    )
}