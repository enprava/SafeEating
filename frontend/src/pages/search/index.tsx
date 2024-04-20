import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import URL_API from "@/utils/url-api";
import Loading from "@/components/loading";
import Establishment from "@/components/establishment";
import MapComponent from "@/components/maps/establishment";

export default function () {
    const establishmentUrl: string = "/establishment/";
    const mapUrl: string = "/establishment/mapa/";
    const [establishmentData, setEstablishmentData]: any | {} = useState(null);
    const [mapData, setMapData]: any | {} = useState(null)
    const [activeTab, setActiveTad]: any | {} = useState(0);
    // const [location, setLocation] = useState(sessionStorage.getItem('location'))
    // const [radius, setRadius] = useState(2000);
    const location = sessionStorage.getItem("location");
    const radius = 2000;

    function getMapData() {
        const lon: any = location?.split(',')[0] ? location?.split(',')[0]: "-5.987375667032342";
        const lat: any = location?.split(',')[1] ? location?.split(',')[1]: "37.3930443446";
        fetch(`${URL_API}${mapUrl}${lon},${lat},${radius}/`)
            .then((response) => response.json())
            .then((data) => setMapData(data));

    }

    function getEstablishmentData() {
        fetch(URL_API + establishmentUrl)
            .then((response) => response.json())
            .then(
                (data) => setEstablishmentData(data)
            );
    };

    function showMap() {
        if (!mapData) {
            getMapData();
            return <Loading className="m-2 justify-center items-center flex" style={{height: window.innerHeight -129}}/>
        }
        return <MapComponent data={mapData} />
    }

    function showEstablishmentData() {
        if (!establishmentData) {
            getEstablishmentData();
            return <Loading className="m-2 justify-center items-center flex" />;
        }

        const establishments: any = [];

        establishmentData.results.forEach((establishment: any) => establishments.push(
            <Establishment name={establishment.name} address={establishment.address} website={establishment.website} adaptations={establishment.adaptations} images={establishment.images} location={establishment.location} stars={establishment.stars} />
        ));
        return establishments;
    }
    return (
        <div className="mt-2">
            <SearchBar />
            <Tab.Group defaultIndex={0} selectedIndex={activeTab} onChange={setActiveTad}>
                <Tab.List className="mt-2 flex mx-2">
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
        </div>
    );
}