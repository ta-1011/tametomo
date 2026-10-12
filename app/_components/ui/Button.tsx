type Props = {
  children: React.ReactNode;
  type: "button" | "submit";
  disabled: boolean;
};

const Button = ({ children, type = "button", disabled = false }: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="py-4 px-16 mt-10 rounded-md bg-[#3383FB] text-white"
    >
      {children}
    </button>
  );
};

export default Button;
