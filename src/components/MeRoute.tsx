import { useSearchParams } from "react-router-dom";
import "./MeRoute.css";
import { useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import { deleteShoutout, getAllShoutouts } from "../services/shoutoutService";
import ShoutoutList from "./ShoutoutList";

const MeRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const loadShoutouts = async (): Promise<void> => {
    setShoutouts(await getAllShoutouts(null, name));
  };

  const deleteShoutoutHandler = async (id: string): Promise<void> => {
    await deleteShoutout(id);
    loadShoutouts();
  };

  useEffect(() => {
    (async () => {
      loadShoutouts();
    })();
  }, [name]);

  return (
    <div className="MeRoute">
      <ShoutoutList
        shoutouts={shoutouts}
        deleteShoutoutHandler={deleteShoutoutHandler}
      />
    </div>
  );
};

export default MeRoute;
