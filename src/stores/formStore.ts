import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CardFormState } from "@/types/cardFormTypes";
import { initialCardFormState } from "@/types/cardFormTypes";

interface FormStateStore {
  form: CardFormState;
  setForm: (form: CardFormState) => void;
}

export const FORM_STATE_STORAGE_KEY = "formState";

/**
 * Merges a persisted form over the defaults, group by group, so fields added
 * in later versions still get their default value for returning users.
 */
export function mergePersistedForm(persisted: unknown): CardFormState {
  const saved = (persisted as { form?: Partial<CardFormState> } | null)?.form;
  if (!saved || typeof saved !== "object") return initialCardFormState;
  const d = initialCardFormState;
  return {
    card: { ...d.card, ...saved.card },
    textBlock: { ...d.textBlock, ...saved.textBlock },
    qrCode: { ...d.qrCode, ...saved.qrCode },
  };
}

const useFormStateStore = create<FormStateStore>()(
  persist(
    (set) => ({
      form: initialCardFormState,
      setForm: (form) => set({ form }),
    }),
    {
      name: FORM_STATE_STORAGE_KEY,
      partialize: (s) => ({ form: s.form }),
      merge: (persisted, current) => ({
        ...current,
        form: mergePersistedForm(persisted),
      }),
      skipHydration: true,
    },
  ),
);

export default useFormStateStore;
