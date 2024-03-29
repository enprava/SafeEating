import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function SearchBar() {
    return (
            <div className="relative mx-2">
                <input type="text" className="w-full pt-1 px-8 h-9 border rounded-xl border-solid border-border text-center align-bottom" placeholder="Buscar">
                </input>
                <MagnifyingGlassIcon className="h-6 absolute top-1 pt-1 left-1" />
                <ChevronDownIcon className="h-6 absolute top-1 pt-1 right-1" />
            </div>
    );
}

export default SearchBar;