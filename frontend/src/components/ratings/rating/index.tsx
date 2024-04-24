import MEDIA_URL from "@/utils/media-url"
import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarIconOutline, NoSymbolIcon } from "@heroicons/react/24/outline"

interface args {
    userImg: string,
    firstName: string,
    lastName: string,
    intolerances: any,
    veggie: any,
    stars: number,
    body: string,
    ratingImgs: { id: number, url: string }[],
}

function Rating({ userImg, firstName, intolerances, veggie, lastName, stars, body, ratingImgs }: args) {
    function showStars() {
        if (stars === 0)
            return <StarIconOutline className="h-4 text-star" />
        const starsInt = Math.floor(stars)
        const result = [];
        for (let i = 0; i < starsInt; i++) {
            result.push(<StarIcon className="h-4 text-star" />)
        }
        if (!Number.isInteger(stars))
            result.push(
                <div className="relative">
                    <div className="w-2 overflow-hidden absolute"><StarIcon className="h-4 text-star " /></div>
                    <div><StarIconOutline className="h-4 text-star top-0 left-0" /></div>
                </div>
            )
        return result;
    }
    function showImages() {
        if (ratingImgs.length == 0)
            return <p className="mb-2 w-full text-center text-sm text-text-gray">No hay imágenes disponibles</p>;
        return (
            <div className="mx-2 my-2 flex justify-center">
                {ratingImgs.map((img) => (
                    (img.url ? <img src={MEDIA_URL + img.url} className="h-20 rounded-full" /> : <p className="mb-2 w-full text-center text-sm text-text-gray">No hay imágenes disponibles</p>)
                ))}
            </div>
        );
    }
    return (
        <div className="mx-2 my-2 bg-white border rounded-xl border-solid border-border">
            <div className="flex justify-start">
                <img src={MEDIA_URL + userImg} alt={firstName} className="h-8 mt-1 ml-1 rounded-full" />
                <p className="ml-2 font-medium pt-2.5 truncate">{firstName} {lastName}</p>
                <div className="mt-2 mx-2 grid grid-cols-7 gap-x-px">
                    {intolerances.map((intolerance: any) => (
                        <img src={MEDIA_URL + intolerance.url} alt={intolerance.name} className="h-4 rounded-full" />
                    ))}
                </div>
                <div className="flex grow justify-center">{veggie ? <img src={MEDIA_URL + veggie.url} alt="Veggie" className="h-8 mt-2 mx-2 rounded-full" /> : <NoSymbolIcon className="h-8 mt-2 mx-0" />}</div>
            </div>
            <div className="flex ml-2">
                {showStars()}
                <p className="text-sm ml-2">{stars}</p>
            </div>
            <div className="mx-2 mb-2">
                <p>{body}</p>
            </div>
            {showImages()}
        </div>
    );
}

export default Rating;