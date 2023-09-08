import { FormEvent, useEffect, useState } from "react";
import "./ShoutoutForm.css";
import Shoutout from "../models/Shoutout";

interface Props {
  addShoutOutHandler: (shoutout: Shoutout) => void;
  name?: string;
}

const ShoutoutForm = ({ addShoutOutHandler, name }: Props) => {
  const [to, setTo] = useState(name ? name : "");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addShoutOutHandler({ to, from, text });
    setTo("");
    setFrom("");
    setText("");
  };

  useEffect(() => {
    setTo(name || "");
  }, [name]);

  return (
    <form className="ShoutoutForm" onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="to">To</label>
      <input
        required
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(event) => setTo(event.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        required
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(event) => setFrom(event.target.value)}
      />
      <label htmlFor="shoutout">Shout Out</label>
      <textarea
        required
        rows={4}
        cols={50}
        name="text"
        id="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button>Submit Shout Out!</button>
    </form>
  );
};

export default ShoutoutForm;
