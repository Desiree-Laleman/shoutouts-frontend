import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <h1>Grand Circus Shoutouts</h1>
      {user ? (
        <>
          <Link to={`/me?${new URLSearchParams({ name: user?.displayName! })}`}>
            My Shoutouts
          </Link>
          <button onClick={() => signOut()}>Sign out</button>{" "}
        </>
      ) : (
        <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
      )}
    </header>
  );
};

export default Header;
