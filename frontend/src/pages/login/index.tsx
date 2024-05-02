import { useState } from "react";
import URL_API from "@/utils/url-api";
import CustomInput from "@/components/input";

export default function () {
    const [email, setEmail_] = useState(null);
    const [password, setPassword_] = useState(null);

    function setEmail(event: any) {
        setEmail_(event.target.value);
    };
    function setPassword(event: any) {
        setPassword_(event.target.value);
    }
    async function onSubmit(e: any) {
        e.preventDefault();
        const response = await fetch(URL_API + "/user/login/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: email, password: password })
        });

        if (!response.ok) {
            return;
        }
        const json = await response.json();
        sessionStorage.setItem("user", json.user);
        sessionStorage.setItem("token", json.token);
        localStorage.setItem("user", json.user)
        localStorage.setItem("token", json.token)
        window.location.href = "/";
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
                        <div className="self-center m-3"><CustomInput placeHolder="Contraseña" onChange={setPassword} type="password" /></div>
                        <div className="self-center mt-6">
                            <button type="submit" className="border rounded-xl border-solid border-border bg-bg p-1">Iniciar sesión</button>
                        </div>
                    </form>
                </div>
                <a href="/register" className="my-2">Registrarse</a>
            </div>
        </>
    );
}