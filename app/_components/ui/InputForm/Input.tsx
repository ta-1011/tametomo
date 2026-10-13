import type { ComponentProps } from "react";

type Props = ComponentProps<"input">;

const Input = (props: Props) => {
  return (
    <input
      {...props}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  );
};

export default Input;
