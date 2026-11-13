"use client";

import type { ReactNode } from "react";

export interface PropertyGroupProps {
  label: string;
  legend: string;
  children?: ReactNode;
  checked: boolean;
  onToggleChange: (checked: boolean) => void;
  className?: string;
}

/**
 * A DaisyUI toggle with a label, controlling a fieldset of input fields.
 * While the toggle is off the fieldset is disabled and hidden.
 */
export function PropertyGroup({
  label,
  legend,
  children,
  checked,
  onToggleChange,
  className,
}: PropertyGroupProps) {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          role="switch"
          className="toggle"
          checked={checked}
          onChange={(event) => onToggleChange(event.target.checked)}
        />
        <span>{label}</span>
      </label>
      <fieldset
        disabled={!checked}
        hidden={!checked}
        className="fieldset bg-base-300 border-base-300 rounded-box border p-4"
      >
        <legend className="fieldset-legend">{legend}</legend>
        {children}
      </fieldset>
    </div>
  );
}
