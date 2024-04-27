import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type args = {
    img: string,
    alt: string,
    className: string,
    isCheckedByDefault?: boolean,
    readonly: boolean
}


function AdaptationButton({ img, alt, className, isCheckedByDefault = false, readonly }: args) {
    const [isChecked, setIsChecked] = useState(isCheckedByDefault);

    function toggleChecked() {
        if (!readonly)
            setIsChecked(!isChecked);
    }

    return (
        <div className="relative" onClick={toggleChecked}>
            <img src={img} className={className} alt={alt} />
            <CheckIcon className={`w-4 text-green absolute bottom-0 opacity-0 ${isChecked ? "opacity-100" : ""}`} style={{ right: -3 }} />
        </div>
    );

}

export default AdaptationButton;