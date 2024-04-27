import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function Header({ title }: { title: string }) {
    return (
        <div className="flex relative justify-center h-8">
            <a href="javascript:history.back()"><ArrowLeftIcon className="h-8 absolute top-0 left-0"/></a>
            <p className="text-xl font-medium leading-9">{title}</p>
        </div>
    );
}

export default Header;