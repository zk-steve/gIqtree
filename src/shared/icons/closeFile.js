import * as React from "react";

function CloseFile(props) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.5 15a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" fill="#F44336" />
      <path
        d="M11.483 9.886l-1.59 1.591-6.364-6.363 1.59-1.591 6.364 6.363z"
        fill="#fff"
      />
      <path
        d="M5.114 11.483l-1.591-1.59 6.363-6.364 1.591 1.59-6.363 6.364z"
        fill="#fff"
      />
    </svg>
  );
}

export default CloseFile;
