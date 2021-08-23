import * as React from "react";

function SettingClose(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={10} cy={10} r={10} fill="#D4D4D4" />
      <path
        d="M10.978 10.395l2.486-2.487a.413.413 0 10-.585-.585L10.393 9.81 7.906 7.323a.413.413 0 10-.585.585l2.487 2.487-2.487 2.487a.413.413 0 10.585.585l2.487-2.487 2.486 2.487a.413.413 0 00.585 0 .413.413 0 000-.585l-2.486-2.487z"
        fill="#000"
      />
    </svg>
  );
}

export default SettingClose;
