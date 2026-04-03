import React from "react";
import { useResolvedImageUrl } from "@/hooks/useResolvedImageUrl";

interface CardArtAreaProps {
  image?: string;
}

export const CardArtArea: React.FC<CardArtAreaProps> = ({ image }) => {
  const resolved = useResolvedImageUrl(image);
  return (
    <div
      className="h-full bg-white relative bg-cover bg-center"
      style={{
        backgroundImage: resolved ? `url(${resolved})` : undefined,
      }}
    />
  );
};
