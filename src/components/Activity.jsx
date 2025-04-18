import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Photo } from "./Photo";
import { Note } from "./Note";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { MenuPopover } from "./MenuPopover";
import { getNotesByActivityId, getPhotosByActivityId } from "../api";

import { MdAddAPhoto } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { editEnabled } from "../utils/utils";

const MyVerticallyCenteredModal = (props) => {
   const {
      activity: { activity_id, title },
      show,
      userId,
   } = props;

   const photos = getPhotosByActivityId(activity_id);
   const notes = getNotesByActivityId(activity_id);
   const [addPhotoButton, setAddPhotoButton] = useState(false);
   const [addNoteButton, setAddNoteButton] = useState(false);

   useEffect(() => {
      setAddNoteButton(false);
      setAddPhotoButton(false);
   }, [show]);

   const photoArray = photos.map(({ photo_id, caption, url }) => {
      return (
         <Photo key={photo_id} url={url} caption={caption} userId={userId} />
      );
   });

   const noteArray = notes.map(({ note_id, text }) => {
      return <Note key={note_id} text={text} userId={userId} />;
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

         {editEnabled(userId) && (
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
   const canEdit = editEnabled(userId);
   const [modalShow, setModalShow] = useState(false);
   const [isActivityComplete, setIsActivityComplete] = useState(
      activity.completion_status
   );

   const handleDisplayModal = () => {
      if (isActivityComplete) setModalShow(true);
   };

   const handleToggleCompletion = (event) => {
      event.stopPropagation();
      canEdit && setIsActivityComplete(!isActivityComplete);
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

            {canEdit && <MenuPopover icon="dots" />}
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
