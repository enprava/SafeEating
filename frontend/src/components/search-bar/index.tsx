import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import CustomInput from "@/components/input";
import { useState } from "react";

interface args {
    toggleMenu: () => void,
    toggled?: boolean,
    onChange?: any,
}

function SearchBar({ toggleMenu, toggled = true, onChange = () => {} }: args) {
    const [isToggled, setIsToggled]: any = useState(toggled)
    function handleClick() {
        if (toggleMenu)
            toggleMenu()
        setIsToggled(!isToggled);
    }
    return (
        <div className="relative m-4 ">
            <CustomInput placeHolder="Buscar" className="px-8 w-full" onChange={onChange}/>
            <MagnifyingGlassIcon className="h-6 absolute top-1 pt-1 left-1" />
            {isToggled ?
                <ChevronDownIcon className="h-6 absolute top-1 pt-1 right-1" onClick={handleClick} /> :
                <ChevronUpIcon className="h-6 absolute top-1 pt-1 right-1" onClick={handleClick} />}
        </div>
    );
}

export default SearchBar;