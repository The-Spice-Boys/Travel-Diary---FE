import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { postActivity } from "../api";
import { Loading } from "./Loading";

export const ActivityCreationForm = ({
  show,
  onHide,
  setActivities,
  itineraryId,
}) => {
  const [newActivityInput, setNewActivityInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [userFeedback, setUserFeedback] = useState(null);

  const handleNewActivityInput = (event) => {
    setNewActivityInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPosting(true);
    postActivity({ title: newActivityInput, itineraryId })
      .then((res) => {
        setActivities((prevActivities) => [...prevActivities, res]);
        setIsPosting(false);
        setNewActivityInput("");
        setUserFeedback({
          message: "Activity added successfully",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsPosting(false);
        setUserFeedback({
          message: `${err.message}. Unable to add activity`,
          type: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setUserFeedback(null);
        }, 2000);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>New activity</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="pb-4">
          <Form.Label htmlFor="new-activity">Activity:</Form.Label>
          <Form.Control
            id="new-activity"
            type="text"
            onInput={handleNewActivityInput}
            value={newActivityInput}
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
                  Add activity
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
    </Modal>
  );
};
