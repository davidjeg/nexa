"use client";
import { toast } from "@/components/ui/toast";
import { createPost } from "@/app/actions/posts";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import ImagePicker from "./ImagePicker";
import Image from "next/image";
import { X } from "lucide-react";
import { getImageDimensions } from "@/app/lib/image";
function CreatePost() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
  const handleSubmit = async (formData: FormData) => {
    if (imageFile) {
      const { width, height } = await getImageDimensions(imageFile);
      formData.append("width", String(width));
      formData.append("height", String(height));
    }
    await toast.promise(createPost(formData), {
      loading: "Creating post...",
      success: "Post created!",
      error: "Failed creating post",
    });
    formRef.current?.reset();
    setImageFile(null);
  };

  return (
    <form className="flex gap-1 px-4 " action={handleSubmit} ref={formRef}>
      <div className="rounded-full bg-orange-200 w-12 h-12 ">Image</div>
      <div className="flex-1 flex flex-col gap-1">
        <textarea
          name="content"
          className="resize-none text-xl border-none outline-none "
          placeholder="Type your message here..."
        />

        {imageUrl && (
          <div className="relative w-fit ">
            <button
              onClick={() => setImageFile(null)}
              className="absolute right-2 top-2 cursor-pointer bg-zinc-950 rounded-full text-zinc-200 p-1 hover:bg-zinc-800 transition"
            >
              <X size={16} />
            </button>
            <img
              src={imageUrl}
              alt="image-post"
              className="max-w-full max-h-160 rounded-2xl"
            />
          </div>
        )}
        <div className="flex items-center gap-5 self-end">
          <div>
            <ImagePicker imageFile={imageFile} setImageFile={setImageFile} />
          </div>
          <Button type="submit">Create Post</Button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
