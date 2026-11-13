import { CardDimensions } from "@/types/cardFormTypes";

const CardMesh = ({ cardProps }: { cardProps: CardDimensions }) => {
  return (
    <mesh>
      <boxGeometry
        args={[cardProps.width, cardProps.height, cardProps.thickness]}
      />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default CardMesh;
