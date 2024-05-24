import { useState } from "react";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/outline";
import AdaptationMenu from "@/components/adaptation-menu";
import URL_API from "@/utils/url-api";

interface args {
    userId: string,
    token: string,
    establishmentId: string
}
function CreateRating({ userId, token, establishmentId }: args) {
    const [stars, setStars] = useState(2);
    const [ratingBody, setRatingBody] = useState("");
    const checked = new Set<number>();
    const [imageForm, setImageForm]: any = useState(null);

    function showStars() {
        const result: any[] = [];
        let tag;
        const className = "h-7 text-star"
        for (let i = 0; i < 5; i++) {
            console.log('hola')
            tag = stars >= i ? <StarIconSolid className={className} onClick={() => setStars(i)} /> : <StarIconOutline className={className} onClick={() => setStars(i)} />;
            result.push(tag);
        }
        return (
            <div className="m-4 flex justify-center">
                {result}
            </div>
        );
    }

    async function postRating() {
        const body = {
            body: ratingBody,
            user: parseInt(userId),
            establishment: parseInt(establishmentId),
            stars: stars,
            adaptation: Array.from(checked),
        }
        let ratingId: any;
        await fetch(URL_API + "/rating/create/", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json",
            }
        }).then((response) => response.json())
            .then((data) => ratingId = data.id);
        if (ratingId)
            await fetch(URL_API + `/rating/upload-image/${ratingId}/`, {
                method: 'POST',
                body: imageForm,
                headers: {
                    "Authorization": `token ${token}`
                }
            });
        window.location.reload();
    }

    function toggleChecked(adaptationId: number) {
        checked.has(adaptationId) ? checked.delete(adaptationId) : checked.add(adaptationId);
    }

    function getImage(event: any) {
        if (!(event.target.files && event.target.files[0]))
            return;
        const image = event.target.files[0];
        const formData = new FormData()
        formData.append("image", image);
        setImageForm(formData);
    }

    return (
        <>
            <div className="m-4 border p-1 bg-semi-white border rounded-xl border-solid border-border">
                <p className="m-4 text-xl font-medium">Nueva valoración</p>
                {showStars()}
                <div className="m-4">
                    <textarea
                        className={"border p-1 w-full h-32 bg-white border rounded-xl border-solid border-border " + (ratingBody ? "" : "text-center pt-12")}
                        onChange={(event) => setRatingBody(event.target.value)}
                        placeholder="Escribe aquí tu valoración"
                        style={{ resize: "none" }}
                        maxLength={300}
                    />
                </div>
                <p className="m-4 text-xl text-h1-gray font-medium">Elige las adaptaciones de la valoración</p>
                <AdaptationMenu checked={checked} toggleChecked={toggleChecked} />
                <div className="flex justify-start relative">
                    <p className="mx-4 mt-2 text-xl text-h1-gray font-medium">Adjunta imágenes</p>
                    <CameraIcon className="h-10 w-10 absolute right-5  rounded-full bg-bg border p-1 border-solid border-border" />
                    <input className="h-10 w-10 absolute right-5 rounded-full opacity-0" type="file" accept="image/png, image/jpeg" onChange={getImage} />
                </div>
                <div className="flex m-4 justify-center">
                    <button className=" py-1 px-4 bg-button border rounded-xl border-solid border-border text-center" onClick={postRating}>Enviar valoración</button>
                </div>
            </div>
        </>
    );
}

export default CreateRating;