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

export default function () {
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem("token");
    const userURL = `/user/${userId}/`;
    const ratingsURL = `/rating/user/${userId}/`;
    const [userData, setUserData]: any = useState(null);
    const [lastResponse, setLastResponse]: any = useState(null)
    const [ratings, _setRatings]: any = useState([])
    const loading = <Loading className="justify-center items-center flex" style={{height: (window.innerHeight -153)/2}}/>

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

    function getMoreData() {
        fetchRatings(lastResponse.next)
    }
    function showRatings() {
        const url = URL_API + ratingsURL;
        if (ratings.length == 0) {
            fetchRatings(url)
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
    function showUserData() {
        if (!userData) {
            fetchUserData();
            return loading;
        }
        return (
            <>
                <Photo fistName={userData.first_name} lastName={userData.last_name} img={userData.pic.url ? MEDIA_URL + userData.pic.url : null} email={userData.email} />
                <p className="m-4 text-2xl font-medium">Alérgenos</p>
                <AdaptationMenu />
            </>
        );
    }
    return (
        <>
            {showUserData()}
            {showRatings()}
            <LoadMore loadMore={!(lastResponse && lastResponse.next)} getMoreData={getMoreData} />
            <p className="m-4 text-2xl font-medium">Más opciones</p>
            <div className="flex justify-center m-4">
                <DefaultButton href="#" text="Cambiar contraseña" />
            </div>
            <Footer />
        </>
    );
}