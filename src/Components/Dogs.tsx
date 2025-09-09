import { useDogs, useTabs } from "../Providers/definitions";
import { Dog } from "../types";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { allDogs, updateDogs } = useDogs();
  const { activeTab } = useTabs();

  const getFavorited = () => allDogs.filter((dog) => dog.isFavorite);
  const getUnfavorited = () => allDogs.filter((dog) => !dog.isFavorite);

  const setFavorite = (newDog: Dog, isFavorite: boolean) => {
    updateDogs(
      allDogs.map((dog) =>
        dog.id === newDog.id ? { ...dog, isFavorite: isFavorite } : dog
      )
    );
  };

  const deleteDog = (id: number) => {
    updateDogs(allDogs.filter((dog) => dog.id !== id));
  };

  const display = (dogs: Dog[]) =>
    dogs.map((dog) => (
      <DogCard
        key={dog.id}
        dog={dog}
        onEmptyHeartClick={() => setFavorite(dog, true)}
        onHeartClick={() => setFavorite(dog, false)}
        onTrashIconClick={() => deleteDog(dog.id)}
        isLoading={false}
      />
    ));

  return (
    <>
      {activeTab === 0 && display(allDogs)}
      {activeTab === 1 && display(getFavorited())}
      {activeTab === 2 && display(getUnfavorited())}
    </>
  );
};
