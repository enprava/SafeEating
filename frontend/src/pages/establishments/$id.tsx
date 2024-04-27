import AdaptationMenu from "@/components/adaptation-menu";
import DefaultButton from "@/components/buttons/default";
import Footer from "@/components/footer";
import ShowImageSweeper from "@/components/galleries/show";
import Header from "@/components/header";
import LoadMore from "@/components/load-more";
import RatingController from "@/components/ratings/controller";
import URL_API from "@/utils/url-api";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const { id } = useParams();
    const [establishmentData, setEstablishmentData]: any = useState(null)
    const establishmentUrl = "/establishment/" + id?.toString();
    const token = sessionStorage.getItem("token");
    const [lastResponse, setLastResponse]: any = useState(null)
    const [ratings, _setRatings]: any = useState([])
    const ratingsURL = `/rating/establishment/${id?.toString()}/`;

    function getEstablishment() {
        if (!establishmentData)
            fetch(URL_API + establishmentUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => setEstablishmentData(data));
    }
    function setRatings(data: any) {
        _setRatings([...ratings, ...data.results]);
        setLastResponse(data);
    }
    function fetchRatings(url: string) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setRatings(data)
            });
    }
    function showRatings() {
        const url = URL_API + ratingsURL;
        if (ratings.length == 0) {
            fetchRatings(url)
            return <>Loading</>;
        }
        return <RatingController data={ratings} />

    }
    function getMoreData() {
        fetchRatings(lastResponse.next)
    }
    // href={`https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`}
    return (
        <>
            <Header title="" />
            {establishmentData ? <>
                <p className="m-2 text-2xl font-medium">{establishmentData.name}</p>
                <div className=" mx-2 flex flex-row h-40 relative overflow-hidden">
                    <ShowImageSweeper images={establishmentData.images} />
                </div>
                <div className="flex justify-center m-2 flex-col">
                    <DefaultButton href={`https://www.google.com/maps?q=${establishmentData.location.coordinates[1]},${establishmentData.location.coordinates[0]}`} text={establishmentData.address} className="border-b-0 rounded-b-none" isOut={true}/>
                    <DefaultButton href={"https://" + establishmentData.website} text="Sitio web" className="rounded-t-none" isOut={true}/>
                </div>
                <p className="m-2 text-2xl font-medium">Alérgenos</p>
                <AdaptationMenu checked={establishmentData.adaptations.map((adaption: any) => adaption.id)} readOnly={true} />
            </> : getEstablishment()}
            {showRatings()}
            <LoadMore getMoreData={getMoreData} loadMore={!(lastResponse && lastResponse.next)} />
            <Footer />
        </>
    );
}