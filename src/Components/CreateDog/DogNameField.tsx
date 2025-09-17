import { useDogs } from "../../Providers/definitions";
import { TDogInputState } from "../../types";

export default function DogNameField({
  setInput,
  input,
}: {
  setInput: (input: TDogInputState) => void;
  input: TDogInputState;
}) {
  const { isLoading } = useDogs();

  return (
    <>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        onChange={(e) => setInput({ ...input, name: e.target.value })}
        value={input.name}
        disabled={isLoading}
      />
    </>
  );
}
