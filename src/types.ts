import { ReactNode } from "react";
import { Dog } from "./Dog";

/* DOGS */

export type TDogsContext = {
  allDogs: Dog[];
  updateDogs: (dogs: Dog[]) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  handleError: (message: string) => void;
};

export type TDogInputState = {
  name: string;
  description: string;
  image: string;
};

export type TDogInputStateContext = {
  input: TDogInputState;
  setInput: (input: TDogInputState) => void;
};

/* TABS */

export type TTabKey = "favorited" | "unfavorited" | "create a dog" | "";

export type TTab = {
  label: string | null;
  content: Dog[] | ReactNode;
};

export type TTabContext = {
  tabs: Record<TTabKey, TTab>;
  activeTab: TTabKey;
  setActiveTab: (tab: TTabKey) => void;
};
