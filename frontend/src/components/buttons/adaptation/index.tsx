import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type args = {
    img: string,
    alt: string,
    className: string,
    isCheckedByDefault?: boolean,
    readonly: boolean,
    onClick?: (adaptationId: number, isChecked: boolean) => void,
    adaptationId: number,
    toggleChecked: (adatationId: number) => void,
}


function AdaptationButton({ img, alt, className, isCheckedByDefault = false, readonly, onClick, adaptationId, toggleChecked }: args) {
    const [isChecked, setIsChecked] = useState(isCheckedByDefault);

    function _toggleChecked() {
        if (!readonly) {
            setIsChecked(!isChecked);
            toggleChecked(adaptationId);
            if (onClick)
                onClick(adaptationId!, isChecked);
        }
    }

    return (
        <div className="relative" onClick={_toggleChecked}>
            <img src={img} className={className} alt={alt} />
            <CheckIcon className={`w-4 text-green absolute bottom-0 opacity-0 ${isChecked ? "opacity-100" : ""}`} style={{ right: -3 }} />
        </div>
    );

}

export default AdaptationButton;