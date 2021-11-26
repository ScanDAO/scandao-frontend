import ScanImg from "../assets/tokens/TIME.svg";
import DalImg from "../assets/tokens/MEMO.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "scan") {
        return toUrl(ScanImg);
    }

    if (name === "dal") {
        return toUrl(DalImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
