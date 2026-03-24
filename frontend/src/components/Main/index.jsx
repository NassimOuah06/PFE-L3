import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "./styles.module.css";
import img1 from "../../images/candidats/c1.jpg";
import img2 from "../../images/candidats/c2.jpg";
import img3 from "../../images/candidats/c3.jpg";
import img4 from "../../images/candidats/c4.jpg";


const Main = () => {
    const [voted, setVoted] = useState(localStorage.getItem("voted") === 'true');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("voted state changed:", voted);
        localStorage.setItem("voted", voted);
        console.log("localStorage updated:", localStorage.getItem("voted"));
    }, [voted]);

    const handleVote = async (candidateId) => {
        console.log("handleVote called with candidateId:", candidateId);
        setLoading(true);
        setLoadingMessage('Veuillez patienter...');

        try {
            const token = localStorage.getItem("token");
            console.log("Token retrieved from localStorage:", token);

            const payload = {
                candidatId: candidateId,
                data: token
            };

            console.log("Payload being sent:", payload);
            const response = await axios.post('/api/vote', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("API response:", response.data);
            setTimeout(() => {
                setLoadingMessage('Vote soumis avec succes !');
                setTimeout(() => {
                    setLoading(false);
                    setVoted(true);
                }, 3000);
            }, 5000);
        } catch (error) {
            console.error('Error while voting:', error);
            setLoading(false);

            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handleAffiche = (candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleStats = () => {
        console.log("Navigating to /stats");
        window.location.href='/stats';
    };

    const closeModal = () => {
        setSelectedCandidate(null);
    };

    return (
        <div>
            {loading && <LoadingPopup message={loadingMessage} />}
            {voted ? <AlreadyVoted handleStats={handleStats} /> : <HeroSection handleVote={handleVote} handleAffiche={handleAffiche} />}
            {selectedCandidate && <CandidateModal candidate={selectedCandidate} onClose={closeModal} />}
        </div>
    );
};

const AlreadyVoted = ({ handleStats }) => {
    console.log("AlreadyVoted component rendered");
    return (
        <div className={style.hero_section}>
            <h1>Vous avez déjà voté</h1>
            <div>
                <p>Vous pouvez consulter les statistiques actuelles du processus de vote en cours</p>
                <button className={style.button} onClick={handleStats}>Stats</button>
            </div>
        </div>
    );
};

const HeroSection = ({ handleVote, handleAffiche }) => {
    const candidates = [
        { id: 0, name: "Candidate A", party: "Party X", img: img1, description: "Details about Candidate A" },
        { id: 1, name: "Candidate B", party: "Party Y", img: img2, description: "Details about Candidate B" },
        { id: 2, name: "Candidate C", party: "Party Z", img: img3, description: "Details about Candidate C" },
        { id: 3, name: "Candidate D", party: "Party W", img: img4, description: "Details about Candidate D" }
    ];

    console.log("HeroSection component rendered");

    const styles = {
        border: '1px solid rgba(0, 0, 0, 0.05)',
    };

    return (
        <header className={style.hero_section}>
            <h2>Voting Section</h2>
            <div className={style.hero_content}>
                {candidates.map(candidate => (
                    <div key={candidate.id} className={style.card}>
                        <img src={candidate.img} alt={candidate.name} />
                        <h3>{candidate.name}</h3>
                        <div className={style.info}>
                            <button style={styles} className={style.voir} onClick={() => handleAffiche(candidate)}><span>Voir plus</span></button>
                            <button className={style.button} onClick={() => handleVote(candidate.id)}>Vote</button>
                        </div>
                    </div>
                ))}
            </div>
        </header>
    );
};

const CandidateModal = ({ candidate, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={style.modal_overlay} onClick={handleOverlayClick}>
            <div className={style.modal}>
                <button className={style.close_button} onClick={onClose}>X</button>
                <h2>{candidate.name}</h2>
                <p>{candidate.party}</p>
                <p>{candidate.description}</p>
            </div>
        </div>
    );
};
const LoadingPopup = ({ message }) => {
    return (
        <div className={style.loading_overlay}>
            <div className={style.loading_popup}>
                <div className={style.loading_bar}></div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Main;
