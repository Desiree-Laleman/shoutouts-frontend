import "./ShoutoutList.css";
import ShoutoutCard from "./ShoutoutCard";
import Shoutout from "../models/Shoutout";

interface Props {
  shoutouts: Shoutout[];
  deleteShoutoutHandler: (id: string) => void;
}

const ShoutoutList = ({ shoutouts, deleteShoutoutHandler }: Props) => {
  return (
    <div className="ShoutoutList">
      <ul>
        {shoutouts.map((item) => (
          <ShoutoutCard
            shoutout={item}
            key={item._id}
            deleteShoutoutHandler={deleteShoutoutHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShoutoutList;
