import CreateRating from "@/components/ratings/create";
import Rating from "@/components/ratings/rating";

interface args {
    data: any,
    createRating?: boolean,
    userId?: string,
    token?: string,
    establishmentId?: string,
}

function RatingController({ data, createRating = false, userId = "", token = "", establishmentId="" }: args) {
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
    return (
        <>
            <p className="m-4 mb-2 text-2xl font-medium" >Valoraciones</p>
            {createRating && <CreateRating userId={userId} token={token} establishmentId={establishmentId}/>}
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