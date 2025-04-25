import { ButtonProps } from "@/types/button";

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
