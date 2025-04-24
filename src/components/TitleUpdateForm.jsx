import { Button, Form, Modal } from "react-bootstrap";
import { Loading } from "./Loading";
import { useState } from "react";

export const TitleUpdateForm = ({
  modalInfo: { modalTitle, modalLabel },
  show,
  onHide,
  apiFunction,
  elementId,
  setTitle,
  title,
}) => {
  const [input, setInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [userFeedback, setUserFeedback] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle(input);
    setIsPosting(true);
    apiFunction(elementId, { title: input })
      .then(() => {
        setIsPosting(false);
        setInput("");
        setUserFeedback({
          message: "Updated successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setIsPosting(false);
        setTitle(title);
        setUserFeedback({
          message: `${err.message}. Unable to update`,
          type: "error",
        });
      })
      .finally(() => {
        userFeedback && setTimeout(() => setUserFeedback(null), 2000);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body className="pb-4">
            <Form.Label htmlFor={modalLabel}>{modalLabel}</Form.Label>
            <Form.Control
              id={modalLabel}
              type="text"
              placeholder={title}
              onInput={handleChange}
              value={input}
            ></Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-column align-items-center w-100">
              {isPosting ? (
                <Loading />
              ) : (
                <>
                  {" "}
                  <button
                    className="custom-button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                  <div style={{ height: "1rem", marginTop: "0.5rem" }}>
                    {userFeedback && (
                      <p
                        className={`fs-6 mb-0 p-0 text-center ${
                          userFeedback.type === "success"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {userFeedback.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};
