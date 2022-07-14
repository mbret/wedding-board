import { Item } from "./Item";
import "animate.css";
import { QrCodeItem } from "./QrCodeItem";
import { Fragment } from "react";

export const Grid = () => {
  const matrix = [5, 5] as const;

  return (
    <div
      style={{
        width: `100vw`,
        height: `100vh`,
        display: `grid`,
        gridTemplateColumns: `repeat(${matrix[0]}, 1fr)`,
        gridTemplateRows: `repeat(${matrix[1]}, minmax(0, 1fr))`,
        backgroundColor: `#a8cc3b`,
        overflow: `hidden`,
      }}
    >
      {Array.from({ length: matrix[0] * matrix[1] }).map((_, i) => (
        <Fragment key={i}>
          {i === matrix[0] - 1 ? <QrCodeItem /> : <Item />}
        </Fragment>
      ))}
    </div>
  );
};

export default Grid;
