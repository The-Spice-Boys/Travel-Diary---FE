import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Photo } from "./Photo";
import { Note } from "./Note";
import { useContext, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { MenuPopover } from "./MenuPopover";
import { getNotesByActivityId, getPhotosByActivityId } from "../api";
import { UserContext } from "../context/User";
import { useParams } from "react-router-dom";

import { MdAddAPhoto } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const MyVerticallyCenteredModal = (props) => {
   let { editenabled } = props;
   editenabled = editenabled === "true" ? true : false;

   const {
      activity: { activity_id, title },
      show,
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
         <Photo
            key={photo_id}
            url={url}
            caption={caption}
            editenabled={editenabled.toString()}
         />
      );
   });

   const noteArray = notes.map(({ note_id, text }) => {
      return <Note key={note_id} text={text} editenabled={editenabled.toString()} />;
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
            {photoArray}
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

         {editenabled && (
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

export const Activity = ({ activity, editenabled }) => {
   editenabled = editenabled === "true" ? true : false;
   const [modalShow, setModalShow] = useState(false);
   const [isActivityComplete, setIsActivityComplete] = useState(
      activity.completion_status
   );

   const handleDisplayModal = () => {
      if (isActivityComplete) setModalShow(true);
   };

   const handleToggleCompletion = (event) => {
      event.stopPropagation();
      if (editenabled) setIsActivityComplete(!isActivityComplete);
   };

   return (
      <div>
         <ListGroup.Item
            onClick={handleDisplayModal}
            className={`d-flex justify-content-between align-items-center ${
               isActivityComplete && "activity-completed"
            }`}
         >
            <div className="d-flex align-items-center">
               <p className="m-2">{activity.title}</p>
               <Button className="p-0" onClick={handleToggleCompletion}>
                  {isActivityComplete ? (
                     <MdOutlineCheckBox size={30} />
                  ) : (
                     <MdOutlineCheckBoxOutlineBlank size={30} />
                  )}
               </Button>
            </div>

            {editenabled && <MenuPopover icon="dots" />}
         </ListGroup.Item>

         <MyVerticallyCenteredModal
            editenabled={editenabled.toString()}
            activity={activity}
            show={modalShow}
            onHide={() => setModalShow(false)}
         />
      </div>
   );
};
