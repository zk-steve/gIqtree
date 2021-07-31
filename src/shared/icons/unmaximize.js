import * as React from "react";

function UnMaximize(props) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" stroke="#000" d="M3.5.5h17v17h-17z" />
      <path fill="#fff" stroke="#000" d="M.5 3.5h17v17H.5z" />
    </svg>
  );
}

export default UnMaximize;
