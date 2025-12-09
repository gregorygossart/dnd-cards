import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";

interface CardHeaderProps {
  title: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  const { decks, currentDeckIndex } = useDeckStore();
  const paddingMultiplier =
    decks[currentDeckIndex]?.style?.paddingMultiplier ?? 1.0;

  const titleFontSize = decks[currentDeckIndex]?.style?.titleFontSize ?? 24;

  return (
    <div
      className="text-center"
      style={{
        paddingLeft: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingRight: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
      }}
    >
      <h2
        className="font-black tracking-tight uppercase leading-none"
        style={{ fontSize: `${titleFontSize}px` }}
      >
        {title}
      </h2>
    </div>
  );
};
