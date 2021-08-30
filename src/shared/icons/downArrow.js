import * as React from "react";

function DownArrow(props) {
  return (
    <svg
      width={16}
      height={10}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.41.933a1.042 1.042 0 000 1.475L7.42 9.417a.83.83 0 001.175 0l7.008-7.009a1.041 1.041 0 000-1.475 1.041 1.041 0 00-1.475 0L8.011 7.05 1.886.925C1.477.525.819.525.41.933z"
        fill="#000"
      />
    </svg>
  );
}

export default DownArrow;
