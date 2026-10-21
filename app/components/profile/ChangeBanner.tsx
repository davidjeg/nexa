"use client";
import { useState, useRef, useEffect } from "react";
interface Props {
  className?: string;
  bannerDb?: string | null;
}
const ChangeBanner = ({ className, bannerDb }: Props) => {
  const [image, setImage] = useState<string | undefined>(bannerDb ?? undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setImage(imgUrl);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`bg-orange-400 h-24 cursor-pointer bg-cover bg-center ${className ?? ""}`}
      style={{ backgroundImage: image ? `url(${image})` : undefined }}
    >
      <input
        onChange={handleImageUpload}
        accept="image/*"
        name="banner"
        id="banner"
        className="hidden"
        ref={inputRef}
        type="file"
      />
    </div>
  );
};

export default ChangeBanner;
