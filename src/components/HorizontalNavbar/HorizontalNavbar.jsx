import styles from "./HorizontalNavbar.module.css";

export default function HorizontalNavbar(){

    return (
        <nav className={styles.nav}>
            <div className={styles.leftSide}>
                <h1 className={styles.companyTitle}>CreaseQuest</h1>
            </div>
            <div className={styles.rightSide}>
                <button className={styles.navButton}>Home</button>
                <button className={styles.navButton}>Courses</button>
                <button className={styles.navButton}>Soloman's Key</button>
                <button className={styles.navButton}>Battle</button>
            </div>
        </nav>

    )

}