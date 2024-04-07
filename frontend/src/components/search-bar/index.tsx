import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import CustomInput from "@/components/input";
function SearchBar() {
    return (
            <div className="relative mx-2 ">
                <CustomInput placeHolder="Buscar" className="px- w-full"/>
                <MagnifyingGlassIcon className="h-6 absolute top-1 pt-1 left-1" />
                <ChevronDownIcon className="h-6 absolute top-1 pt-1 right-1" />
            </div>
    );
}

export default SearchBar;