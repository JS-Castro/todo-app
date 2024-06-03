import IMessage from "../types/message";

const Alert = ({ text, shouldShow }: IMessage) => {
  if (shouldShow === false) {
    return <></>;
  }

  return <span>{text}</span>;
};

export default Alert;
