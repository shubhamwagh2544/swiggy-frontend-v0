import { Link } from "react-router-dom"

type Props = {
    total: number
    city: string
}

export default function SearchResultInfo({ total, city }: Props) {
    return (
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} restaurants found in {city}
                <Link
                    to="/"
                    className="text-orange-500 underline text-sm font-semibold cursor-pointer ml-2"
                >
                    Change Location
                </Link>
            </span>
        </div>
    )
}