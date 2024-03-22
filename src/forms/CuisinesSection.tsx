import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurantCuisinesOptions";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

export default function CuisinesSection() {

    const { control } = useFormContext()

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    View and select the cuisines your restaurant serves
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="cuisines"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {
                                cuisineList.map((cuisine) => (
                                    <CuisineCheckbox cuisine={cuisine} field={field} />
                                ))
                            }
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}