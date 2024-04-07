import CustomInput from "@/components/input";
import { useContext, useState } from "react";
import URL_API from "@/utils/url-api";

function Login() {
    const [email, setEmail_] = useState("");
    const [password, setPassword_] = useState("");

    function setEmail(event: any) {
        setEmail_(event.target.value);
    };

    function setPassword(event: any) {
        setPassword_(event.target.value);
    };

    async function onSubmit(e: any) {
        e.preventDefault();
        const response = await fetch(URL_API + "/user/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": email, "password": password })
        });
        const json = await response.json();
        sessionStorage.setItem("user", json.user);
        sessionStorage.setItem("token", json.token);
        localStorage.setItem("user", json.user)
        localStorage.setItem("token", json.token)
        window.location.href = "/";
    }

    return (
        <div className="w-3/4 bg-white border rounded-xl border-solid border-border">
            <form onSubmit={onSubmit} className="flex flex-col py-4">
                <div className="self-center my-1"><CustomInput placeHolder="Email" onChange={setEmail} /></div>
                <div className="self-center my-1"><CustomInput placeHolder="Contraseña" onChange={setPassword} /></div>
                <div className="self-center mt-6">
                    <button type="submit" className="border rounded-xl border-solid border-border bg-bg p-1">Iniciar sesión</button>
                </div>
            </form>
        </div>
    );
}

export default Login;