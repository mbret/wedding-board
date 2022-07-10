import { Item } from "./Item";
import { useMessages } from "./useMessages";
import 'animate.css'

export const Grid = () => {
  const matrix = [4, 5];

  return (
    <div
      style={{
        width: `100vw`,
        height: `100vh`,
        display: `grid`,
        gridTemplateColumns: `repeat(${matrix[0]}, 1fr)`,
        gridTemplateRows: `repeat(${matrix[1]}, minmax(0, 1fr))`,
        backgroundColor: `#fcc9db`,
        overflow: `hidden`
      }}
    >
      {Array.from({ length: matrix[0] * matrix[1] }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
};

export default Grid