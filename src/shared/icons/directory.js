import * as React from "react";

function Directory(props) {
  return (
    <svg
      width={28}
      height={20}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.188 8.008h-3.165V4.68a.936.936 0 00-.937-.938h-9.229L9.421.455A.239.239 0 009.26.391H1.813a.936.936 0 00-.938.937v17.344c0 .518.419.937.938.937h20.449a.94.94 0 00.87-.586l3.926-9.726a.936.936 0 00-.87-1.29zM2.983 2.5h5.523l3.504 3.352h8.903v2.156H5.973a.94.94 0 00-.87.586l-2.119 5.25V2.5zm18.613 15H3.658L6.685 10h17.941l-3.03 7.5z"
        fill="#000"
      />
    </svg>
  );
}

export default Directory;
