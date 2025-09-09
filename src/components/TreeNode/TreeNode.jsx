import styles from "./TreeNode.module.css";
import TrophySVG from "../SVGS/TrophySVG/TrophySVG";
import StarSVG from "../SVGS/StarSVG/StarSVG";
            
export default function TreeNode({ onClickEvent, color1, color2, node }) {

  return (
    <div
      className={styles.treeNode}
      style={{
        backgroundColor: color1,
        width: `${node.width}px`,
        height: `${node.height}px`,
        top: `${node.positionY - node.height / 2}px`,
        left: `${node.positionX - node.width / 2}px`, 
        borderColor: color1  
    }}
    onClick={() => {onClickEvent()}}
    >
      <div
        className={styles.nodeWrapper}
        style={{ borderColor: color2, backgroundColor: color1 }}
      >
        {(function () {
          if (node.icon === "star") {
            return <StarSVG filled={node.completed} color={color2} size={35} />;
          } else if (node.icon === "trophy") {
            return <TrophySVG filled={node.completed} color={color2} size={35}/>;
          }
        })()}
        
      </div>
    </div>
  );
}
