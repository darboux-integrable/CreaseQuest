import styles from "./HomePage.module.css";
import InfiniteCanvas from "../../components/InfiniteCanvas/InfiniteCanvas";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <InfiniteCanvas>
        <div className={styles.contentWrapper}>
          <button className={styles.button}>Click Me!</button>
        </div>
      </InfiniteCanvas>
    </div>
  );
}
