import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/UserProfileForm";
import { useGetUser } from "@/api/UserApi";

type Props = {
    onCheckout: (userFormData: UserFormData) => void
    disabled: boolean
    isLoading: boolean
}


export default function CheckoutButton({ onCheckout, disabled, isLoading }: Props) {

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()

    const { currentUser, isLoading: isUserLoading } = useGetUser()

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

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-orange-500 flex-1"
                    disabled={disabled}
                >
                    Continue To Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isUserLoading}
                    title="Confirm Delivery Details"
                    buttonText="Proceed To Payment"
                    subTitle="Please add your delivery details below to continue with your order."
                />
            </DialogContent>
        </Dialog>
    )
}