import { CheckIcon } from "@heroicons/react/24/solid";

/* Importing adaptations assets */
import gluten from "@/assets/intolances/gluten.png";
import crustaceos from "@/assets/intolances/crustaceo.png";
import huevos from "@/assets/intolances/huevos.png";
import pescado from "@/assets/intolances/pescado.png";
import cacahuetes from "@/assets/intolances/cacahuetes.png";
import soja from "@/assets/intolances/soja.png";
import lacteos from "@/assets/intolances/lacteos.png";
import frutosconcascara from "@/assets/intolances/frutosconcascara.png";
import apio from "@/assets/intolances/apio.png";
import mostaza from "@/assets/intolances/mostaza.png";
import sesamo from "@/assets/intolances/sesamo.png";
import sulfitos from "@/assets/intolances/sulfitos.png";
import altramuces from "@/assets/intolances/altramuces.png";
import moluscos from "@/assets/intolances/moluscos.png";
import vegan from "@/assets/adaptations/vegan.png";
import vegetarian from "@/assets/adaptations/vegetarian.png";

function AdaptationMenu() {
    const intolances: [string, string][] = [
        [gluten, "Gluten"],
        [crustaceos, "Crustáceos"],
        [huevos, "Huevos"],
        [pescado, "Pescado"],
        [cacahuetes, "Cacahuetes"],
        [soja, "Soja"],
        [lacteos, "Lácteos"],
        [frutosconcascara, "Frutos con cáscara"],
        [apio, "Apio"],
        [mostaza, "Mostaza"],
        [sesamo, "Sésamo"],
        [sulfitos, "Sulfitos"],
        [altramuces, "Altramuces"],
        [moluscos, "Moluscos"]
    ];

    return (
        <div className="mx-2 mt-3 rounded-xl bg-white border rounded-xl border-solid border-border grid grid-cols-4">
            <div className="grid grid-cols-5 col-span-3">
                {intolances.map((item) => (
                    <div className="relative">
                        <img src={item[0]} className="h-10 m-1" alt={item[1]} />
                        <CheckIcon className="w-4 text-green absolute bottom-0 opacity-0" style={{ right: -3 }} />
                    </div>
                ))}
            </div>
            <div className="grid grid-rows-2 justify-center items-center">
                <img src={vegan} className="w-14" alt="Vegano" />
                <img src={vegetarian} className="w-14" alt="Vegetariano" />
            </div>
        </div>
    );
}

export default AdaptationMenu;