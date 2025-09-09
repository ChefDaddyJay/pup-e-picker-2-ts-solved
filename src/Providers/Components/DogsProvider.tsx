import { ReactNode, useEffect, useRef, useState } from "react";
import { Dog } from "../../types";
import { Requests } from "../../api";
import toast from "react-hot-toast";
import { DogsContext } from "../definitions";

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogsState, setDogsState] = useState<Dog[]>([]);
  const [isLoading, setLoading] = useState(false);
  const latestRefresh = useRef(0);

  const refresh = () => {
    const ref = ++latestRefresh.current;

    Requests.getAllDogs()
      .then((dogs) => ref === latestRefresh.current && setDogsState(dogs!))
      .finally(() => setLoading(false));
  };

  const compareDogs = (dogA: Dog, dogB: Dog) => {
    const dogAValues = Object.values(dogA);
    const dogBValues = Object.values(dogB);
    const comparison = dogAValues.map(
      (value, index) => value === dogBValues[index]
    );

    return comparison.includes(false);
  };

  const deleteDog = (dogs: Dog[]) => {
    const dogIds = dogs.map((dog) => dog.id);
    const missingId = dogsState.filter((dog) => !dogIds.includes(dog.id))[0].id;
    Requests.deleteDog(missingId).then(
      (response) => (response?.ok ? refresh() : Promise.reject()),
      () => toast.error(`Failed to delete dog #${missingId}`)
    );
  };

  const updateDogs = (dogs: Dog[]) => {
    setDogsState(dogs);

    if (dogs.length > dogsState.length) {
      refresh();
    } else if (dogs.length < dogsState.length) {
      deleteDog(dogs);
    } else {
      dogs.forEach((dog, index) => {
        if (dogsState[index] && compareDogs(dog, dogsState[index])) {
          Requests.updateDog(dog).then(
            (response) => response?.ok && refresh(),
            () => toast.error(`Update failed`)
          );
        }
      });
    }
  };

  useEffect(refresh, []);

  return (
    <DogsContext.Provider
      value={{
        allDogs: dogsState,
        updateDogs,
        refresh,
        isLoading: isLoading,
        setLoading: setLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
