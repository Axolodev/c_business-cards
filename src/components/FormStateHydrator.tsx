"use client";

import { useEffect } from "react";
import useFormStateStore from "@/stores/formStore";

/** Restores the saved form from localStorage once mounted in the browser. */
export function FormStateHydrator() {
  useEffect(() => {
    void useFormStateStore.persist.rehydrate();
  }, []);
  return null;
}
