import { z } from "zod";
import { dogPictures } from "./dog-pictures";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type TDogData = z.infer<typeof dogSchema>;

export class Dog {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;

  constructor(dog: TDogData) {
    this.id = dog.id;
    this.name = dog.name;
    this.image = dog.image;
    this.description = dog.description;
    this.isFavorite = dog.isFavorite;
  }

  equals(dog: Dog) {
    return (
      this.id === dog.id &&
      this.name === dog.name &&
      this.image === dog.image &&
      this.description === dog.description &&
      this.isFavorite === dog.isFavorite
    );
  }
}

export const EMPTY_DOG: Dog = new Dog({
  id: -1,
  name: "Empty",
  image: dogPictures.BlueHeeler,
  description: "No Dogs to display",
  isFavorite: false,
});

export const EMPTY_DOG_INPUT = {
  name: "",
  description: "",
  image: dogPictures.BlueHeeler,
};
