import Footer from "@/components/footer";
import LocationComponent from "@/components/maps/location";
import { useEffect, useState } from "react";

export default function () {
    const [location, setLocation]: any = useState({});
    function componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                console.log(position);
            });
        }
    }
    useEffect(componentDidMount, []);
    return (
        <>
            <div className="flex justify-center items-center">
                <p className="font-bold text-xl"> Selecciona tu ubicación</p>
            </div>
            <LocationComponent lat={location.lat} lon={location.lon} />
            <Footer/>
        </>
    );
}