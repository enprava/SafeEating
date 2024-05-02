import AdaptationButton from "@/components/buttons/adaptation";
import URL_API from "@/utils/url-api";
import Loading from "@/components/loading";
import { useState } from "react";

interface args {
    checked?: number[],
    readOnly?: boolean,
};
function AdaptationMenu({ checked = [], readOnly = false }: args) {
    const [data, setData]: any | {} = useState(null)

    function fetchData() {
        fetch(URL_API + "/adaptation")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }

    function showData() {
        if (!data) {
            fetchData();
            return <Loading className="col-span-4 m-12 justify-center items-center flex" />
        }

        const veggies = [];
        const intolerances = [];
        for (const adapt of data) {
            const isChecked = Boolean(checked.find((adaptionId: number) => adaptionId == adapt.id))
            if (adapt.name === "Vegano" || adapt.name === "Vegetariano") {
                veggies.push(<AdaptationButton img={adapt.url} alt={adapt.name} className="w-14" isCheckedByDefault={isChecked} readonly={readOnly}/>);
            } else {
                intolerances.push(<AdaptationButton img={adapt.url} alt={adapt.name} className="h-10 m-1" isCheckedByDefault={isChecked} readonly={readOnly}/>)
            }
        }

        return (
            <>
                <div className="grid grid-cols-5 col-span-3">
                    {intolerances}
                </div>
                <div className="grid grid-rows-2 justify-center items-center">
                    {veggies}
                </div>
            </>
        );
    }

    return (
        <div className="m-4 rounded-xl bg-white border rounded-xl border-solid border-border grid grid-cols-4">
            {showData()}
        </div>
    );
}

export default AdaptationMenu;