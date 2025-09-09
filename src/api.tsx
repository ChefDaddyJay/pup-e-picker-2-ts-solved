import toast from "react-hot-toast";
import { Dog, dogSchema } from "./types";

export const baseUrl = "http://localhost:3000/dogs";

export const Requests = {
  getAllDogs: async () => {
    try {
      const response = await fetch(`${baseUrl}`);
      if (response.ok) {
        const result = await response.text();
        const allDogs: Dog[] = JSON.parse(result) as Dog[];
        return allDogs;
      } else {
        toast.error(`${response.status}`);
        return null;
      }
    } catch (error) {
      toast.error(`Fetch Error:  ${error}`);
      return null;
    }
  },

  postDog: async ({ name, description, image, isFavorite }: Dog) => {
    const sendObject = {
      name: name,
      description: description,
      image: image,
      isFavorite: isFavorite,
    };

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendObject),
      });
      if (response.ok) {
        const result = await response.text();
        toast.success(
          `Successfully created ${dogSchema.parse(JSON.parse(result)).name}`
        );
      } else {
        toast.error(`${response.status}`);
      }
    } catch (error) {
      toast.error(`Creation request error: ${error}`);
    }
  },

  deleteDog: async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      return response;
    } catch (error) {
      toast.error(`Delete request error: ${error}`);
    }
    return;
  },

  updateDog: async (dog: Dog) => {
    try {
      const response = await fetch(`${baseUrl}/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dog),
      });
      return response;
    } catch (error) {
      toast.error(`Update request error: ${error}`);
    }
  },
};
