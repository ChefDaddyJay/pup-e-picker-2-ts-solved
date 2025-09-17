import { ReactNode, useEffect, useRef, useState } from "react";
import { Requests } from "../../api";
import toast from "react-hot-toast";
import { DogsContext } from "../definitions";
import { Dog, TDogData, EMPTY_DOG } from "../../Dog";

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogsState, setDogsState] = useState<Dog[]>([EMPTY_DOG]);
  const [isLoading, setLoading] = useState(false);
  const latestRefresh = useRef(0);

  const refetchDogs = async () => {
    const ref = ++latestRefresh.current;

    try {
      const response = await Requests.getAllDogs();
      const dogs: Dog[] = response
        ? response.map((dog: TDogData) => new Dog(dog))
        : [EMPTY_DOG];

      return ref === latestRefresh.current && dogs;
    } catch (error) {
      throw new Error("Failed to fetch dogs.");
    }
  };

  const handleError = (message: string) => {
    toast.error(message);
    setDogsState([...dogsState]);
    setLoading(false);
  };

  const refresh = () => {
    refetchDogs()
      .then((dogs) => {
        dogs && setDogsState(dogs);
        setLoading(false);
      })
      .catch(() => handleError("Failed to retrieve dogs. Please try again."));
  };

  const deleteDog = (dogs: Dog[]) => {
    const dogIds = dogs.map((dog) => dog.id);
    const missingId = dogsState.filter((dog) => !dogIds.includes(dog.id))[0].id;
    return Requests.deleteDog(missingId);
  };

  const updateDogs = (dogs: Dog[]) => {
    setDogsState(dogs ? dogs : []);

    if (dogs.length > dogsState.length) {
      // A dog has been added
      refresh();
    } else if (dogs.length < dogsState.length) {
      // A dog had been removed
      deleteDog(dogs)
        .then(() => refresh())
        .catch(() => handleError("Failed to delete dog. Please try again."));
    } else {
      // A dog has been changed
      dogs.forEach((dog, index) => {
        if (!dog.equals(dogsState[index])) {
          Requests.updateDog(dog)
            .then(() => refresh())
            .catch(() =>
              handleError(`Failed to update dog. Please try again."`)
            );
        }
      });
    }
  };

  useEffect(() => {
    Requests.getAllDogs()
      .then((response) => {
        const dogs: Dog[] = response
          ? response.map((dog: TDogData) => new Dog(dog))
          : [EMPTY_DOG];
        setDogsState(dogs);
      })
      .catch(() => toast.error("Failed to retrieve dogs."));
  }, []);

  return (
    <DogsContext.Provider
      value={{
        allDogs: dogsState,
        updateDogs,
        isLoading,
        setLoading,
        handleError,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
