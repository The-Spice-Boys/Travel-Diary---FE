import { useContext } from 'react';
import { MenuPopover } from './MenuPopover';
import { UserContext } from '../context/User';

export const Note = ({ text, userId }) => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="d-flex gap-2 align-items-center">
      <p>{text}</p>
      {loggedInUser.user_id === userId && <MenuPopover icon="edit" />}
    </div>
  );
};
