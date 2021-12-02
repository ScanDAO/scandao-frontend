import { useState } from "react";
import { getAddresses, TOKEN_DECIMALS, DEFAULD_NETWORK } from "../../../constants";
import { useSelector } from "react-redux";
import { Link, Fade, Popper } from "@material-ui/core";
import "./scan-menu.scss";
import { IReduxState } from "../../../store/slices/state.interface";
import { getTokenUrl } from "../../../helpers";

const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
    const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: TOKEN_DECIMALS,
                        image: tokenImage,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

function ScanMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isEthereumAPIAvailable = window.ethereum;

    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || DEFAULD_NETWORK;
    });

    const addresses = getAddresses(networkID);

    const DAL_ADDRESS = addresses.DAL_ADDRESS;
    const SCAN_ADDRESS = addresses.SCAN_ADDRESS;

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="scan-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
            <div className="scan-menu-btn">
                <p>SCAN</p>
            </div>

            <Popper className="scan-menu-popper" open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <div className="tooltip">
                            <div className="add-tokens" style={{ marginTop: 1 }}>
                                <div className="divider" />
                                <p className="add-tokens-title">BUY SCAN</p>
                                <div className="divider" />
                            </div>
                            <Link
                                className="tooltip-item"
                                href={`https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=${SCAN_ADDRESS}`}
                                target="_blank"
                            >
                                <p>SCAN/BUSD</p>
                            </Link>

                            <Link
                                className="tooltip-item"
                                href={`https://pancakeswap.finance/swap?inputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&outputCurrency=${SCAN_ADDRESS}`}
                                target="_blank"
                            >
                                <p>SCAN/BNB</p>
                            </Link>

                            {isEthereumAPIAvailable && (
                                <div className="add-tokens">
                                    <div className="divider" />
                                    <p className="add-tokens-title">ADD TOKEN TO WALLET</p>
                                    <div className="divider" />
                                    <div className="tooltip-item" onClick={addTokenToWallet("SCAN", SCAN_ADDRESS)}>
                                        <p>SCAN</p>
                                    </div>
                                    <div className="tooltip-item" onClick={addTokenToWallet("DAL", DAL_ADDRESS)}>
                                        <p>DAL</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}

export default ScanMenu;
