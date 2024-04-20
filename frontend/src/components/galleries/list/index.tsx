import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MEDIA_URL from "@/utils/media-url";
interface args {
    images: any[]
}

function ListImageSweeper({ images }: args) {
    const [current, setCurrent] = useState(0);

    function goLeft(): void {
        if (current > 0)
            setCurrent(current - 1);
    }

    function goRight(): void {
        if (current < images.length - 1)
            setCurrent(current + 1);
    }
    return (
        <div className="m-0 h-92 w-full relative overflow-hidden rounded-t-xl">
            {
                images.map((image, index) => (
                    <img className={`m-0 w-fit h-fit absolute top-0 -translate-y-1/4 transition-all ${index == current ? "" :
                        index < current ? "-translate-x-full" : "translate-x-full"}`} src={MEDIA_URL + image.url} />
                ))}
            <div className={"absolute left-0 top-4 rounded-full bg-black opacity-50 " + (current == 0 ? "invisible" : "")} onClick={goLeft}><ChevronLeftIcon className="h-14 text-white" /></div>
            <div className={"absolute right-0 top-4 rounded-full bg-black opacity-50 " + (current == images.length-1 ? "invisible": "")} onClick={goRight}><ChevronRightIcon className="h-14 text-white" /></div>
        </div>
    );
}

export default ListImageSweeper;