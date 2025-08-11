interface ImageContainerProps {
  category: string;
  fileName: string;
  alt: string;
}

export const ImageContainer = ({ category, fileName, alt }: ImageContainerProps) => {
  return (
    <div className="mx-auto max-w-[600px]">
      <img
        src={`docs-assets/${category}/${fileName}`}
        alt={alt}
        className="rounded-md object-cover"
      />
    </div>
  );
};
