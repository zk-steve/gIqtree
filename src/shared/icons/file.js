import * as React from "react";

function File(props) {
  return (
    <svg
      width={27}
      height={35}
      viewBox="0 0 27 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.625 9.844v20.781A4.375 4.375 0 0122.25 35H4.75a4.375 4.375 0 01-4.375-4.375V4.375A4.375 4.375 0 014.75 0h12.031l9.844 9.844zm-6.563 0a3.281 3.281 0 01-3.28-3.281V2.188H4.75a2.188 2.188 0 00-2.188 2.187v26.25a2.187 2.187 0 002.188 2.188h17.5a2.188 2.188 0 002.188-2.188V9.844h-4.375z"
        fill="#111127"
      />
    </svg>
  );
}

export default File;
