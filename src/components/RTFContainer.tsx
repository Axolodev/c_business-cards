"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const RTFContainer = () => {
  return (
    <div className="h-full w-full bg-white/10">
      <Canvas camera={{ position: [0, 0, 100], fov: 70 }}>
        <OrbitControls makeDefault />
        <directionalLight color="white" position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
};

export default RTFContainer;
