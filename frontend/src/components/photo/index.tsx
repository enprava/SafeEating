import { CameraIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import URL_API from "@/utils/url-api";


interface args {
    fistName: string,
    lastName: string,
    img: string,
    email: string
}

function Photo({ fistName, lastName, img, email }: args) {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    async function onImageChange(event: any) {
        if (!(event.target.files && event.target.files[0])) {
            return;
        }
        const image = event.target.files[0];
        // console.log(image);
        const formData = new FormData()
        formData.append("image", image);
        await fetch(URL_API + `/user/${user}/upload-pic`, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `token ${token}`
            }
        });
        window.location.href = '/settings'
    }  

    return (
        <div className="px-2 bg-white border rounded-xl border-solid border-border flex flex-col justify-center items-center m-2">
            <div className="relative">
                {
                    img ?
                        <img src={img} alt={fistName} className="h-64 rounded-full my-2" />:
                        <UserCircleIcon className="h-64 rounded-full my-2 text-border" /> 
                }
                <CameraIcon className="h-10 w-10 rounded-full bg-bg border p-1 border-solid border-border absolute right-4 bottom-4" />
                <input className="h-10 w-10 rounded-full bg-bg border p-1 border-solid border-border absolute right-4 bottom-4 opacity-0" type="file" accept="image/png, image/jpeg" onChange={onImageChange} />
            </div>
            <div><p className="text-center text-xl truncate font-semibold">{fistName} {lastName}</p></div>
            <p>{email}</p>
        </div>
    );
}

export default Photo;