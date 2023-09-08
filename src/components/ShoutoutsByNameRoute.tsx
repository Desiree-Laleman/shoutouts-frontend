import { Link, useParams } from "react-router-dom";
import "./ShoutoutsByNameRoute.css";
import { useCallback, useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import ShoutoutList from "./ShoutoutList";
import {
  addShoutout,
  deleteShoutout,
  getShoutoutsByName,
} from "../services/shoutoutService";
import ShoutoutForm from "./ShoutoutForm";

const ShoutoutsByNameRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const name: string | undefined = useParams().name;

  const loadShoutouts = useCallback(async () => {
    setShoutouts(await getShoutoutsByName(name!));
  }, [name]);

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
  }, [name, loadShoutouts]);

  return (
    <div className="ShoutoutsByNameRoute">
      <h1>Shoutouts for {name}</h1>
      <ShoutoutForm addShoutOutHandler={addShoutoutHandler} name={name} />
      <Link to="/">Back to Homepage</Link>
      <ShoutoutList
        shoutouts={shoutouts}
        deleteShoutoutHandler={deleteShoutoutHandler}
      />
    </div>
  );
};

export default ShoutoutsByNameRoute;
