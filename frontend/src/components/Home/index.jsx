import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";

import menWithLaptop from "../../images/men-with-laptop.png";

const Home = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("token");

    const handleLogin = () => {
        navigate("/login");
    };

    const handleGuide = () => {
        navigate("/guide");
    };

    return (
        <div className={style.Home}>
            <HeroSection user={user} handleLogin={handleLogin} handleGuide={handleGuide} />
        </div>
    );
};

const HeroSection = ({ user, handleLogin, handleGuide }) => {
    return (
        <header className={style.hero_section}>
            <div className={style.hero_content}>
                <h1>Welcome to VoteVerse</h1>
                <p>
                    Your digital democracy hub, where every vote shapes the future
                    securely on the blockchain.
                </p>
                <button className={style.button} onClick={user ? handleGuide : handleLogin}>
                    Entrer
                </button>
            </div>
            <div className={style.hero_image}>
                <img src={menWithLaptop} alt="Man with laptop" />
            </div>
        </header>
    );
};

export default Home;
