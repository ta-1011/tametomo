import type { ComponentProps } from "react";

type Props = ComponentProps<"button">;

const Button = ({ children, type = "button", disabled = false }: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="py-4 px-16 mt-4 rounded-md bg-[#3383FB] text-white"
    >
      {children}
    </button>
  );
};

export default Button;
