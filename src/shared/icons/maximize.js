import * as React from "react";

function Maximize(props) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" stroke="#000" d="M.5.5h17v17H.5z" />
    </svg>
  );
}

export default Maximize;
