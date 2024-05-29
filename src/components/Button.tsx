import { ClassAttributes, ButtonHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

const Button = ({
  children,
  ...props
}: JSX.IntrinsicAttributes &
  ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>{children}</button>;
};

export default Button;
