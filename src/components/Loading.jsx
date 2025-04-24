import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner style={{ color: '#b91c1cb3' }} />
    </div>
  );
};
