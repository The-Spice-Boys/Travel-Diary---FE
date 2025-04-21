import { Figure } from 'react-bootstrap';
import { MenuPopover } from './MenuPopover';
import { useContext } from 'react';
import { UserContext } from '../context/User';

export const Photo = ({ url, caption, userId }) => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <Figure className="position-relative d-inline-block">
      <Figure.Image src={url} className="rounded" />
      {loggedInUser.user_id === userId && <MenuPopover />}
      <Figure.Caption>{caption}</Figure.Caption>
    </Figure>
  );
};
