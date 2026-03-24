import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./components/Styles/transitions.css";
import Main from "./components/Main";
import Stats from "./components/Stats";
import Home from "./components/Home";
import Signup from "./components/Signup/index.jsx";
import Login from "./components/Login";
import Guide from "./components/Guide";
import About from "./components/About";
import EmailVerify from "./components/EmailVerify";
import NavBar from "./components/Navbar/index.jsx";

function App2() {
  const user = localStorage.getItem("token");
  const location = useLocation();

  return (
    <>
      <NavBar /> {/* NavBar component is outside the transition */}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <div className="main-content">
            <Routes location={location}>
              {!user && <Route path="/" element={<Home />} />}
              {user && (
                <Route path="/" element={<Navigate replace to="/guide" />} />
              )}
              {user && <Route path="/main" element={<Main />} />}
              {user && <Route path="/stats" element={<Stats />} />}
              {!user && (
                <Route
                  path="/main"
                  element={<Navigate replace to="/login" />}
                />
              )}
              {!user && (
                <Route
                  path="/stats"
                  element={<Navigate replace to="/login" />}
                />
              )}
              <Route path="/guide" element={<Guide />} />
              {!user && <Route path="/about" element={<About />} />}
              {!user && <Route path="/signup" element={<Signup />} />}
              {!user && <Route path="/login" element={<Login />} />}
              <Route
                path="/users/:id/verify/:token"
                element={<EmailVerify />}
              />
              <Route
                path="*"
                element={<Navigate replace to={user ? "/guide" : "/"} />}
              />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App2;
