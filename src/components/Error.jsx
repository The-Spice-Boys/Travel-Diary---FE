import { TbFileSad } from 'react-icons/tb';

export const Error = ({ error }) => {
  const lookupMsg = {
    404: 'No itineraries have been created for this country yet!',
    400: 'Bad request',
  };

  return (
    <div className="width-card d-flex align-items-center justify-content-center mt-5">
      <TbFileSad size={30} />
      <p className="p-0 m-0">{lookupMsg[error]}</p>
    </div>
  );
};
