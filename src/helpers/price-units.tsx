import { SvgIcon } from "@material-ui/core";
import BusdImg from "../assets/tokens/BUSD.svg";
import { IAllBondData } from "../hooks/bonds";
import { busd } from "../helpers/bond";

export const priceUnits = (bond: IAllBondData) => {
    if (bond.name === busd.name) return <img src={BusdImg} style={{ width: 15, height: 15 }} />;

    return "$";
};
