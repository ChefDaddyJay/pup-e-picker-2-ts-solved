import { useDogs } from "../../Providers/definitions";
import { TDogInputState } from "../../types";

export default function DogDescriptionField({
  setInput,
  input,
}: {
  setInput: (input: TDogInputState) => void;
  input: TDogInputState;
}) {
  const { isLoading } = useDogs();

  return (
    <>
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
    </>
  );
}
