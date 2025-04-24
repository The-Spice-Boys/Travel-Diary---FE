import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../context/User';
import { MdEdit } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { deleteNote, updateNote } from '../api.js';

export const Note = ({ text, userId, noteId, onDelete }) => {
  const { loggedInUser } = useContext(UserContext);
  const [userInput, setUserInput] = useState(text);
  const [editClicked, setEditClicked] = useState(false);

  const handleClick = () => {
    setEditClicked(!editClicked);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditClicked(false);
  };

  const handleEditNote = () => {
    updateNote(noteId, userInput).then(() => {});
  };

  const handleDeleteNote = () => {
    onDelete(noteId);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex gap-2 justify-content-center align-items-center">
        {editClicked ? (
          <div className="d-flex flex-column gap-2">
            <Form.Control
              defaultValue={userInput}
              type="text"
              onChange={handleChange}
              className="m-0"
              style={{ minWidth: '400px' }}
            />
          </div>
        ) : (
          <p className="mb-3" style={{ lineHeight: '1.5' }}>
            {userInput}
          </p>
        )}

        {loggedInUser.userId === userId &&
          (editClicked ? (
            <button
              type="submit"
              className="btn p-0 border-0 bg-transparent mb-3"
              onClick={handleEditNote}
            >
              <FaCheckCircle size={18} className="icon-color react-icon" />
            </button>
          ) : (
            <MdEdit
              className="react-icon icon-color p-0 mb-3"
              onClick={handleClick}
              size={18}
            />
          ))}
        <button
          type="submit"
          className="btn p-0 border-0 bg-transparent mb-3"
          onClick={handleDeleteNote}
        >
          <FaTrash size={18} className="icon-color react-icon" />
        </button>
      </div>
    </Form>
  );
};
