import CreateRating from "@/components/ratings/create";
import Rating from "@/components/ratings/rating";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface args {
    data: any,
    createRating?: boolean,
    userId?: string,
    token?: string,
    establishmentId?: string,
}

function RatingController({ data, createRating = false, userId = "", token = "", establishmentId = "" }: args) {
    const [newRating, setNewRating] = useState(false);

    function getVeggie(rating: any) {
        let result: any = null;
        for (const adaptation of rating.adaptations) {
            if (adaptation.name == "Vegano")
                return adaptation
            if (adaptation.name == "Vegetariano")
                result = adaptation;
        }
        return result;
    }
    function toggleNewRating() {
        setNewRating(!newRating);
    }
    function showIconDropdown() {
        if (!createRating)
            return;
        return (
            newRating ?
                <MinusIcon className="h-7 mx-3 p-px rounded-full bg-button border border-solid border-border" onClick={toggleNewRating} /> :
                <PlusIcon className="h-7 mx-3 p-px rounded-full bg-button border border-solid border-border" onClick={toggleNewRating} />
        )
    }
    return (
        <>
            <div className="m-4 flex">
                <p className="text-2xl font-medium" >Valoraciones</p>
                {showIconDropdown()}
            </div>
            {newRating && <CreateRating userId={userId} token={token} establishmentId={establishmentId} />}
            {data.map((rating: any) => (
                <Rating
                    userImg={rating.userData.pic.url}
                    firstName={rating.userData.first_name}
                    lastName={rating.userData.last_name}
                    intolerances={rating.adaptations.filter((adaptation: any) => (adaptation.name != "Vegano" || adaptation.name != "Vegetariano"))}
                    veggie={getVeggie(rating)}
                    stars={rating.stars}
                    body={rating.body}
                    ratingImgs={rating.images}
                />))}
        </>
    );
}

export default RatingController;