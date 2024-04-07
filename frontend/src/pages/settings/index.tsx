import URL_API from "@/utils/url-api";
import { useState } from "react";
import Photo from "@/components/photo";
import MEDIA_URL from "@/utils/media-url";
import AdaptationMenu from "@/components/adaptation-menu";

export default function () {
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem("token");
    const userURL = `/user/${userId}`;
    const [userData, setUserData]: any| {} = useState(null);

    function fetchData(){
        fetch(URL_API+userURL,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `token ${token}` 
            }
        }).then((response) => response.json())
        .then((data) => setUserData(data));
    }
    function showData(){
        if (!userData){
            fetchData();
        return <>Loading</>;
    }
        return (
        <>
            <Photo fistName={userData.first_name} lastName={userData.last_name} img={MEDIA_URL + userData.pic.url} email={userData.email}/>
            <p className="ml-2 mt-4 text-2xl font-medium">Alérgenos</p>
            <AdaptationMenu />
            </>
        );
    }
    return (
    <>
        <div>
            {showData()}
        </div>
    </>
    );
}