import { Figure } from 'react-bootstrap';
import { MenuPopover } from './MenuPopover';
import { editEnabled } from '../utils/utils';
import { useContext } from 'react';
import { UserContext } from '../context/User';

export const Photo = ({ url, caption, userId }) => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <Figure className="position-relative d-inline-block">
      <Figure.Image src={url} className="rounded" />
      {loggedInUser.user_id === userId && (
        <MenuPopover
          icon="edit"
          className="position-absolute top-0 end-0 m-2"
        />
      )}
      <Figure.Caption>{caption}</Figure.Caption>
    </Figure>
  );
};
