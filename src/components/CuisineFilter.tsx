import { cuisineList } from "@/config/restaurantCuisinesOptions"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"

type Props = {
    onChange: (cuisines: string[]) => void
    selectedCuisines: string[]
    isExpanded: boolean
    onExpandedClick: () => void
}

export default function CuisineFilter({ onChange, selectedCuisines, isExpanded, onExpandedClick }: Props) {

    function handleCuisineReset() {
        onChange([])
    }

    function handleCuisineChange(e: React.ChangeEvent<HTMLInputElement>) {
        const clickedCuisine = e.target.value
        const isChecked = e.target.checked

        const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter(cuisine => cuisine !== clickedCuisine)

        onChange(newCuisinesList)
    }

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
                <div
                    className="text-sm font-semibold mb-2 underline cursor-pointer text-orange-500"
                    onClick={handleCuisineReset}
                >
                    Reset Filters
                </div>
            </div>
            <div className="space-y-2 flex flex-col">
                {
                    cuisineList
                        .slice(0, isExpanded ? cuisineList.length : 7)
                        .map((cuisine) => {
                            const isSelected = selectedCuisines.includes(cuisine)
                            return (
                                <div className="flex">
                                    <input
                                        id={`cuisine_${cuisine}`}
                                        type="checkbox"
                                        className="hidden"
                                        value={cuisine}
                                        checked={isSelected}
                                        onChange={handleCuisineChange}
                                    />
                                    <Label
                                        htmlFor={`cuisine_${cuisine}`}
                                        className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold
                                    ${isSelected ? 'border border-green-600 text-green-600' : 'border border-slate-300'}`}
                                    >
                                        {isSelected && <Check size={20} strokeWidth={3} />}
                                        {cuisine}
                                    </Label>
                                </div>
                            )
                        })
                }
                <Button
                    variant="link"
                    className="mt-4 flex-1"
                    onClick={onExpandedClick}
                >
                    {
                        isExpanded ? (
                            <span className="flex flex-row items-center">
                                View Less <ChevronUp />
                            </span>
                        ) : (
                            <span className="flex flex-row items-center">
                                View More <ChevronDown />
                            </span>
                        )
                    }
                </Button>
            </div>
        </>
    )
}