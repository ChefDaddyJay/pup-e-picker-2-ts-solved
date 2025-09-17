import { ReactNode, useState } from "react";
import { TDogInputState } from "../../types";
import { InputStateContext } from "../definitions";
import { EMPTY_DOG_INPUT } from "../../Dog";

export const InputStateProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<TDogInputState>(EMPTY_DOG_INPUT);

  return (
    <InputStateContext.Provider value={{ input, setInput }}>
      {children}
    </InputStateContext.Provider>
  );
};
