import Map, { GeoJSONSource, MapRef, Marker, Popup } from 'react-map-gl/maplibre';
import Source from 'react-map-gl/dist/esm/components/source';
import Layer from 'react-map-gl/dist/esm/components/layer';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from "./layers";
import { useRef, useState } from 'react';
import Establishment, { establishmentArgs } from '@/components/establishment';

interface args {
    data: object,
    small: boolean,
    lat: number,
    lon: number,
}


function MapComponent({ data, small, lat, lon }: args) {

    const [selectedEstablishmentArgs, setSelectedEstablishmentArgs]: establishmentArgs | any = useState(null);
    const map = useRef<MapRef>(null);

    async function onLoad() {
        const image = await map.current?.loadImage("https://cdn4.iconfinder.com/data/icons/maps-and-location/128/Map__Location_large_dot_indicator_navigation-512.png");
        if (image)
            map.current?.addImage('custom-dot', image.data);

        map.current?.on('click', 'cluster', async (e) => {
            const features = map.current?.queryRenderedFeatures(e.point, { layers: ['cluster'] }) as any;
            const clusterId = features[0].properties.cluster_id;
            const source = map.current?.getSource('data') as GeoJSONSource
            const zoom = await source.getClusterExpansionZoom(clusterId);
            map.current?.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        });

        map.current?.on("click", "unclustered-point", (e) => {
            const feature = map.current?.queryRenderedFeatures(e.point, { layers: ["unclustered-point"] })[0] as any;
            setSelectedEstablishmentArgs({
                id: feature.id,
                name: feature.properties.name,
                address: feature.properties.address,
                website: feature.properties.website,
                adaptations: JSON.parse(feature.properties.adaptations),
                images: JSON.parse(feature.properties.images),
                location: feature.geometry,
                stars: feature.properties.stars,
                className: "absolute bottom-6"
            });
        });
    }

    function onClick() {
        setSelectedEstablishmentArgs(null);
    }

    function getMapHeight() {
        const height = small ? 319 : 157;
        return window.innerHeight - height;
    }
    return (
        <Map
            initialViewState={{
                longitude: lon,
                latitude: lat,
                zoom: 12,
            }}
            minZoom={11}
            onLoad={onLoad}
            onClick={onClick}
            style={{ height: getMapHeight() }}
            mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=V4dZUoisY0HjkpLsDDcS"
            ref={map}
        >
            <Source
                type="geojson" data={data}
                id='data'
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
                <Layer {...clusterLayer} id='cluster' />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} id="unclustered-point" />
            </Source>
            {selectedEstablishmentArgs &&
                <Establishment {...selectedEstablishmentArgs} />
            }
            <Marker latitude={lat} longitude={lon}>
            </Marker>
        </Map>
    );
}

export default MapComponent;