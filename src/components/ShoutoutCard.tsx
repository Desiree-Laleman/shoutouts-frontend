import { Link } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./ShoutoutCard.css";

interface Props {
  shoutout: Shoutout;
  deleteShoutoutHandler: (id: string) => void;
}

const ShoutoutCard = ({ shoutout, deleteShoutoutHandler }: Props) => {
  return (
    <li className="ShoutoutCard">
      <div>
        <h2>
          Shout out to{" "}
          <Link to={`/shoutouts?${new URLSearchParams({ to: shoutout.to })}`}>
            {shoutout.to}
          </Link>
        </h2>
        <p>
          - from{" "}
          <img
            id="user-icon"
            src={shoutout.profilePic}
            alt={shoutout.profilePic}
          />{" "}
          <Link to={`/shoutouts?${new URLSearchParams({ to: shoutout.from })}`}>
            {shoutout.from}
          </Link>
        </p>
      </div>
      <p>{shoutout.text}</p>
      {shoutout.shoutoutPic && (
        <img src={shoutout.shoutoutPic} alt={shoutout.text} />
      )}
      <button onClick={() => deleteShoutoutHandler(shoutout._id!)}>
        Delete Shout Out
      </button>
    </li>
  );
};

export default ShoutoutCard;
