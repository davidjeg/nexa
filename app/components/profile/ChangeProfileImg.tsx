"use client";
import { createClient } from "@/app/lib/supabase/client";
import { useRef, useState } from "react";
const ChangeProfileImg = () => {
  const [image, setImg] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (!img) return;
    const image = URL.createObjectURL(img);
    setImg(image);

    try {
      const supabase = createClient();

      // Obtener el usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Debes iniciar sesión");
      }

      // Crear una ruta única para la imagen
      const extension = img.name.split(".").pop() || "jpg";
      const filePath = `profile_picture/${user.id}-${Date.now()}.${extension}`;

      // Subir la imagen a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, img, {
          upsert: true,
          contentType: img.type,
        });

      if (uploadError) throw uploadError;

      // Obtener la URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("profiles").getPublicUrl(filePath);

      // Guardar la URL en el perfil del usuario
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      console.log("Foto de perfil actualizada");
    } catch (error) {
      console.error("Error al actualizar la foto:", error);
      alert("No se pudo actualizar la foto de perfil");
    }
  };
  return (
    <div
      className="absolute z-10 bottom-1/2 left-0 translate-y-1/2 size-32 aspect-square rounded-full border-4 border-white bg-cover bg-center bg-red-200"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default ChangeProfileImg;
