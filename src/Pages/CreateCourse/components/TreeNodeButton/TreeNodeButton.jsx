import { useDraggable } from "@dnd-kit/core";
import TreeNode from "../../../../components/TreeNode/TreeNode";

export default function TreeNodeButton({ backgroundColor, iconColor, icon }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: icon,
  });

  const style = {};

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <div>
        <TreeNode
          color1={backgroundColor}
          color2={iconColor}
          icon={icon}
          completed={true}
        >
          {" "}
        </TreeNode>
      </div>
    </div>
  );
}
