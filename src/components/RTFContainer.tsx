"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import useFormStateStore from "@/stores/formStore";
import CardMesh from "./CardMesh";

// We add Suspense, as Text3D suspends while the font data is loading.
// You can read more about it here: https://drei.docs.pmnd.rs/abstractions/text3d
import { Suspense } from "react";
import TextBlockMesh from "./TextBlockMesh";

const RTFContainer = () => {
  // We destructure the textBlock values from the form state
  const { card, textBlock } = useFormStateStore((s) => s.form);

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 100], fov: 70 }}>
        <OrbitControls makeDefault />

        <directionalLight color="white" position={[0, 0, 5]} />
        <group>
          <CardMesh cardProps={card} />

          {/** And we add the text block with Suspense without a fallback
           * and control its visibility based on form props */}
          <Suspense fallback={null}>
            {textBlock.enabled && textBlock.content.length > 0 && (
              <TextBlockMesh textBlockProps={textBlock} cardProps={card} />
            )}
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
};

export default RTFContainer;
