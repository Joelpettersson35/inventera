import { useState } from "react"
import { Link } from "react-router"
import type { Category } from "../types/Category";

type CategoryItemsListProps = {
    category: Category;
}

export default function CategoryListItem({category}: CategoryItemsListProps){
    const [isExpanded, setIsExpanded] = useState(false);
    return(
        <li className="flex w-full justify-centers p-3">
            <h2 className=" text-xl text-center">{category.name}</h2>
        </li>
    )
}