import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Spinner variant="primary" />
    </div>
  );
};
