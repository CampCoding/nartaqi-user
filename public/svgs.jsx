import * as React from "react";
const CartRoundedOutline = (props) => (
  <svg
    width={48}
    height={49}
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={1} width={47} height={47} rx={23.5} stroke="#3B82F6" />
    <circle
      cx={21.3327}
      cy={30.4997}
      r={0.666667}
      stroke="#3B82F6"
      strokeWidth={1.33333}
      strokeLinejoin="round"
    />
    <circle
      cx={28.6667}
      cy={30.4997}
      r={0.666667}
      stroke="#3B82F6"
      strokeWidth={1.33333}
      strokeLinejoin="round"
    />
    <path
      d="M17.3672 17.8672H18.7005L20.4739 26.1472C20.5409 26.4599 20.7 26.7155 20.951 26.9138C21.202 27.1121 21.4874 27.2076 21.8072 27.2005H28.3272C28.6397 27.2 28.9178 27.1018 29.1612 26.9057C29.4047 26.7097 29.56 26.4591 29.6272 26.1539L30.7272 21.2005H19.4139"
      stroke="#3B82F6"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchRoundedOutline = (props) => (
  <svg
    width={48}
    height={49}
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={1} width={47} height={47} rx={23.5} stroke="#3B82F6" />
    <circle
      cx={23.3333}
      cy={23.8333}
      r={5.33333}
      stroke="#3B82F6"
      strokeWidth={1.33333}
      strokeLinejoin="round"
    />
    <path
      d="M29.9995 30.4995L27.1328 27.6328"
      stroke="#3B82F6"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



export const ArrowLoginButton = (props) => (
  <svg
    width={40}
    height={41}
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y={0.5} width={40} height={40} rx={20} fill="#152E56" />
    <path
      d="M15.9956 17.914L24.6026 26.521L26.0166 25.107L17.4106 16.5H24.9956V14.5H13.9956V25.5H15.9956V17.914Z"
      fill="#C2D8FC"
    />
  </svg>
);


export const headerIcons = {
  Cart: CartRoundedOutline,
  Search: SearchRoundedOutline,
  ArrowLoginButton: ArrowLoginButton,
};
