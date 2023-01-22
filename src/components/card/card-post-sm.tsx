import { MEDIA_BACKEND_API } from "@/libs/constants";
import { PostItem } from "@/models/post";
import { getDateShort } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface Props extends PostItem {
    className?: string;
    id?: number;
    title?: string;
    slug?: string;
    image?: string;
    date?: string;
    author?: string;
}

export default function CardPostSM({
    className = "",
    title,
    slug,
    image,
    date,
    author,
}: Props) {
    return (
        <li>
            <Link
                className="flex items-center"
                href={`/${slug ? encodeURIComponent(slug) : ""}`}
            >
                <div className="relative w-20 overflow-hidden rounded-md aspect-square">
                    {image ? (
                        <Image
                            className="object-cover w-full h-full"
                            src={`${MEDIA_BACKEND_API}${image}`}
                            fill
                            alt={`Image ${title}`}
                        />
                    ) : null}
                </div>

                <div className="w-full ml-2">
                    <h3 className="text-sm font-bold line-clamp-2">{title}</h3>
                    <div className="flex items-center gap-1 pt-2 text-xs">
                        <p className="line-clamp-1">{author}</p>
                        <span className="text-xs">•</span>
                        <p className="line-clamp-1">{getDateShort(date) ?? "-"}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}
