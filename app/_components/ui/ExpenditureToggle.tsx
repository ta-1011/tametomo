type Props = {
  type: "plus" | "minus";
  onChange: (type: "plus" | "minus") => void;
};

const ExpenditureToggle = (props: Props) => {
  return (
    <>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => props.onChange("plus")}
          className={`rounded-md border px-4 py-2 ${
            props.type === "plus"
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-blue-500 bg-white text-blue-500"
          }`}
        >
          ＋
        </button>

        <button
          type="button"
          onClick={() => props.onChange("minus")}
          className={`rounded-md border px-4 py-2 ${
            props.type === "minus"
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-blue-500 bg-white text-blue-500"
          }`}
        >
          −
        </button>
      </div>
    </>
  );
};

export default ExpenditureToggle;
