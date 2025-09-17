import { dogPictures } from "../../dog-pictures";
import { useDogs } from "../../Providers/definitions";
import { TDogInputState } from "../../types";

export default function DogImageField({
  setInput,
  input,
}: {
  setInput: (input: TDogInputState) => void;
  input: TDogInputState;
}) {
  const { isLoading } = useDogs();

  return (
    <>
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
    </>
  );
}
