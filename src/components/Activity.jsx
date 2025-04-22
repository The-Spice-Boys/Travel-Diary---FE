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
      return (
         <Photo key={index} url={imgUrl} caption={caption} userId={userId} />
      );
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
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               {title}
            </Modal.Title>
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

         {loggedInUser.user_id === userId && (
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

   const [modalShow, setModalShow] = useState(false);
   const [isActivityComplete, setIsActivityComplete] = useState(
      activity.completionStatus
   );

   const handleDisplayModal = () => {
      if (isActivityComplete) setModalShow(true);
   };

   const handleToggleCompletion = (event) => {
      event.stopPropagation();
      loggedInUser.user_id === userId &&
         setIsActivityComplete(!isActivityComplete);
   };

   return (
      <div className="activity-container my-2 rounded-2">
         <ListGroup.Item
            onClick={handleDisplayModal}
            className={`d-flex justify-content-between align-items-center ${
               isActivityComplete && "activity-completed"
            }`}
         >
            <div className="d-flex align-items-center">
               <p className="m-2">{activity.title}</p>
               {isActivityComplete ? (
                  <MdOutlineCheckBox
                     size={30}
                     onClick={handleToggleCompletion}
                  />
               ) : (
                  <MdOutlineCheckBoxOutlineBlank
                     size={30}
                     onClick={handleToggleCompletion}
                  />
               )}
            </div>

            {loggedInUser.user_id === userId && <MenuOptions />}
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
