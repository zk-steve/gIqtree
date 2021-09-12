import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import parse from "./parse";
const convertTree = (tree) => {
  const children = tree.branchset ? tree.branchset.map(convertTree) : [];
  const attributes = { "": tree.length };
  // const attributes = {};
  const name = tree.name;
  return { name, attributes, children };
};

function TreeView({ content }) {
  const [treeData, setTreeData] = useState({});
  const [zoom, setZoom] = useState(0.9);
  const [translatePosition, setTranslate] = useState({ x: 0, y: 0 });
  const [visibility, setVisibility] = useState("hidden");
  const [pathFunction, setPathFunction] = useState("straight");
  const treeRef = React.createRef();
  const nodeSvgShape = {
    shape: "circle",
    shapeProps: {
      r: 10,
    },
  };

  const zoomIn = () => {
    setZoom(zoom + 0.1);
  };
  const zoomOut = () => {
    setZoom(zoom - 0.1);
  };
  useEffect(() => {
    const center = () => {
      setTranslate({
        x: treeRef.current.offsetWidth / 7 + Math.random(),
        y: treeRef.current.offsetHeight / 2 + Math.random(),
      });
    };
    center();
    let convertedTree = convertTree(parse(content));
    setTreeData(convertedTree);
    setPathFunction("step");
    setVisibility("visible");
  }, [content]);
  const style = {
    nodes: {
      node: {
        circle: {
          fill: "#52e2c5",
        },
        attributes: {
          stroke: "#000",
        },
      },
      leafNode: {
        circle: {
          fill: "white",
        },
        attributes: {
          stroke: "#000",
        },
      },
    },
  };
  return (
    <div
      style={{ visibility: visibility, height: "100%", width: "100%" }}
      ref={treeRef}
    >
      <div
        style={{
          maxWidth: "130px",
          position: "absolute",
          right: "30px",
          top: "30px",
        }}
      >
        {/* <CustomButton
          icon={<ZoomInOutlined />}
          placement={"left"}
          onClick={zoomIn}
        >
          {translate("tree.zoomIn")}
        </CustomButton>
        <CustomButton
          icon={<ZoomOutOutlined />}
          placement={"left"}
          onClick={zoomOut}
        >
          {translate("tree.zoomOut")}
        </CustomButton>
        <CustomButton
          icon={<ExpandOutlined />}
          placement={"left"}
          onClick={center}
        >
          {translate("tree.centre")}
        </CustomButton> */}
      </div>
      <Tree
        styles={style}
        translate={translatePosition}
        data={treeData}
        pathFunc={pathFunction}
        scaleExtent={{ min: 0.1, max: 10 }}
        nodeSvgShape={nodeSvgShape}
        zoom={zoom}
        separation={{ siblings: 0.4, nonSiblings: 0.8 }}
      />
    </div>
  );
}

export default TreeView;
