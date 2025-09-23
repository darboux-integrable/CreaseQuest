import styles from "./TreeNode.module.css";
import TrophySVG from "../SVGS/TrophySVG/TrophySVG";
import StarSVG from "../SVGS/StarSVG/StarSVG";

export default function TreeNode({ color1, color2, icon = "star", completed=false}) {

  return (
    <div
      className={styles.treeNode}
      style={{
        backgroundColor: color1,
        borderColor: color1,
        zIndex: 10
    }}
    >
        <div
          className={styles.nodeWrapper}
          style={{ borderColor: color2, backgroundColor: color1 }}
        >
          {(function () {
            if (icon === "star") {
              return <StarSVG filled={completed} color={color2} size={35} />;
            } else if (icon === "trophy") {
              return <TrophySVG filled={completed} color={color2} size={35}/>;
            }
          })()}
        
        </div>
    </div>
  );
}
