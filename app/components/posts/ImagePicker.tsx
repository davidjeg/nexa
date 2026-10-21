import { useRef } from "react";
import { Image } from "lucide-react";
interface Props {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}
function ImagePicker({ imageFile, setImageFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  return (
    <div
      onClick={() => {
        inputRef.current?.click();
      }}
      className="hover:bg-gray-400 transition rounded-full p-2 cursor-pointer hover:scale-105
            hover:text-gray-200 text-zinc-500"
    >
      <Image name="image" strokeWidth={2} />
      <input
        name="image"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
        type="file"
      />
    </div>
  );
}

export default ImagePicker;
