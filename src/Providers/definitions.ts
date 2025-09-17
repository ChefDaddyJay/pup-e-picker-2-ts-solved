import { createContext, useContext } from "react";
import { TDogInputStateContext, TDogsContext, TTabContext } from "../types";

export const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const TabContext = createContext<TTabContext>({} as TTabContext);

export const InputStateContext = createContext<TDogInputStateContext>(
  {} as TDogInputStateContext
);

export const useDogs = () => useContext(DogsContext);

export const useTabs = () => useContext(TabContext);

export const useInput = () => useContext(InputStateContext);
