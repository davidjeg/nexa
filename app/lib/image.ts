export const getImageDimensions = (file: File) => {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new window.Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });

      URL.revokeObjectURL(img.src);
    };
  });
};
