import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

export default function CheckoutButton() {

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()

    async function onLogin() {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if (!isAuthenticated) {
        return (
            <Button
                className="bg-orange-500 flex-1"
                onClick={onLogin}
            >
                Log In To Check Out
            </Button>
        )
    }

    if (isAuthLoading) {
        return <LoadingButton />
    }
}