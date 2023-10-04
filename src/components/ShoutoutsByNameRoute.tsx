import { Link, useSearchParams } from "react-router-dom";
import "./ShoutoutsByNameRoute.css";
import { useCallback, useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import ShoutoutList from "./ShoutoutList";
import {
  addShoutout,
  deleteShoutout,
  getAllShoutouts,
} from "../services/shoutoutService";
import ShoutoutForm from "./ShoutoutForm";

const ShoutoutsByNameRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");

  const loadShoutouts = useCallback(async () => {
    setShoutouts(await getAllShoutouts(to, null));
  }, [to]);

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
  }, [to, loadShoutouts]);

  return (
    <div className="ShoutoutsByNameRoute">
      <h1>Shoutouts for {to}</h1>
      <ShoutoutForm addShoutOutHandler={addShoutoutHandler} name={to!} />
      <Link to="/">Back to Homepage</Link>
      <ShoutoutList
        shoutouts={shoutouts}
        deleteShoutoutHandler={deleteShoutoutHandler}
      />
    </div>
  );
};

export default ShoutoutsByNameRoute;
