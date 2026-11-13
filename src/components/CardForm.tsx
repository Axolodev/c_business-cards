"use client";

import { NumberField, TextAreaField, TextField } from "./FormInputs";
import { PropertyGroup } from "./PropertyGroup";
import useFormStateStore from "@/stores/formStore";

export interface CardFormProps {
  className?: string;
}

const GRID = "grid grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2";

export function CardForm({ className }: CardFormProps) {
  const state = useFormStateStore((s) => s.form);
  const onChange = useFormStateStore((s) => s.setForm);
  const { card, textBlock, qrCode } = state;

  const setCard = (patch: Partial<typeof card>) =>
    onChange({ ...state, card: { ...card, ...patch } });
  const setText = (patch: Partial<typeof textBlock>) =>
    onChange({ ...state, textBlock: { ...textBlock, ...patch } });
  const setQr = (patch: Partial<typeof qrCode>) =>
    onChange({ ...state, qrCode: { ...qrCode, ...patch } });

  return (
    <form
      className={`bg-base-200 border-base-300 rounded-box flex flex-col gap-6 border p-6 ${className ?? ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset className={GRID}>
        <legend className="sr-only">Card</legend>
        <NumberField
          label="Width"
          value={card.width}
          onValueChange={(width) => setCard({ width })}
        />
        <NumberField
          label="Height"
          value={card.height}
          onValueChange={(height) => setCard({ height })}
        />
        <NumberField
          label="Thickness"
          value={card.thickness}
          onValueChange={(thickness) => setCard({ thickness })}
        />
        <NumberField
          label="Border Radius"
          value={card.borderRadius}
          onValueChange={(borderRadius) => setCard({ borderRadius })}
        />
      </fieldset>

      <PropertyGroup
        label="Include text block?"
        legend="Text Properties"
        checked={textBlock.enabled}
        onToggleChange={(enabled) => setText({ enabled })}
      >
        <div className={GRID}>
          <NumberField
            label="X Position"
            value={textBlock.xPosition}
            onValueChange={(xPosition) => setText({ xPosition })}
          />
          <NumberField
            label="Y Position"
            value={textBlock.yPosition}
            onValueChange={(yPosition) => setText({ yPosition })}
          />
          <NumberField
            label="Font size"
            unit=""
            value={textBlock.fontSize}
            onValueChange={(fontSize) => setText({ fontSize })}
          />
          <NumberField
            label="Thickness"
            value={textBlock.thickness}
            onValueChange={(thickness) => setText({ thickness })}
          />
          <TextAreaField
            className="md:col-span-2"
            label="Text content"
            value={textBlock.content}
            onValueChange={(content) => setText({ content })}
          />
        </div>
      </PropertyGroup>

      <PropertyGroup
        label="Include QR Code?"
        legend="QR Code Properties"
        checked={qrCode.enabled}
        onToggleChange={(enabled) => setQr({ enabled })}
      >
        <div className={GRID}>
          <NumberField
            label="X Position"
            value={qrCode.xPosition}
            onValueChange={(xPosition) => setQr({ xPosition })}
          />
          <NumberField
            label="Y Position"
            value={qrCode.yPosition}
            onValueChange={(yPosition) => setQr({ yPosition })}
          />
          <NumberField
            label="Thickness"
            value={qrCode.thickness}
            onValueChange={(thickness) => setQr({ thickness })}
          />
          <NumberField
            label="Module Size"
            value={qrCode.moduleSize}
            onValueChange={(moduleSize) => setQr({ moduleSize })}
          />
          <TextField
            className="md:col-span-2"
            label="QR code text (can be a link)"
            placeholder="https://example.com/"
            value={qrCode.qrContent}
            onValueChange={(qrContent) => setQr({ qrContent })}
          />
        </div>
      </PropertyGroup>
    </form>
  );
}
