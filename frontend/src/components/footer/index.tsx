import { MagnifyingGlassIcon, UserIcon, HomeIcon } from "@heroicons/react/24/outline";

interface args {
    className?: string
};

function Footer({ className = ""}: args) {
    return (
        <div className={"sticky bottom-0 w-full bg-white flex justify-between border-t border-solid border-border pt-px" + className}>
            <a href="/"><HomeIcon className="h-9 ml-4 mb-px" /></a>
            <a href="/establishments"><MagnifyingGlassIcon className="h-9 mb-px" /></a>
            <a href="/settings"><UserIcon className="h-9 mr-4" /></a>
        </div>
    );
}

export default Footer;