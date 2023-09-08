import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllShoutouts = async (): Promise<Shoutout[]> => {
  return (await axios.get(`${baseURL}/shoutouts`)).data;
};

export const getShoutoutsByName = async (name: string): Promise<Shoutout[]> => {
  return (await axios.get(`${baseURL}/shoutouts/${encodeURIComponent(name)}`))
    .data;
};

export const addShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(`${baseURL}/shoutouts`, shoutout)).data;
};

export const deleteShoutout = async (id: string): Promise<void> => {
  return await axios.delete(`${baseURL}/shoutouts/${encodeURIComponent(id)}`);
};
