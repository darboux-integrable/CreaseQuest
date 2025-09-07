import styles from "./AnimatedBackground.module.css";
import { useRef, useEffect } from "react";

export default function AnimatedBackground(){

    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        const dimensions = canvas.getBoundingClientRect();
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        const ctx = canvas.getContext("2d");


    }, []);

    return (
        <div className={styles.container}>
            <canvas className={styles.canvas} ref={canvasRef}></canvas>
        </div>
    )

}