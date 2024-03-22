import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

type Props = {
    index: number,
    removeItem: () => void
}

export default function MenuItemInput({ index, removeItem }: Props) {

    const { control } = useFormContext()

    return (
        <div className="flex flex-row items-end gap-2">
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                            <FormMessage />
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="cheese-pizza" />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Price
                            <FormMessage />
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="8.00" />
                        </FormControl>
                    </FormItem>
                )}
            />
            <Button
                type="button"
                onClick={removeItem}
                className="bg-red-500 text-white max-h-fit"
            >
                Remove Menu Item
            </Button>
        </div>
    )
}