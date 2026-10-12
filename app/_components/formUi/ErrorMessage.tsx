// 入力エラーがない場合はそもも表示させる必要がないので、？は必要
type Props = {
  message?: string;
};

const ErrorMessage = (props: Props) => {
  if (!props.message) return;
  if (props.message) {
    return <p className="mt-2 text-red-600">※{props.message}</p>;
  }
};

export default ErrorMessage;
