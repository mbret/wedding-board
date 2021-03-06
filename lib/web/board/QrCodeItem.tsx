import QRCode from "react-qr-code";
import { useMeasure } from "react-use";

export const QrCodeItem = () => {
  const [ref, { height, width }] = useMeasure();
  const url = `${window.origin}/send`;

  return (
    <div
      style={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`
      }}
    >
      <div
        ref={ref as any}
        style={{
          width: `90%`,
          height: `90%`,
          display: `flex`,
          justifyContent: `flex-end`,
        }}
      >
        <QRCode
          value={url}
          size={Math.min(height, width)}
        />
      </div>
    </div>
  );
};
