import * as React from "react";

function Search(props) {
  return (
    <svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.601 10.796l3.874 4.029a.858.858 0 01-1.236 1.188l-3.903-4.06a6.5 6.5 0 01-3.765 1.19A6.579 6.579 0 010 6.57 6.579 6.579 0 016.571 0a6.579 6.579 0 016.572 6.571 6.55 6.55 0 01-1.542 4.225zm-.172-4.225A4.863 4.863 0 006.57 1.714a4.863 4.863 0 00-4.857 4.857 4.863 4.863 0 004.857 4.858A4.863 4.863 0 0011.43 6.57z"
        fill="#000"
      />
    </svg>
  );
}

export default Search;
