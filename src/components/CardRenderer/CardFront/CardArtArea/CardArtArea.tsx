import React from "react";

interface CardArtAreaProps {
  image?: string;
}

export const CardArtArea: React.FC<CardArtAreaProps> = ({ image }) => {
  return (
    <div
      className="h-full bg-white relative bg-cover bg-center"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
      }}
    />
  );
};
