import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import RocketManImg from "../../../../assets/icons/rocketman.png";

function Main() {
    return (
        <div className="landing-main">
            <div className="landing-main-img-wrap">
                <img src={RocketManImg} alt="" />
            </div>
            <div className="landing-main-btns-wrap">
                <Link href={`http://app.${process.env.REACT_APP_URL}`} target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Enter App</p>
                    </div>
                </Link>
                <Link href="https://scandao.gitbook.io/scandao/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Documentation</p>
                    </div>
                </Link>
            </div>
            <div className="landing-main-title-wrap">
                <p>The most scandalous DAO</p>
                <p>ScanDAO</p>
            </div>
            <div className="landing-main-help-text-wrap">
                <p>Grow your wealth - stake and earn compunding interest</p>
            </div>
        </div>
    );
}

export default Main;
