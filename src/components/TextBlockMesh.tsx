import { CardDimensions, TextBlockState } from "@/types/cardFormTypes";
import { Text3D } from "@react-three/drei";

// The name of the font file you added
const TEXT_FONT = "Roboto_ExtraBold.json";

const TextBlockMesh = ({
  textBlockProps,
  cardProps,
}: {
  textBlockProps: TextBlockState;
  cardProps: CardDimensions;
}) => {
  return (
    <Text3D
      font={`/${TEXT_FONT}`}
      size={textBlockProps.fontSize / 4}
      position={[
        textBlockProps.xPosition,
        textBlockProps.yPosition,
        cardProps.thickness / 2,
      ]}
      height={textBlockProps.thickness}
    >
      {textBlockProps.content}
      <meshBasicMaterial color="black" />
    </Text3D>
  );
};

export default TextBlockMesh;
