import { IToken } from "../helpers/tokens";
import { ethers, utils } from "ethers";
import { IAllBondData } from "../hooks/bonds";
import { getAddresses, Networks } from "../constants";
import axios from "axios";
import { TraderZapinContract } from "../abi";
import { BigNumber } from "ethers";

export const zapinLpData = async (bond: IAllBondData, token: IToken, tokenAmmount: string, network: Networks, slippage: number) => {
    const addresses = getAddresses(network);

    const sellToken = token.isBnb ? ethers.constants.AddressZero : token.address;
    const buyToken = bond.getAddressForReserve(network);

    const url = `https://api.zapper.fi/v1/zap-in/pool/traderjoe/transaction?gasPrice=1000000000000&ownerAddress=${addresses.ZAPIN_ADDRESS}&sellAmount=${tokenAmmount}&sellTokenAddress=${sellToken}&poolAddress=${buyToken}&slippagePercentage=${slippage}&network=avalanche&api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241&skipGasEstimate=true`;

    // const { data } = await axios.get(url);

    let data = JSON.parse(
        `{"to":"0x8308a1A404dB3cB3075618B1651671bC4E15F9d5","from":"0x9ABE63C5A2fBcd54c8bAec3553d326356a530cae","data":"0xdb254e500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f64e1c5b6e17031f5504481ac8145f4c3eab49170000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000186bc55f08d000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c700000000000000000000000000000000000000000000000000000000000001000000000000000000000000003ce37278de6388532c3949ce4e886f365b14fb5600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000048d0e30db0869584cd000000000000000000000000f4e386b070a18419b5d3af56699f8a438dd18e890000000000000000000000000000000000000000000000bab64de867619a4f97000000000000000000000000000000000000000000000000","value":"1000000000000000000","sellTokenAddress":"0x0000000000000000000000000000000000000000","sellTokenAmount":"1000000000000000000","buyTokenAddress":"0xf64e1c5b6e17031f5504481ac8145f4c3eab4917","minTokens":"1678196994189","gasPrice":"1000000000000","gas":"0"}`,
    );

    const zapinInterface = new utils.Interface(TraderZapinContract);

    const { _swapTarget, swapData } = zapinInterface.decodeFunctionData("ZapIn", data.data);

    return [_swapTarget, swapData, data.minTokens];
};

export const zapinData = async (bond: IAllBondData, token: IToken, tokenAmmount: string, network: Networks, slippage: number) => {
    // const sellToken = token.isBnb ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" : token.address;
    const sellToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    // const buyToken = bond.getAddressForReserve(network);
    const buyToken = "0x130966628846BFd36ff31a822705796e8cb8C18D";
    // TODO: avax address
    const url = `https://avalanche.api.0x.org/swap/v1/quote?buyToken=${buyToken}&includePriceComparisons=true&intentOnFilling=true&sellAmount=${tokenAmmount}&sellToken=${sellToken}&skipValidation=true&slippagePercentage=${slippage}`;
    const { data } = await axios.get(url);

    const dataBuyAmount = BigNumber.from(data.buyAmount);
    const buyAmount = dataBuyAmount.sub(dataBuyAmount.mul(slippage * 1000).div(1000));

    return [data.to, data.data, buyAmount.toString()];
};
