import { useCallback } from "react";
import { useSelector } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";
import { trim } from ".";

export const getApy = () => {
    const stakingAPY = useSelector<IReduxState, number>(state => {
        return state.app.stakingAPY;
    });

    const trimmedStakingAPY = trim(stakingAPY * 100, 1);

    const formatNumber = useCallback((num: number) => new Intl.NumberFormat("en-US").format(num), []);

    const numberTrimmedStakingAPY = Number(trimmedStakingAPY);
    const apy = numberTrimmedStakingAPY < 9123744263767 ? `${formatNumber(numberTrimmedStakingAPY)}+%` : `${formatNumber(9123744263767)}+%`;

    return apy;
};
