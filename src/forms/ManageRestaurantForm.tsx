import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { Form } from '@/components/ui/form'
import DetailsSection from './DetailsSection'
import { Separator } from '@/components/ui/separator'
import CuisinesSection from './CuisinesSection'
import MenuSection from './MenuSection'
import ImageSection from './ImageSection'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'

const restaurantFormSchema = zod.object({
    restaurantName: zod.string({
        required_error: 'Restaurant name is required'
    }),
    city: zod.string({
        required_error: 'City is required'
    }),
    country: zod.string({
        required_error: 'Country is required'
    }),
    deliveryPrice: zod.coerce.number({
        required_error: 'Delivery price is required',
        invalid_type_error: 'Delivery price must be a number'
    }),
    estimatedDeliveryTime: zod.coerce.number({
        required_error: 'Estimated delivery time is required',
        invalid_type_error: 'Estimated delivery time must be a number'
    }),
    cuisines: zod.array(zod.string()).nonempty({
        message: 'Please select at least one cuisine'
    }),
    menuItems: zod.array(zod.object({
        name: zod.string({
            required_error: 'Menu item name is required'
        }),
        price: zod.coerce.number({
            required_error: 'Menu item price is required',
            invalid_type_error: 'Menu item price must be a number'
        })
    })),
    imageUrl: zod.string().optional(),
    imageFile: zod.instanceof(File, {
        message: "Please upload an image"
    }).optional(),
})

type RestaurantFormData = zod.infer<typeof restaurantFormSchema>

type Props = {
    onSave: (restaurantFormData: FormData) => void,
    isLoading: boolean
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(restaurantFormSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{
                name: "",
                price: 0
            }]
        }
    })

    function onSubmit(formDataJson: RestaurantFormData) {
        const formData = new FormData()
        formData.append('restaurantName', formDataJson.restaurantName)
        formData.append('city', formDataJson.city)
        formData.append('country', formDataJson.country)
        formData.append('deliveryPrice', formDataJson.deliveryPrice.toString())
        formData.append('estimatedDeliveryTime', formDataJson.estimatedDeliveryTime.toString())
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString())
        })
        formData.append('imageFile', formDataJson.imageFile as File)
        
        onSave(formData)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 bg-gray-50 rounded-lg md:p-10'
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                <Separator />
                {
                    isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button type='submit' className='bg-orange-500'>
                            Submit
                        </Button>
                    )
                }
            </form>
        </Form>
    )
}

export default ManageRestaurantForm