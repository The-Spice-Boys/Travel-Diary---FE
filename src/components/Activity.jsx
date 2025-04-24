import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Photo } from "./Photo";
import { Note } from "./Note";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/User";
import { ListGroup } from "react-bootstrap";
import { MenuOptions } from "./MenuOptions";
import { getNotesByActivityId, getPhotosByActivityId } from "../api";

import { MdAddAPhoto } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const MyVerticallyCenteredModal = (props) => {
  const { loggedInUser } = useContext(UserContext);

  const {
    activity: { activityId, title },
    show,
    userId,
  } = props;

  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [addPhotoButton, setAddPhotoButton] = useState(false);
  const [addNoteButton, setAddNoteButton] = useState(false);

  useEffect(() => {
    getPhotosByActivityId(activityId).then((photos) => setPhotos(photos));
    getNotesByActivityId(activityId).then((notes) => setNotes(notes));
  }, []);

  useEffect(() => {
    setAddNoteButton(false);
    setAddPhotoButton(false);
  }, [show]);

  //! Photos need photo id from back end!
  const photoArray = photos.map(({ caption, imgUrl }, index) => {
    return <Photo key={index} url={imgUrl} caption={caption} userId={userId} />;
  });

  const noteArray = notes.map(({ noteId, text }) => {
    return <Note key={noteId} text={text} userId={userId} />;
  });

  function handleAddPhoto() {
    setAddNoteButton(false);
    setAddPhotoButton(true);
  }

  function handleAddNote() {
    setAddPhotoButton(false);
    setAddNoteButton(true);
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="responsive-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column">
          {photoArray}
        </div>
        {noteArray}

        {addPhotoButton && (
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload photo
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
        )}
        {addNoteButton && (
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Add a note"
              aria-label="default input example"
            />
          </div>
        )}
      </Modal.Body>

      {loggedInUser.userId === userId && (
        <Modal.Footer>
          <Button onClick={handleAddPhoto}>
            <MdAddAPhoto />
          </Button>
          <Button onClick={handleAddNote}>
            <LuNotebookPen />
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export const Activity = ({ activity, userId }) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletedIds, setDeletedIds] = useState([]);
  const [errorId, setErrorId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState(activity.title);
  const [isActivityComplete, setIsActivityComplete] = useState(
    activity.completionStatus
  );

  const handleDisplayModal = () => {
    if (isActivityComplete) setModalShow(true);
  };

  const handleToggleCompletion = (event) => {
    event.stopPropagation();
    loggedInUser.userId === userId &&
      setIsActivityComplete(!isActivityComplete);
  };

  return (
    <div className="activity-container my-2 rounded-2">
      <ListGroup.Item
        onClick={handleDisplayModal}
        className={`d-flex justify-content-between align-items-center ${
          isActivityComplete && "activity-completed"
        } ${deletedIds.includes(activity.activityId) ? "deleted-item" : ""}`}
      >
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column gap-0">
            <p className="m-2 mb-0">
              {deletedIds.includes(activity.activityId) ? "Deleted" : title}
            </p>
            {errorId === activity.activityId && (
              <p className="text-danger fs-6 m-2 mb-0 mt-0 p-0">
                Failed to delete
              </p>
            )}
          </div>

          {!deletedIds.includes(activity.activityId) &&
            (isActivityComplete ? (
              <MdOutlineCheckBox size={30} onClick={handleToggleCompletion} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                size={30}
                onClick={handleToggleCompletion}
              />
            ))}
        </div>
        {!deletedIds.includes(activity.activityId) &&
          loggedInUser.userId === userId && (
            <MenuOptions
              id={activity.activityId}
              componentName={"activity"}
              setDeletedIds={setDeletedIds}
              setErrorId={setErrorId}
              title={title}
              setTitle={setTitle}
            />
          )}
      </ListGroup.Item>

      <MyVerticallyCenteredModal
        activity={activity}
        show={modalShow}
        onHide={() => setModalShow(false)}
        userId={userId}
      />
    </div>
  );
};
