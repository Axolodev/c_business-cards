export interface CardDimensions {
  width: number;
  height: number;
  thickness: number;
  borderRadius: number;
}

export interface TextBlockState {
  enabled: boolean;
  xPosition: number;
  yPosition: number;
  thickness: number;
  fontSize: number;
  content: string;
}

export interface QrCodeState {
  enabled: boolean;
  xPosition: number;
  yPosition: number;
  thickness: number;
  moduleSize: number;
  qrContent: string;
}

/** Shape of the whole card form. */
export interface CardFormState {
  card: CardDimensions;
  textBlock: TextBlockState;
  qrCode: QrCodeState;
}

export const initialCardFormState: CardFormState = {
  card: { width: 84, height: 53, thickness: 2, borderRadius: 8 },
  textBlock: {
    enabled: true,
    xPosition: -40,
    yPosition: 14,
    thickness: 2,
    fontSize: 14,
    content: "Name Lastname\n\nSoftware Engineer\n\nMaker",
  },
  qrCode: {
    enabled: true,
    xPosition: 20,
    yPosition: -5,
    thickness: 2,
    moduleSize: 1.2,
    qrContent: "https://example.com/",
  },
};
