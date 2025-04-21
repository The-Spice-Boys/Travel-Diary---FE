import { useContext } from 'react';
import { MenuPopover } from './MenuPopover';
import { UserContext } from '../context/User';
import { MdEdit } from 'react-icons/md';

export const Note = ({ text, userId }) => {
  const { loggedInUser } = useContext(UserContext);

  const handleClick = () => {};

  return (
    <div className="d-flex gap-2 justify-content-center align-items-center">
      <p className="mb-0">{text}</p>
      {loggedInUser.user_id === userId && (
        <MdEdit
          className="react-icon menu-options p-0"
          onClick={handleClick}
          size={15}
        />
      )}
    </div>
  );
};
