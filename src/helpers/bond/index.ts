import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import BusdIcon from "../../assets/tokens/BUSD.svg";
import BnbIcon from "../../assets/tokens/BNB.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/TIME-AVAX.svg";

import { StableBondContract, LpBondContract, WBNBBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const busd = new StableBond({
    name: "busd",
    displayName: "BUSD",
    bondToken: "BUSD",
    bondIconSvg: BusdIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x0b49c90BEf4912211F27e3Bab75d9036D71DB93C",
            reserveAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        },
    },
});

export const wbnb = new CustomBond({
    name: "wbnb",
    displayName: "wBNB",
    bondToken: "BNB",
    bondIconSvg: BnbIcon,
    bondContractABI: WBNBBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.BSC_MAINNET]: {
            bondAddress: "0xeE710F9CC7683f844a7dBc7416deE41010aAFc41",
            reserveAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        },
    },
});

export const busdScan = new LPBond({
    name: "busd_scan_lp",
    displayName: "SCAN-BUSD LP",
    bondToken: "BUSD",
    bondIconSvg: MimTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.BSC_MAINNET]: {
            bondAddress: "0xbD4e58e19c96CC9889375DC5A9Cc0309E430627D",
            reserveAddress: "0xb418adb6548d7730915d0c6e54faf50967fb84cd",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/0xa367b40048d809b14405c96b9181cad1ecbdc96f/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export const bnbScan = new CustomLPBond({
    name: "bnb_scan_lp",
    displayName: "SCAN-BNB LP",
    bondToken: "BNB",
    bondIconSvg: AvaxTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export default [busd, wbnb, busdScan];
