import LocationComponent from "@/components/maps/location";
import { useEffect, useState } from "react";

export default function Location() {
    const [location, setLocation]: any = useState({});
    function componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            });
        }
    }
    useEffect(componentDidMount, []);
    return (
        <>
            <div className="m-4 flex justify-center items-center">
                <p className="font-bold text-xl"> Selecciona tu ubicación</p>
            </div>
            <LocationComponent lat={location.lat} lon={location.lon} />
        </>
    );
}