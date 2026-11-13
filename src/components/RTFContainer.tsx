"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// We add these two new imports
import useFormStateStore from "@/stores/formStore";
import CardMesh from "./CardMesh";

const RTFContainer = () => {
  // We add this line to extract the card props from the form state
  const { card } = useFormStateStore((s) => s.form);

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 100], fov: 70 }}>
        <OrbitControls makeDefault />

        <directionalLight color="white" position={[0, 0, 5]} />

        {/** And finally add this group with the card mesh */}
        <group>
          <CardMesh cardProps={card} />
        </group>
      </Canvas>
    </div>
  );
};

export default RTFContainer;
