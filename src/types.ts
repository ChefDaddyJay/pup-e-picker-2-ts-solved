import { ReactNode } from "react";
import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type TDogsContext = {
  dogs: Dog[];
  updateDogs: (dogs: Dog[]) => void;
  refresh: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export type Tab = {
  label: string;
  content: ReactNode;
};

export type TTabContext = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};
