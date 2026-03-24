import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const Signup = () => {
    const [data, setData] = useState({
        nom: "",
        prenom: "",
        wilaya: "",
        genre: "",
        anneeNaissance: "",
        cardId: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:4000/api/users";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div>
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Nom"
                            name="nom"
                            onChange={handleChange}
                            value={data.nom}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Prenom"
                            name="prenom"
                            onChange={handleChange}
                            value={data.prenom}
                            required
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Wilaya"
                            name="wilaya"
                            onChange={handleChange}
                            value={data.wilaya}
                            required
                            className={styles.input}
                        />
                        <select
                            name="genre"
                            onChange={handleChange}
                            value={data.genre}
                            required
                            className={`${styles.input} ${styles.select}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Year of Birth"
                            name="anneeNaissance"
                            onChange={handleChange}
                            value={data.anneeNaissance}
                            required
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Card ID"
                            name="cardId"
                            onChange={handleChange}
                            value={data.cardId}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.blue_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Signup;
