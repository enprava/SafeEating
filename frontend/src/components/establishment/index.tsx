import MEDIA_URL from "@/utils/media-url";
import { GlobeEuropeAfricaIcon, StarIcon, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export type establishmentArgs = {
    name: string,
    address: string,
    website: string,
    adaptations: any,
    images: [any],
    location: { type: string, coordinates: [number, number] },
    stars: number,
    liked?: boolean,
    className?: string
}

function Establishment({ name, address, website, adaptations, images, location, stars, liked = false , className=""}: establishmentArgs) {
    const [isLiked, setIsLiked] = useState(liked);

    function getVeggies() {
        var vegen = null;
        for (const adapt of adaptations) {
            if (adapt.name == "Vegano")
                return <img src={MEDIA_URL + adapt.url} alt={adapt.name} className="mt-1 ml-1 h-12 justify-self-center text-no-veggie" />

            if (adapt.name == "Vegetariano")
                vegen = adapt;
        }

        if (vegen) {
            return <img src={MEDIA_URL + vegen.url} alt={vegen.name} className="mt-1 ml-1 h-12 justify-self-center text-no-veggie" />
        }
        return <NoSymbolIcon className="mt-1 ml-1 h-12 justify-self-center text-no-veggie" />

    }

    function showIntolerances() {
        let intolerances = [];
        for (const adapt of adaptations) {
            if (adapt.name != "Vegetariano" && adapt.name != "Vegano") {
                intolerances.push(<img src={MEDIA_URL + adapt.url} alt={adapt.name} className="h-5" />)
            }
        }
        const sumIntolerances = intolerances.length;
        if (sumIntolerances > 6) {
            intolerances = intolerances.slice(0, 6);
            intolerances.push(<p className="text-text-gray text-xs col-span-3 justify-self-center" style={{ fontSize: 8, lineHeight: 1 }}>{sumIntolerances - 6} alérgeno{sumIntolerances - 6 > 1 ? "s" : null} más</p>)
        }
        if (sumIntolerances > 3) {
            return (
                <>
                    <div className="grid grid-cols-3 gap-1">
                        {intolerances}

                    </div>
                </>
            );
        }


        return (
            <>
                <div className="flex justify-around items-center">
                    {intolerances}
                </div>
            </>
        );
    }

    function onClickLike() {
        setIsLiked(!isLiked);
    }
    return (
        <div className={"mx-2 mt-3 border rounded-xl border-solid border-border overflow-hidden drop-shadow-2xl h-40 bg-white pb-5 " + className} >
            <div className="flex flex-row overflow-hidden h-4/6 w-full relative">
                {images.map((image) => (
                    <div className="m-0 w-fit h-fit absolute">
                        <img src={MEDIA_URL + image.url} className="m-0 h-full w-full -translate-y-1/2" />
                    </div>
                ))}
            </div>
            <div className="m-0 grid grid-cols-2">
                <div className=" mx-2  mt-1 flex flex-col justify-around">
                    <p className="text-xs font-semibold truncate">{name}</p>
                    <div className="flex items-end">
                        <StarIcon className="h-4 text-star mr-2" />
                        <p className="text-xs/3">{stars}</p>
                    </div>
                    <div className="flex">
                        <p className="truncate" style={{ fontSize: 9, lineHeight: 2 }}>{address}</p>
                        <a className="max-w-4 mr-1" href={`https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`} target="_blank"><GlobeEuropeAfricaIcon className="w-full h-full" /></a>
                        <div className="max-w-4">{isLiked ? <HeartIconSolid className="w-full h-full text-like" onClick={onClickLike} /> : <HeartIconOutline className="w-full h-full" onClick={onClickLike} />}</div>
                    </div>
                </div>
                <div className="ml-4 mt-1 grid grid-cols-2">
                    {showIntolerances()}
                    {getVeggies()}
                </div>
            </div>
        </div>
    );
}

export default Establishment;
