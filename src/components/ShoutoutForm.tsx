import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./ShoutoutForm.css";
import Shoutout from "../models/Shoutout";
import AuthContext from "../context/AuthContext";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  addShoutOutHandler: (shoutout: Shoutout) => void;
  name?: string;
}

const ShoutoutForm = ({ addShoutOutHandler, name }: Props) => {
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState(name || "");
  const [from, setFrom] = useState(user?.displayName || "");
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const files = fileInputRef.current?.files;
    const shoutout: Shoutout = { to, from, text, profilePic: user?.photoURL! };
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, "shoutouts/" + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      shoutout.shoutoutPic = url;
      // uploadBytes(storageRef, file).then((snapshot) => {
      //   getDownloadURL(snapshot.ref).then((url) => {
      //     shoutout.shoutoutPic = url;
      //   });
      // });
    }
    addShoutOutHandler(shoutout);
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
        disabled={!!user}
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

      <label htmlFor="upload">File Upload</label>
      <input ref={fileInputRef} type="file" id="upload" name="upload" />

      <button>Submit Shout Out!</button>
    </form>
  );
};

export default ShoutoutForm;
