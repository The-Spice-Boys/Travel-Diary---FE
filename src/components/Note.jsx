import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../context/User';
import { MdEdit } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

export const Note = ({ text, userId }) => {
  const { loggedInUser } = useContext(UserContext);
  const [editClicked, setEditClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setEditClicked(!editClicked);
  };

  return (
    <div className="d-flex gap-2 justify-content-center align-items-center">
      {editClicked ? (
        <Form>
          <Form.Control placeholder={text}></Form.Control>
        </Form>
      ) : (
        <p className="mb-0">{text}</p>
      )}

      {loggedInUser.user_id === userId &&
        (editClicked ? (
          <FaCheckCircle
            className="react-icon menu-options p-0"
            onClick={handleClick}
            size={15}
          />
        ) : (
          <MdEdit
            className="react-icon menu-options p-0"
            onClick={handleClick}
            size={15}
          />
        ))}
    </div>
  );
};
