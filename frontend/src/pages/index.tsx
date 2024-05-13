
import SearchBar from "@/components/search-bar";
import AdaptationMenu from "@/components/adaptation-menu";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import locationPin from "@/assets/location-dot-solid.svg"
import Loading from "@/components/loading";
import URL_API from "@/utils/url-api";
import { useState } from "react";
import Establishment from "@/components/establishment";
import Footer from "@/components/footer";
import LoadMore from "@/components/load-more";

export default function Home() {
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem("token");
    const userURL = `/user/${userId}/`;
    const establishmentUrl: string = "/establishment/";
    const [establishmentData, setEstablishmentData]: any = useState([]);
    const [lastResponse, _setLastResponse]: any = useState(null);
    const [establishmentFetched, setEstablishmentFetched] = useState(false);
    const [showAdaptations, setShowAdaptations]: any = useState(true);
    const [checked, setChecked] = useState(new Set<number>());
    const [adaptationsFetched, setAdaptationsFetched] = useState(false);
    const location = sessionStorage.getItem("location");
    const lon: any = location?.split(',')[0] ? location?.split(',')[0] : "-5.987375667032342";
    const lat: any = location?.split(',')[1] ? location?.split(',')[1] : "37.3930443446";
    const [searchInput, _setSearchInput] = useState("");

    if (!sessionStorage.getItem("token") || !sessionStorage.getItem("user")) {
        window.location.href = "/login";
        return
    }
    else {
        if (!location) {
            window.location.href = "/location";
            return
        }
    }
    function setLastResponse(response: any) {
        _setLastResponse(response);
        setEstablishmentData([...establishmentData, ...response.results])
        setEstablishmentFetched(true);
    }
    function getData(url: string) {
        fetch(url)
            .then((response) => response.json())
            .then(
                (data) => {
                    setLastResponse(data);
                }
            );
    }
    function getAdaptations() {
        fetch(URL_API + userURL, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            }
        }).then((response) => response.json())
            .then((data) => { setAdaptationsFetched(true); setChecked(new Set(data.adaptations.adaptations)) });
    }
    function showData() {
        if (establishmentData.length == 0) {
            if (!adaptationsFetched) getAdaptations();
            if (!establishmentFetched && adaptationsFetched) getData(`${URL_API}${establishmentUrl}${lon},${lat},${2000}/?adaptations=${Array.from(checked).join(",")}&search=${searchInput}`);
            return <Loading className="justify-center items-center flex" style={{ height: window.innerHeight - 356 }} />;
        }

        const establishments: any = [];
        establishmentData.forEach((establishment: any) => establishments.push(
            <Establishment
                id={establishment.id}
                name={establishment.name}
                address={establishment.address}
                website={establishment.website}
                adaptations={establishment.adaptations}
                images={establishment.images}
                location={establishment.location}
                stars={establishment.stars} />
        ));
        return establishments;
    }

    function getMoreData() {
        getData(lastResponse.next);
    }
    function toggleShowAdaptation() {
        setShowAdaptations(!showAdaptations);
    }
    function toggleChecked(adaptationId: number) {
        checked.has(adaptationId) ? checked.delete(adaptationId) : checked.add(adaptationId);
        getData(`${URL_API}${establishmentUrl}${lon},${lat},${2000}/?adaptations=${Array.from(checked).join(",")}&search=${searchInput}`);
        establishmentData.length = 0;
    }
    function setSearchInput(event: any){
        _setSearchInput(event.target.value);
        getData(`${URL_API}${establishmentUrl}${lon},${lat},${2000}/?adaptations=${Array.from(checked).join(",")}&search=${event.target.value}`);
        establishmentData.length = 0;
    }
    return (
        <>
            <a className="m-4 flex" href="/location">
                <img src={locationPin} alt="Location Icon" className="h-6 mr-2" />
                <p className="font-semibold pt-1 truncate">Avenida de la Reina Mercedes, Sevilla</p>
            </a>
            <SearchBar toggleMenu={toggleShowAdaptation} onChange={setSearchInput}/>
            {(showAdaptations && adaptationsFetched) && <AdaptationMenu checked={checked} toggleChecked={toggleChecked} />}
            <div className="m-4">
                <p className="font-semibold">Cerca de ti</p>
                <a className="text-xs flex" href="/establishments?showMap=true">
                    <p className="mr-2"> Ir al mapa</p>
                    <GlobeEuropeAfricaIcon className="h-4" />
                </a>
            </div>

            <div>
                {showData()}
            </div>
            <LoadMore loadMore={!(lastResponse && lastResponse.next)} getMoreData={getMoreData} />
            <Footer className="mt-4" />
        </>
    );
}