import React from "react";
import style from "./styles.module.css"

const Home = () => {
    
    return (
        <div className={style.Home}>
            <HeroSection/>
        </div>
    );
};
  
const HeroSection = () => {
    return (
        <div className={style.hero_section}>
            <h1>Guide d'utilisation</h1>
            <div className={style.card}>
                <div className={style.num}>
                    1
                </div>
                <div className={style.desc}>
                    Assurez que vous pocediez la carte de vote.
                </div>
            </div>
            <div className={style.card}>
                <div className={style.num}>
                    2
                </div>
                <div className={style.desc}>
                    Si vous ne pocedez pas de compte VoteVers, creez en un en entrant les information de votre carte de vote.
                </div>
            </div>
            <div className={style.card}>
                <div className={style.num}>
                    3
                </div>
                <div className={style.desc}>
                    Authentifiez vous en entrant votre e-mail et mot de passe fournis lors de la creation du compte.
                </div>
            </div>
            <div className={style.card}>
                <div className={style.num}>
                    4
                </div>
                <div className={style.desc}>
                    Allez a la page vote pour soumetre fotre voix en choisisant le condidat que vous desiriez. 
                </div>
            </div>
            <div className={style.card}>
                <div className={style.num}>
                    5
                </div>
                <div className={style.desc}>
                    Vous pouvez consulter les statestique et les resultats actuel du vote dans la page des stats.
                </div>
            </div>
        </div>
    );
  };

export default Home;
