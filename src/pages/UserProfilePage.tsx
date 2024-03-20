import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/UserProfileForm";

export default function UserProfilePage() {

    const { updateUser, isLoading: isUpdateLoading } = useUpdateUser()
    const { currentUser, isLoading: isGetLoading } = useGetUser()

    if (isGetLoading) {
        return <span>Loading...</span>
    }
    if (!currentUser) {
        return <span>Error fetching user</span>
    }

    return (
        <>
            <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
        </>
    )
}