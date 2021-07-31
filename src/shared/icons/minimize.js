import * as React from "react";

function Minimize(props) {
  return (
    <svg
      width={12}
      height={1}
      viewBox="0 0 18 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path stroke="#000" d="M0 .5h18" />
    </svg>
  );
}

export default Minimize;
