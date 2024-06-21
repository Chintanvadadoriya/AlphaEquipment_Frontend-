import { Button } from "@style";
import { FiCommand } from "react-icons/fi";

const SubmitButton = ({ disabled, loading, name, type, onClick, marginTop }) => {
  
  let otherProps = {
    disabled,
    loading,
    marginTop
  };

  if (typeof onClick === "function") {
    otherProps = {
      ...otherProps,
      onClick,
    };
  }
  return (
    <Button type={type || "submit"} {...otherProps}>
      {loading ? <FiCommand className="loading-icon" /> : name}
    </Button>
  );
};

export default SubmitButton;
