import { Dog } from "../Dog";
import { useDogs, useTabs } from "../Providers/definitions";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { allDogs, updateDogs } = useDogs();
  const { tabs, activeTab } = useTabs();

  const setFavorite = (newDog: Dog, isFavorite: boolean) => {
    updateDogs(
      allDogs.map((dog) =>
        dog.id === newDog.id ? new Dog({ ...dog, isFavorite: isFavorite }) : dog
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
      {Object.entries(tabs).map(
        ([key, tab]) =>
          activeTab === key &&
          tab.content instanceof Array &&
          display(tab.content)
      )}
    </>
  );
};
