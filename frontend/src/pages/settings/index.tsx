import URL_API from "@/utils/url-api";
import { useState } from "react";
import Photo from "@/components/photo";
import MEDIA_URL from "@/utils/media-url";
import AdaptationMenu from "@/components/adaptation-menu";
import RatingController from "@/components/ratings/controller";
import Footer from "@/components/footer";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function () {
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem("token");
    const userURL = `/user/${userId}`;
    const ratingsURL = `/rating/user/${userId}`
    const [userData, setUserData]: any | {} = useState(null);
    const [ratings, setRatings]: any | {} = useState(null)


    function fetchRatings() {
        fetch(URL_API + ratingsURL)
            .then((response) => response.json())
            .then((data) => setRatings(data));
    }
    function showRatings() {
        if (!ratings) {
            fetchRatings()
            return <>Loading</>;
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
            return <>Loading</>;
        }
        return (
            <>
                <Photo fistName={userData.first_name} lastName={userData.last_name} img={userData.pic.url ? MEDIA_URL + userData.pic.url: null} email={userData.email} />
                <p className="ml-3 mt-4sud text-2xl font-medium">Alérgenos</p>
                <AdaptationMenu />
            </>
        );
    }
    return (
        <>
            {showUserData()}
            {showRatings()}
            <p className="ml-3 mt-4sud text-2xl font-medium">Seguridad</p>
            <div className="flex justify-center mx-2 my-2">
                <a className="w-full bg-white border rounded-xl border-solid border-border p-1 flex justify-between">
                    <p className="mx-2 text-sm">Cambiar contraseña</p>
                    <ArrowRightIcon className="h-5 mx-2"/>
                </a>
            </div>
            <Footer />
        </>
    );
}