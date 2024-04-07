import SearchBar from "@/components/search-bar";
import AdaptationMenu from "@/components/adaptation-menu";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import locationPin from "@/assets/location-dot-solid.svg"
import Loading from "@/components/loading";
import URL_API from "@/utils/url-api";
import { useState } from "react";
import Establishment from "@/components/establishment";
import Footer from "@/components/footer";

export default function () {
    const establishmentUrl: string = "/establishment";
    const [establishmentData, setEstablishmentData]: any | {} = useState(null);


    function getData() {
        fetch(URL_API + establishmentUrl)
            .then((response) => response.json())
            .then(
                (data) => {
                    setEstablishmentData(data);
                }
            );
    };

    function showData() {
        if (!establishmentData) {
            getData();
            return <Loading className="m-0 justify-center items-center flex" />;
        }

        const establishments: any = [];

        establishmentData.results.forEach((establishment: any) => establishments.push(
            <Establishment name={establishment.name} address={establishment.address} website={establishment.website} adaptations={establishment.adaptations} images={establishment.images} location={establishment.location} stars={establishment.stars} />
        ));
        return establishments;
    }

    return (
        <>
            <div className="my-2 ml-2 flex">
                <img src={locationPin} alt="Location Icon" className="h-6 mr-2" />
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

            <div>
                {showData()}
            </div>
            <Footer className="mt-2"/>
        </>
    );
}