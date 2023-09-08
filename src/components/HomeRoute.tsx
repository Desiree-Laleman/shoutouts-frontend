import { useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import "./HomeRoute.css";
import {
  addShoutout,
  deleteShoutout,
  getAllShoutouts,
} from "../services/shoutoutService";
import ShoutoutList from "./ShoutoutList";
import ShoutoutForm from "./ShoutoutForm";

const HomeRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const loadShoutouts = async (): Promise<void> => {
    setShoutouts(await getAllShoutouts());
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
      <ShoutoutForm addShoutOutHandler={addShoutoutHandler} />
      <ShoutoutList
        shoutouts={shoutouts}
        deleteShoutoutHandler={deleteShoutoutHandler}
      />
    </div>
  );
};

export default HomeRoute;
