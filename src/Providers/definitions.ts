import { createContext, useContext } from "react";
import { TDogsContext, TTabContext } from "../types";

export const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const TabContext = createContext<TTabContext>({} as TTabContext);

export const useDogs = () => useContext(DogsContext);

export const useTabs = () => useContext(TabContext);
