import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../Providers/definitions";
import { Dog } from "../types";
import { Requests } from "../api";

type InputState = {
  name: string;
  description: string;
  image: string;
};

const EMPTY_INPUT = {
  name: "",
  description: "",
  image: dogPictures.BlueHeeler,
};

export const CreateDogForm = () => {
  const [input, setInput] = useState<InputState>(EMPTY_INPUT);
  const { dogs, updateDogs, isLoading, setLoading } = useDogs();

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);

        const dog: Dog = {
          id: -1,
          name: input.name,
          description: input.description,
          image: input.image,
          isFavorite: false,
        };
        Requests.postDog(dog)
          .then(() => updateDogs([...dogs, dog]))
          .finally(() => setInput(EMPTY_INPUT));
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        onChange={(e) => {
          setInput({ ...input, name: e.target.value });
        }}
        value={input.name}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        onChange={(e) => {
          setInput({ ...input, description: e.target.value });
        }}
        value={input.description}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setInput({ ...input, image: e.target.value });
        }}
        value={input.image}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
