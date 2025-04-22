import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { UserContext } from "../context/User";
import { MdEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

export const Note = ({ text, userId }) => {
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

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex gap-2 justify-content-center align-items-center">
        {editClicked ? (
          <Form.Control
            defaultValue={userInput}
            type="text"
            onChange={handleChange}
            className="m-0"
            style={{ minWidth: "200px" }}
          />
        ) : (
          <p className="mb-0" style={{ lineHeight: "1.5" }}>
            {userInput}
          </p>
        )}

        {loggedInUser.userId === userId &&
          (editClicked ? (
            <button type="submit" className="btn p-0 border-0 bg-transparent">
              <FaCheckCircle size={18} className="menu-options" />
            </button>
          ) : (
            <MdEdit
              className="react-icon menu-options p-0"
              onClick={handleClick}
              size={18}
            />
          ))}
      </div>
    </Form>
  );
};
