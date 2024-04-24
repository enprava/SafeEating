import Rating from "../rating";

interface args {
    data: any
}

function RatingController({ data }: args) {
    function getVeggie(rating: any) {
        let result: any = null;
        console.log(rating)
        for (let adaptation of rating.adaptations) {
            if (adaptation.name == "Vegano")
                return adaptation
            if (adaptation.name == "Vegetariano")
                result = adaptation;
        }
        return result;
    }
    return (
        <>
            <p className="ml-3 mt-3 mb-2 text-2xl font-medium" >Valoraciones</p>
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