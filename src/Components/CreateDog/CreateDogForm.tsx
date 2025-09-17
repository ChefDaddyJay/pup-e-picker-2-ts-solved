import { FormEvent } from "react";
import { useDogs, useInput } from "../../Providers/definitions";
import { Requests } from "../../api";
import DogNameField from "./DogNameField";
import DogDescriptionField from "./DogDescriptionField";
import DogImageField from "./DogImageField";
import { Dog, EMPTY_DOG_INPUT } from "../../Dog";

export const CreateDogForm = () => {
  const { input, setInput } = useInput();
  const { allDogs, updateDogs, setLoading, handleError } = useDogs();

  const createDog = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dog: Dog = new Dog({
      id: -1,
      name: input.name,
      description: input.description,
      image: input.image,
      isFavorite: false,
    });

    Requests.postDog(dog)
      .then(() => {
        updateDogs([...allDogs, dog]);
        setInput(EMPTY_DOG_INPUT);
      })
      .catch(() => handleError("Error creating dog. Please try again."));
  };

  return (
    <form action="" id="create-dog-form" onSubmit={createDog}>
      <h4>Create a New Dog</h4>
      <DogNameField setInput={setInput} input={input} />
      <DogDescriptionField setInput={setInput} input={input} />
      <DogImageField setInput={setInput} input={input} />
      <input type="submit" value="submit" />
    </form>
  );
};
