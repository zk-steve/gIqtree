import * as React from "react";

function SmallFile(props) {
  return (
    <svg
      width={14}
      height={18}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.75 5.063V15.75A2.25 2.25 0 0111.5 18h-9a2.25 2.25 0 01-2.25-2.25V2.25A2.25 2.25 0 012.5 0h6.188l5.062 5.063zm-3.375 0a1.687 1.687 0 01-1.688-1.688v-2.25H2.5A1.125 1.125 0 001.375 2.25v13.5A1.125 1.125 0 002.5 16.875h9a1.125 1.125 0 001.125-1.125V5.062h-2.25z"
        fill="#696969"
      />
    </svg>
  );
}

export default SmallFile;
