import { create } from "zustand";
import * as THREE from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

interface MeshStoreState {
  jointMesh: THREE.Object3D | null;
  setJointMesh: (jointMesh: THREE.Object3D | null) => void;
  downloadModel: () => void;
}

function downloadBlobAsFile(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(blobUrl);
}

const useMeshStore = create<MeshStoreState>()((set, get) => ({
  jointMesh: null,
  setJointMesh: (jointMesh) => set({ jointMesh }),

  downloadModel: () => {
    const { jointMesh } = get();
    if (!jointMesh) {
      console.error("The model is not ready yet. Try again in a moment.");
      return;
    }

    // Make sure every child's world transform is updated before exporting.
    jointMesh.updateMatrixWorld(true);

    const exporter = new STLExporter();
    const data = exporter.parse(jointMesh, { binary: true });
    const blob = new Blob([data], { type: "model/stl" });

    downloadBlobAsFile(blob, "joint-model.stl");
  },
}));

export default useMeshStore;
