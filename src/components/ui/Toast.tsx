type ToastPropsType = {
  heading: string;
  description: string;
};
const Toast = ({ heading, description }: ToastPropsType) => {
  return (
    <div>
      <p className="text-base font-medium">{heading}</p>
      <p className="text-sm font-medium">{description}</p>
    </div>
  );
};

export default Toast;
