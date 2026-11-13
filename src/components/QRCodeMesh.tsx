import { useMemo } from "react";
import QRCode from "qrcode";
import * as THREE from "three";
import { CardDimensions, QrCodeState } from "@/types/cardFormTypes";

/**
 * We use a low level of error correction. As defined in the type, possible
 * values are L for Low, M for Medium, Q for Quartile, and H for High. A bigger
 * level of error correction will make it easier for your QR code to be scanned
 * if it gets damaged, but it will also take more space.
 */
type ErrorCorrectionType = "L" | "M" | "Q" | "H";
const ERROR_CORRECTION: ErrorCorrectionType = "L";

const makeModuleSquare = (col: number, row: number, moduleSize: number) => {
  const x = col * moduleSize;
  const y = -row * moduleSize; // flip y: matrix rows go down, 3D y goes up

  // We form the square shape for each QR code module using simple lines.
  const shape = new THREE.Shape();
  shape.moveTo(x, y);
  shape.lineTo(x + moduleSize, y);
  shape.lineTo(x + moduleSize, y + moduleSize);
  shape.lineTo(x, y + moduleSize);
  shape.closePath();
  return shape;
};

const QRCodeMesh = ({
  qrCodeProps,
  cardProps,
}: {
  qrCodeProps: QrCodeState;
  cardProps: CardDimensions;
}) => {
  // This process is quite complex, so we memoize it.
  const qrCode = useMemo(
    () =>
      QRCode.create(qrCodeProps.qrContent, {
        errorCorrectionLevel: ERROR_CORRECTION,
      }),
    [qrCodeProps.qrContent],
  );

  const geometry = useMemo(() => {
    const { size, data } = qrCode.modules;

    const shapes: THREE.Shape[] = [];
    data.forEach((value, index) => {
      if (value) {
        const yCoord = Math.floor(index / size);
        const xCoord = Math.floor(index % size);
        // Shift the grid so the QR code is centred on the origin.
        shapes.push(
          makeModuleSquare(
            xCoord - size / 2,
            yCoord + 1 - size / 2,
            qrCodeProps.moduleSize,
          ),
        );
      }
    });

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: qrCodeProps.thickness,
      bevelEnabled: false,
      curveSegments: 24,
    });

    geometry.center();

    return geometry;
  }, [qrCode, qrCodeProps.moduleSize, qrCodeProps.thickness]);

  return (
    <mesh
      position={[
        qrCodeProps.xPosition,
        qrCodeProps.yPosition,
        (cardProps.thickness + qrCodeProps.thickness) / 2,
      ]}
      geometry={geometry}
    >
      <meshPhongMaterial color="black" />
    </mesh>
  );
};

export default QRCodeMesh;
