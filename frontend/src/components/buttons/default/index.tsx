import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface args {
    href: string,
    text: string,
    className?: string,
    isOut?: boolean
}
function DefaultButton({ href, text, className = "", isOut=false }: args) {
    return (
        <>
            <a className={"w-full bg-white border rounded-xl border-solid border-border p-1 flex justify-between " + className} target={isOut? "_blanl": ""} href={href}>
                <p className="mx-2 text-sm truncate w-10/12">{text}</p>
                <ArrowRightIcon className="h-5 w-5 mx-2" />
            </a>
        </>
    );
}

export default DefaultButton;