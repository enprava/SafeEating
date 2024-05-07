import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import URL_API from "@/utils/url-api";
import Loading from "@/components/loading";
import Establishment from "@/components/establishment";
import MapComponent from "@/components/maps/establishment";
import LoadMore from "@/components/load-more";
import AdaptationMenu from "@/components/adaptation-menu";

export default function EstablishmentList() {
    const establishmentUrl: string = "/establishment/";
    const mapUrl: string = "/establishment/mapa/";
    const [establishmentData, setEstablishmentData]: any = useState([]);
    const [mapData, setMapData]: any = useState(null)
    const [activeTab, setActiveTad]: any = useState(0);
    const location = sessionStorage.getItem("location");
    const radius = 2000;
    const [lastResponse, _setLastResponse]: any = useState(null);
    const [establishmentFetched, setEstablishmentFetched] = useState(false);
    const loading = <Loading className="justify-center items-center flex" style={{ height: window.innerHeight - 161 }} />;
    const [showAdaptations, setShowAdaptations]: any = useState(false);


    function getMapData() {
        const lon: any = location?.split(',')[0] ? location?.split(',')[0] : "-5.987375667032342";
        const lat: any = location?.split(',')[1] ? location?.split(',')[1] : "37.3930443446";
        fetch(`${URL_API}${mapUrl}${lon},${lat},${radius}/`)
            .then((response) => response.json())
            .then((data) => setMapData(data));

    }

    function getEstablishmentData(url: string) {
        fetch(url)
            .then((response) => response.json())
            .then(
                (data) => setLastResponse(data)
            );
    }

    function showMap() {
        if (!mapData) {
            getMapData();
            return loading
        }
        return <MapComponent data={mapData} small={showAdaptations}/>
    }
    function setLastResponse(response: any) {
        _setLastResponse(response);
        setEstablishmentData([...establishmentData, ...response.results])
        setEstablishmentFetched(true);
    }

    function getMoreData() {
        getEstablishmentData(lastResponse.next);
    }
    function showEstablishmentData() {
        if (establishmentData.length == 0) {
            if (!establishmentFetched) getEstablishmentData(URL_API + establishmentUrl);
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
    return (
        <>
            <SearchBar toggled={false} toggleMenu={toggleShowAdaptation} />
            {showAdaptations && <AdaptationMenu />}
            <Tab.Group defaultIndex={0} selectedIndex={activeTab} onChange={setActiveTad}>
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