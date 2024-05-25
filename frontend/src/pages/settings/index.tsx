import URL_API from "@/utils/url-api";
import { useState } from "react";
import Photo from "@/components/photo";
import MEDIA_URL from "@/utils/media-url";
import AdaptationMenu from "@/components/adaptation-menu";
import RatingController from "@/components/ratings/controller";
import Footer from "@/components/footer";
import LoadMore from "@/components/load-more";
import DefaultButton from "@/components/buttons/default";
import Loading from "@/components/loading";
import getCredentials from "@/utils/get-crendetials";

export default function Settings() {
    const [userId, token] = getCredentials();
    const userURL = `/user/${userId}/`;
    const ratingsURL = `/rating/user/${userId}/`;
    const adaptationURL = `/user/${userId}/update-adaptation/`
    const [userData, setUserData]: any = useState(null);
    const [lastResponse, setLastResponse]: any = useState(null)
    const [ratings, _setRatings]: any = useState([])
    const [ratingsFetched, setRatingsFetched] = useState(false);
    const loading = <Loading className="justify-center items-center flex" style={{ height: (window.innerHeight - 153) / 2 }} />

    function setRatings(data: any) {
        _setRatings([...ratings, ...data.results]);
        setLastResponse(data);
        setRatingsFetched(true)
    }
    function fetchRatings(url: string) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setRatings(data)
            });
    }

    function getMoreData() {
        fetchRatings(lastResponse.next)
    }
    function showRatings() {
        const url = URL_API + ratingsURL;
        if (ratings.length == 0) {
            if (!ratingsFetched) fetchRatings(url);
            return loading;
        }
        return <RatingController data={ratings} />

    }
    function fetchUserData() {
        fetch(URL_API + userURL, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            }
        }).then((response) => response.json())
            .then((data) => setUserData(data));
    }
    function onAdaptationClick(adaptationId: number, isChecked: boolean) {
        fetch(URL_API + adaptationURL, {
            method: isChecked ? "delete" : "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify({ adaptation: adaptationId })
        })
    }

    function showUserData() {
        if (!userData) {
            fetchUserData();
            return loading;
        }
        return (
            <>
                <Photo fistName={userData.first_name} lastName={userData.last_name} img={userData.pic.url ? MEDIA_URL + userData.pic.url : null} email={userData.email} />
                <p className="m-4 text-2xl font-medium">Alérgenos</p>
                <AdaptationMenu onClick={onAdaptationClick} checked={new Set(userData.adaptations.adaptations)} />
            </>
        );
    }
    return (
        <>
            {showUserData()}
            {showRatings()}
            <LoadMore loadMore={!(lastResponse && lastResponse.next)} getMoreData={getMoreData} />
            <p className="m-4 text-2xl font-medium">Más opciones</p>
            <div className="flex justify-center flex-col m-4">
                <DefaultButton href="/location" text="Cambiar ubicación" className="border-b-0 rounded-b-none" />
                <DefaultButton href="/login" text="Cerrar sesión" className="rounded-t-none" />
            </div>
            <Footer />
        </>
    );
}