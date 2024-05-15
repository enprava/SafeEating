import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import { Tab } from "@headlessui/react";
import {useState } from "react";
import URL_API from "@/utils/url-api";
import Loading from "@/components/loading";
import Establishment from "@/components/establishment";
import MapComponent from "@/components/maps/establishment";
import LoadMore from "@/components/load-more";
import AdaptationMenu from "@/components/adaptation-menu";

export default function EstablishmentList() {
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem("token");
    const userURL = `/user/${userId}/`;
    const [checked, setChecked] = useState(new Set<number>());
    const [adaptationsFetched, setAdaptationsFetched] = useState(false);
    const establishmentUrl: string = "/establishment/";
    const mapUrl: string = "/establishment/mapa/";
    const [establishmentData, setEstablishmentData]: any = useState([]);
    const [mapData, setMapData]: any = useState(null);
    const params = new URLSearchParams(window.location.search);
    const [activeTab, setActiveTad]: any = useState(params.get("showMap") === "true" ? 1 : 0);
    const location = sessionStorage.getItem("location");
    const lon: string = location?.split(',')[0] ? location?.split(',')[0] : "-5.987375667032342";
    const lat: string = location?.split(',')[1] ? location?.split(',')[1] : "37.3930443446";
    const radius = 2000;
    const [lastResponse, _setLastResponse]: any = useState(null);
    const [establishmentFetched, setEstablishmentFetched] = useState(false);
    const loading = <Loading className="justify-center items-center flex" style={{ height: window.innerHeight - 161 }} />;
    const [showAdaptations, setShowAdaptations]: any = useState(false);
    const [searchInput, _setSearchInput] = useState("");

    function getMapData(url: string) {

        fetch(url)
            .then((response) => response.json())
            .then((data) => setMapData(data));

    }

    function getEstablishmentData(url: string) {
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then(
                (data) => setLastResponse(data)
            );
    }

    function showMap() {
        if(!adaptationsFetched)
            getAdaptations();
        if (!mapData && adaptationsFetched) {
            getMapData(`${URL_API}${mapUrl}${lon},${lat},${radius}/?adaptations=${Array.from(checked).join(",")}&search=${searchInput}`);
            return loading
        }
        return <MapComponent data={mapData} small={showAdaptations} lat={parseFloat(lat)} lon={parseFloat(lon)}/>
    }
    function setLastResponse(response: any) {
        _setLastResponse(response);
        setEstablishmentData([...establishmentData, ...response.results])
        setEstablishmentFetched(true);
    }
    function toggleChecked(adaptationId: number) {
        checked.has(adaptationId) ? checked.delete(adaptationId) : checked.add(adaptationId);
        console.log(searchInput)
        if (activeTab == 0)
            getEstablishmentData(`${URL_API}${establishmentUrl}?adaptations=${Array.from(checked).join(",")}&search=${searchInput}`);
        else
            getMapData(`${URL_API}${mapUrl}${lon},${lat},${radius}/?adaptations=${Array.from(checked).join(",")}&search=${searchInput}`)
        establishmentData.length = 0;
    }
    function getMoreData() {
        getEstablishmentData(lastResponse.next);
    }
    function getAdaptations() {
        fetch(URL_API + userURL, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            }
        }).then((response) => response.json())
            .then((data) => { setChecked(new Set(data.adaptations.adaptations)); setAdaptationsFetched(true); });
    }
    function showEstablishmentData() {
        if(!adaptationsFetched)
            getAdaptations();
        if (establishmentData.length == 0) {
            if (!establishmentFetched && adaptationsFetched) getEstablishmentData(`${URL_API}${establishmentUrl}?adaptations=${Array.from(checked).join(",")}&search=${searchInput}`);
            return loading;
        }

        const establishments: any = [];

        establishmentData.forEach((establishment: any) => establishments.push(
            <Establishment id={establishment.id} name={establishment.name} address={establishment.address} website={establishment.website} adaptations={establishment.adaptations} images={establishment.images} location={establishment.location} stars={establishment.stars} />
        ));
        return (
            <>
                {establishments}
                <LoadMore loadMore={!(lastResponse && lastResponse.next)} getMoreData={getMoreData} />
            </>
        );

    }
    function toggleShowAdaptation() {
        setShowAdaptations(!showAdaptations);
    }
    function setSearchInput(event: any){
        if (activeTab == 0)
            getEstablishmentData(`${URL_API}${establishmentUrl}?adaptations=${Array.from(checked).join(",")}&search=${event.target.value}`);
        else
            getMapData(`${URL_API}${mapUrl}${lon},${lat},${radius}/?adaptations=${Array.from(checked).join(",")}&search=${event.target.value}`)
        _setSearchInput(event.target.value);
        establishmentData.length = 0;
    }
    return (
        <>
            <SearchBar toggled={false} toggleMenu={toggleShowAdaptation} onChange={setSearchInput}/>
            {(showAdaptations && adaptationsFetched) && <AdaptationMenu checked={checked} toggleChecked={toggleChecked} />}
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTad}>
                <Tab.List className="m-4 flex z-50 relative">
                    <Tab className="py-1 bg-bg border border-r-0 rounded-l-xl border-solid border-border text-center w-1/2 ui-selected:bg-selected ui-focus-visible:bg-white">Lista</Tab>
                    <Tab className="py-1 bg-bg border rounded-r-xl border-solid border-border text-center w-1/2 ui-selected:bg-selected">Mapa</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>{showEstablishmentData()}</Tab.Panel>
                    <Tab.Panel>
                        {showMap()}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            <Footer className={activeTab == 0 ? "mt-2" : ""} />
        </>
    );
}