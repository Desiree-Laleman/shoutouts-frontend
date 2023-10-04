import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllShoutouts = async (
  to: string | null,
  name: string | null
): Promise<Shoutout[]> => {
  const params: any = {
    ...(to ? { to } : {}),
    ...(name ? { name } : {}),
  };
  return (await axios.get(`${baseURL}/shoutouts`, { params })).data;
};

// export const getMyShoutouts = async (name: string): Promise<Shoutout[]> => {
//   return (await axios.get(`${baseURL}/shoutouts/${encodeURIComponent(name)}`))
//     .data;
// };

export const addShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(`${baseURL}/shoutouts`, shoutout)).data;
};

export const deleteShoutout = async (id: string): Promise<void> => {
  return await axios.delete(`${baseURL}/shoutouts/${encodeURIComponent(id)}`);
};
