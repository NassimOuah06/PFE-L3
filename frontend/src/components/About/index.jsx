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
      <div id="about" className={style.about}>
        <div>
          <h1>About Us</h1>
        <p>
        Ce projet concerne la conception d'un site web dédié aux élections en ligne. Il utilise une approche innovante basée sur la technologie Blockchain pour garantir la sécurité et la transparence du processus électoral. L'interface conviviale du site est soigneusement conçue pour améliorer l'expérience de l'utilisateur, offrant un accès intuitif et des fonctionnalités interactives, notamment des profils détaillés des candidats. En utilisant la puissance de la Blockchain Ethereum, le site garantit l'enregistrement immuable de chaque vote, renforçant ainsi la fiabilité et la véracité du processus électoral.
        </p>
        <p>
            Cette approche innovante vise à transformer la participation citoyenne en offrant une plateforme accessible, sécurisée et transparente. Des fonctionnalités de tracking en temps réel permettent aux utilisateurs de suivre l'évolution du processus électoral en toute transparence. En plaçant la blockchain au cœur du processus, le projet aspire à augmenter le niveau de confiance des citoyens dans les élections en ligne, renforçant ainsi les fondements démocratiques du processus électoral. L'innovation ne réside pas seulement dans la technologie utilisée, mais aussi dans la manière dont elle est intégrée pour renforcer l'engagement des citoyens et établir une nouvelle norme pour les élections en ligne.
        </p>

        </div>
      </div>
    );
  };

export default Home;
