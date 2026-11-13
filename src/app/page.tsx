"use client";

import { CardForm } from "@/components/CardForm";
import { FormStateHydrator } from "@/components/FormStateHydrator";
import RTFContainer from "@/components/RTFContainer";

export default function Home() {
  return (
    <div>
      <FormStateHydrator />
      <main className="bg-base-100 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-6">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
          <CardForm />
          {/* We add the following elements: */}
          <div className="bg-base-300 rounded-box flex min-h-96 flex-1 overflow-hidden border border-base-content/10 p-6">
            <RTFContainer />
          </div>
        </div>
      </main>
    </div>
  );
}
