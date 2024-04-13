import Rating from "../rating";

interface args {
    data: any
}

function RatingController({ data }: args) {

    return (
        <>
            <p className="ml-3 mt-3 mb-2 text-2xl font-medium" >Valoraciones</p>
            {data.results.map((rating: any) => (
                <Rating
                    userImg={rating.userData.pic.url}
                    firstName={rating.userData.first_name}
                    lastName={rating.userData.last_name}
                    intolerances={[""]}
                    veggie={""}
                    stars={rating.stars}
                    body={rating.body}
                    ratingImgs={rating.images}
                />))}
        </>
    );
}

export default RatingController;