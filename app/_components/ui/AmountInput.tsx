import { ComponentProps } from "react";

type Props = ComponentProps<"input">;

const AmountInput = (props: Props) => {
  return (
    <>
      <input
        {...props}
        className="min-w-0 flex-1 rounded-md border border-gray-200 px-3 py-3 outline-none focus:border-blue-500"
      />
    </>
  );
};

export default AmountInput;
