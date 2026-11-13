"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import useFormStateStore from "@/stores/formStore";
import CardMesh from "./CardMesh";
import { Suspense } from "react";
import TextBlockMesh from "./TextBlockMesh";

// We import the mesh
import QRCodeMesh from "./QRCodeMesh";
import useMeshStore from "@/stores/meshStore";

const RTFContainer = () => {
  // We destructure the form values
  const { card, textBlock, qrCode } = useFormStateStore((s) => s.form);
  // Add this line
  const setJointMesh = useMeshStore((s) => s.setJointMesh);

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 100], fov: 70 }}>
        <OrbitControls makeDefault />

        <directionalLight color="white" position={[0, 0, 5]} />
        <group ref={setJointMesh}>
          <CardMesh cardProps={card} />

          <Suspense fallback={null}>
            {textBlock.enabled && textBlock.content.length > 0 && (
              <TextBlockMesh textBlockProps={textBlock} cardProps={card} />
            )}
          </Suspense>

          {/** And add the QR Code mesh into our group similar to how we did with
           * the text block
           */}
          {qrCode.enabled && qrCode.qrContent.length > 0 && (
            <QRCodeMesh qrCodeProps={qrCode} cardProps={card} />
          )}
        </group>
      </Canvas>
    </div>
  );
};

export default RTFContainer;
