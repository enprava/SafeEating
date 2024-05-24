import MEDIA_URL from "@/utils/media-url";
import { GlobeEuropeAfricaIcon, StarIcon } from "@heroicons/react/24/solid";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import ListImageSweeper from "../galleries/list";

export type establishmentArgs = {
    id: number,
    name: string,
    address: string,
    website: string,
    adaptations: any,
    images: [any],
    location: { type: string, coordinates: [number, number] },
    stars: number,
    className?: string
}

function Establishment({ id, name, address, adaptations, images, location, stars, className = "" }: establishmentArgs) {


    function getVeggies() {
        let vegen = null;
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
    return (
        <div className={"m-4 border rounded-xl border-solid border-border drop-shadow-2xl h-40 bg-white pb-5 " + className} >
            <div className="flex flex-row h-4/6 w-full relative overflow-hidden">
                <ListImageSweeper images={[images[0]]} href={"/establishments/" + id.toString()} />
            </div>
            <a href={"/establishments/" + id.toString()}>
                <div className="grid grid-cols-2">
                    <div className=" mx-2  mt-1 flex flex-col justify-around">
                        <p className="text-xs font-semibold truncate">{name}</p>
                        <div className="flex items-end">
                            <StarIcon className="h-4 text-star mr-2" />
                            <p className="text-xs/3">{stars}</p>
                        </div>
                        <div className="flex z-10 justify-between">
                            <p className="truncate" style={{ fontSize: 9, lineHeight: 2 }}>{address}</p>
                            <a className="max-w-4" href={`https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`} target="_blank"><GlobeEuropeAfricaIcon className="w-full h-full" /></a>
                        </div>
                    </div>
                    <div className="ml-4 mt-1 grid grid-cols-2">
                        {showIntolerances()}
                        {getVeggies()}
                    </div>
                </div>
            </a>

        </div>
    );
}

export default Establishment;
