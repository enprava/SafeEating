import Login from "@/components/login";

export default function () {
    return (
        <>
            <div className="absolute top-20 w-full flex justify-center">
                <p className="text-3xl">Safe Eating</p>

            </div>
            <div className="h-dvh flex justify-center items-center">
                <Login />
            </div>
        </>
    );
}