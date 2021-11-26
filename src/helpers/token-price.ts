import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,olympus,binance-usd&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["BNB"] = data["binancecoin"].usd;
    cache["BUSD"] = data["binance-usd"].usd;
    // TODO: Remove hardcode when data is available
    cache["SCAN"] = 1000;
    cache["OHM"] = data["olympus"].usd;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};
