import { useRef, useState, useEffect } from "react";
import styles from "./InfiniteCanvas.module.css";

export default function InfiniteCanvas({ children }) {
  const [mousePosition, setMousePosition] = useState({
    x: undefined,
    y: undefined,
  });
  const [mouseDown, setMouseDown] = useState(false);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  const calculateRelativeMousePosition = (e) => {
    setMousePosition({
      x: e.clientX - mouseOffset.x,
      y: e.clientY - mouseOffset.y,
    });
  };

  useEffect(() => {
    const container = containerRef.current;

    const containerPosition = container.getBoundingClientRect();

    setMouseOffset({ x: containerPosition.x, y: containerPosition.y });
  }, []);

  const [displacement, setDisplacement] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className={styles.infiniteCanvasWrapper}
      ref={containerRef}
      onMouseDown={(e) => {
        setMouseDown(true);
        setLastPosition({
          x: e.clientX - mouseOffset.x,
          y: e.clientY - mouseOffset.y,
        });
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
      onMouseLeave={() => {
        setMouseDown(false);
      }}
      onMouseOutCapture={() => {
        setMouseDown(false);
      }}
      onMouseMove={(e) => {
        calculateRelativeMousePosition(e);

        if (mouseDown) {
          const delta = {
            x: mousePosition.x - lastPosition.x,
            y: mousePosition.y - lastPosition.y,
          };

          setDisplacement({
            x: displacement.x + delta.x,
            y: displacement.y + delta.y,
          });

          setLastPosition({ x: mousePosition.x, y: mousePosition.y });
        }
      }}
    >
      <div
        className={styles.childrenWrapper}
        style={{
          transform: `translate(${displacement.x}px, ${displacement.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
