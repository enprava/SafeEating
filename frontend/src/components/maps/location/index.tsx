import { useEffect, useState, useRef } from 'react';
import Map, { Marker, MapLayerMouseEvent, MapRef } from 'react-map-gl/maplibre';

interface args {
    lat: number,
    lon: number
}
function LocationComponent({ lat, lon }: args) {
    const [position, setPosition]: any = useState({});
    const map = useRef<MapRef>(null);

    function getMapHeight() {
        return window.innerHeight - 62;
    }
    useEffect(setUserPosition, [lat, lon]);
    function setUserPosition() {
        if (lat && lon) {
            setPosition({
                lat: lat,
                lon: lon
            })
            easeToMarker(lon, lat, 14);
        }
    }

    function easeToMarker(lon: number, lat: number, zoom: number | null = null) {
        map.current?.easeTo({ center: [lon, lat], zoom: zoom ? zoom : map.current?.getZoom(), duration: 1000 })

    }

    function onMapClick(event: MapLayerMouseEvent) {
        setPosition({
            lat: event.lngLat.lat,
            lon: event.lngLat.lng,
        });
        easeToMarker(event.lngLat.lng, event.lngLat.lat);
    }

    function redirect() {
        if (position.lon && position.lat) {
            sessionStorage.setItem("location", `${position.lon},${position.lat}`);
            window.location.href = "/";
        }
    }
    return (
        <>
            <Map
                initialViewState={{
                    longitude: -5,
                    latitude: 37,
                    zoom: 4
                }}
                style={{ height: getMapHeight() }}
                mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=V4dZUoisY0HjkpLsDDcS"
                onClick={onMapClick}
                ref={map}
            >
                {position.lat && <Marker latitude={position.lat} longitude={position.lon} />}
                <div className='absolute top-4 w-full flex justify-around'>
                    <button
                        className="border rounded-xl border-solid border-border p-2 top-4 left-4 bg-white truncate text-center"
                        style={{ width: "45%" }}
                        onClick={setUserPosition}>
                        Usar mi ubicación actual
                    </button>
                    <button
                        className="border rounded-xl border-solid border-border p-2 top-4 left-4 bg-white truncate text-center"
                        style={{ width: "45%" }}
                        onClick={redirect}>
                        Siguiente
                    </button>
                </div>
            </Map>
        </>
    );
}

export default LocationComponent;