import { LoaderSection } from "@style";
import Spinner from "react-bootstrap/Spinner";

const LoaderComponent = ({ isLoading, isSingleComponent }) => {
  return (
    <LoaderSection class="lds-spinner" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50% , -50%)" }}>
      <Spinner animation="border" role="status" style={{ width: "100px", height: "100px", color: "#F18805" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </LoaderSection>
  );
};

export default LoaderComponent;
