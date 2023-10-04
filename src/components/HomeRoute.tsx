import { useContext, useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import "./HomeRoute.css";
import {
  addShoutout,
  deleteShoutout,
  getAllShoutouts,
} from "../services/shoutoutService";
import ShoutoutList from "./ShoutoutList";
import ShoutoutForm from "./ShoutoutForm";
import AuthContext from "../context/AuthContext";

const HomeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const loadShoutouts = async (): Promise<void> => {
    setShoutouts(await getAllShoutouts(null, null));
  };

  const addShoutoutHandler = async (shoutout: Shoutout): Promise<void> => {
    await addShoutout(shoutout);
    loadShoutouts();
  };

  const deleteShoutoutHandler = async (id: string): Promise<void> => {
    await deleteShoutout(id);
    loadShoutouts();
  };

  useEffect(() => {
    (async () => {
      loadShoutouts();
    })();
  }, []);

  return (
    <div className="HomeRoute">
      <h1>All Shoutouts</h1>
      {user ? (
        <ShoutoutForm addShoutOutHandler={addShoutoutHandler} />
      ) : (
        <>
          <p>Sign in to leave a shoutout</p>
          <button>Sign in with Google</button>
        </>
      )}
      <ShoutoutList
        shoutouts={shoutouts}
        deleteShoutoutHandler={deleteShoutoutHandler}
      />
    </div>
  );
};

export default HomeRoute;
