"use client";

import { CardForm } from "@/components/CardForm";
import { FormStateHydrator } from "@/components/FormStateHydrator";
import RTFContainer from "@/components/RTFContainer";

// First, we import our mesh store
import useMeshStore from "@/stores/meshStore";

export default function Home() {
  // We then get the helper function from the mesh store
  const downloadModel = useMeshStore((s) => s.downloadModel);

  return (
    <div>
      <FormStateHydrator />
      <main className="bg-base-100 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-6">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
          <CardForm />

          {/* And we change this bit, adding the download model function to our button: */}
          <div className="border-base-content/10 bg-base-300 flex flex-col overflow-hidden rounded-box border">
            <div className="bg-base-200 flex items-center justify-center p-6">
              <button
                type="button"
                onClick={downloadModel}
                className="btn btn-primary"
              >
                Download .stl
              </button>
            </div>
            <div className="flex min-h-96 flex-1 items-center justify-center p-6">
              <RTFContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
