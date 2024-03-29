import SearchBar from "@/components/search-bar";
import AdaptationMenu from "@/components/adaptation-menu";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import locationPin from "@/assets/location-dot-solid.svg"

export default function () {
    return (
        <>
            <div className="my-2 ml-2 flex">
                <img src={locationPin} alt="Location Icon" className="h-6 mr-2"/>
                <p className="font-semibold pt-1 truncate">Avenida de la Reina Mercedes, Sevilla</p>
            </div>
            <SearchBar />
            <AdaptationMenu />
            <div>
                <p className="font-semibold ml-2 mt-2">Cerca de ti</p>
                <div className="text-xs ml-2 flex">
                    <a className="mr-2"> Ir al mapa</a>
                    <GlobeEuropeAfricaIcon className="h-4" />
                </div>
            </div>
        </>
    );
}