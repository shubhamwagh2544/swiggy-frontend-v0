import zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { User } from '@/types'
import { useEffect } from 'react'

const formSchema = zod.object({
    email: zod.string().email().optional(),
    name: zod.string().min(1, 'Name is required'),
    addressLine: zod.string().min(1, 'Address line is required'),
    city: zod.string().min(1, 'City is required'),
    country: zod.string().min(1, 'Country is required')
})

export type UserFormData = zod.infer<typeof formSchema>

type Props = {
    currentUser: User
    onSave: (userProfileData: UserFormData) => void
    isLoading: boolean,
    title?: string
    buttonText?: string
    subTitle?: string
}

const UserProfileForm = ({
    onSave,
    isLoading,
    currentUser,
    title = "User Profile",
    buttonText = "Submit",
    subTitle = "View and edit your profile details below"
}: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    })

    useEffect(() => {
        form.reset(currentUser)
    }, [currentUser, form])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className='space-y-4 bg-gray-50 rounded-lg md:p-10'
            >
                <div>
                    <h2 className='text-2xl font-bold'>{title}</h2>
                    <FormDescription>
                        {subTitle}
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input {...field} disabled className='bg-white' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex flex-col md:flex-row gap-4'>
                    <FormField
                        control={form.control}
                        name="addressLine"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>
                                    AddressLine
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>
                                    City
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>
                                    Country
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {
                    isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button type='submit' className='bg-orange-500'>
                            {buttonText}
                        </Button>
                    )
                }
            </form>
        </Form>
    )
}

export default UserProfileForm