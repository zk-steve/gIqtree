import * as React from "react";

function CloseWindow(props) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.484 9L17.946.362c.125-.144.02-.362-.174-.362h-2.268a.469.469 0 00-.35.157L9 7.283 2.846.157A.46.46 0 002.496 0H.228C.034 0-.071.218.054.362L7.516 9 .054 17.638a.217.217 0 00-.032.235c.018.038.047.07.083.093A.231.231 0 00.228 18h2.268a.469.469 0 00.35-.157L9 10.717l6.154 7.126a.46.46 0 00.35.157h2.268c.194 0 .299-.218.174-.362L10.484 9z"
        fill="#000"
      />
    </svg>
  );
}

export default CloseWindow;
