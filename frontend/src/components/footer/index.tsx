import { MagnifyingGlassIcon, HeartIcon, UserIcon, HomeIcon } from "@heroicons/react/24/outline";

interface args {
    className?: string
};

function Footer({ className = ""}: args) {
    return (
        <div className={"sticky bottom-0 w-full bg-white flex justify-between border-t border-solid border-border " + className}>
            <a href="/"><HomeIcon className="h-8 ml-2 mb-px" /></a>
            <a href="/search"><MagnifyingGlassIcon className="h-8 mb-px" /></a>
            <HeartIcon className="h-8" />
            <a href="/settings"><UserIcon className="h-8 mr-2" /></a>
        </div>
    );
}

export default Footer;