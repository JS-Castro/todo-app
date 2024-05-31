import IMessage from "../types/message";

const Alert = ({ message, shouldShow }: IMessage) => {
  if (shouldShow === false) {
    return <></>;
  }

  return (
    <div>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
