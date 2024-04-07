
interface args {
    fistName: string,
    lastName: string,
    img: string,
    email: string
}

function Photo({ fistName, lastName, img, email }: args) {
    return (
        <div className="px-2 bg-white border rounded-xl border-solid border-border flex flex-col justify-center items-center m-2">
            <div><img src={img} alt={fistName}  className="h-64 rounded-full my-2"/></div>
            <div><p className="text-center text-xl truncate font-semibold">{fistName} {lastName}</p></div>
            <p>{email}</p>
        </div>
    );
}

export default Photo;