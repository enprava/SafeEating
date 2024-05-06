import CustomInput from "@/components/input";
import { useState } from "react";
import URL_API from "@/utils/url-api";

export default function Register() {
    const [email, setEmail_] = useState(null);
    const [fistName, setFirstName_] = useState(null);
    const [lastName, setLastName_] = useState(null);
    const [password, setPassword_] = useState(null);

    function setEmail(event: any) {
        setEmail_(event.target.value);
    }
    function setPassword(event: any) {
        setPassword_(event.target.value);
    }
    function setFirstName(event: any) {
        setFirstName_(event.target.value);
    }
    function setLastName(event: any) {
        setLastName_(event.target.value);
    }
    localStorage.clear();
    sessionStorage.clear();

    async function onSubmit(e: any) {
        e.preventDefault();
        const response = await fetch(URL_API + "/user/register/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": email, "email": email, "first_name": fistName, "last_name": lastName, "password": password })
        });
        if (!response.ok) {
            console.log(response)
            return;
        }
        window.location.href = "/login";
    }
    return (
        <>
            <div className="relative top-20 w-full flex justify-center">
                <p className="text-3xl">Safe Eating</p>

            </div>
            <div className="h-dvh flex justify-center items-center flex-col">
                <div className="w-3/4 bg-white border rounded-xl border-solid border-border">
                    <form onSubmit={onSubmit} className="flex flex-col py-4">
                        <div className="self-center m-3"><CustomInput placeHolder="Email" onChange={setEmail} /></div>
                        <div className="self-center m-3"><CustomInput placeHolder="Nombre" onChange={setFirstName} /></div>
                        <div className="self-center m-3"><CustomInput placeHolder="Apellidos" onChange={setLastName} /></div>
                        <div className="self-center m-3"><CustomInput placeHolder="Contraseña" onChange={setPassword} type="password" /></div>
                        <div className="self-center mt-6">
                            <button type="submit" className="border rounded-xl border-solid border-border bg-bg p-1">Registrarse</button>
                        </div>
                    </form>
                </div>
                <a href="/login" className="my-2">Iniciar Sesión</a>
            </div>
        </>
    );
}