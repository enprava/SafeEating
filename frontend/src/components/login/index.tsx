import CustomInput from "@/components/input";
import { createContext, useState } from "react";

function Login() {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    function onSubmit(e: any) {
        e.preventDefault();
        window.location.href = "/";
    }

    function setToken(token: string){
        localStorage.setItem("token", token);
        setToken_(token);
    }
    return (
            <div className="w-3/4 bg-white border rounded-xl border-solid border-border">
                <form onSubmit={onSubmit} className="flex flex-col py-4">
                    <div className="self-center my-1"><CustomInput placeHolder="Email" /></div>
                    <div className="self-center my-1"><CustomInput placeHolder="Contraseña" /></div>
                    <div className="self-center mt-6">
                        <button type="submit" className="border rounded-xl border-solid border-border bg-bg p-1"> Iniciar sesión</button>
                    </div>
                </form>
            </div>
    );
}

export default Login;