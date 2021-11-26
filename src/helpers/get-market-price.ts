import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { busdScan } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const busdScanAddress = busdScan.getAddressForReserve(networkID);
    const pairContract = new ethers.Contract(busdScanAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();

    const marketPrice = reserves[1] / reserves[0]; // TODO: order matters here!!!!!
    return marketPrice;
}
