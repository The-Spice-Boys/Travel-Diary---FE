import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Photo} from './Photo';
import {Note} from './Note';
import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/User';
import {ListGroup} from 'react-bootstrap';
import {MenuOptions} from './MenuOptions';
import {deleteNote, getNotesByActivityId, getPhotosByActivityId, postNote, postPhoto} from '../api';

import {MdAddAPhoto, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {LuNotebookPen} from 'react-icons/lu';
import {FaRegSquarePlus} from "react-icons/fa6";

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
   const [newNote, setNewNote] = useState('');
   const [isNoteCreated, setIsNoteCreated] = useState(false);
   const [isNoteUpdated, setIsNoteUpdated] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);
   const [isPhotoCreated, setIsPhotoCreated] = useState(false);
   const [photoCaption, setPhotoCaption] = useState('');

   useEffect(() => {
      getPhotosByActivityId(activityId).then((photos) => setPhotos(photos));
      getNotesByActivityId(activityId).then((notes) => setNotes(notes));
   }, []);

   useEffect(() => {
      setAddNoteButton(false);
      setAddPhotoButton(false);
   }, [show,isNoteUpdated]);

   const handleDeleteNote = (noteId) => {
      deleteNote(noteId).then(() => {
         setNotes(notes.filter((note) => note.noteId !== noteId));
      })
   }


   //! Photos need photo id from back end!
   const photoArray = photos.map(({ caption, imgUrl }, index) => {
      return <Photo key={index} url={imgUrl} caption={caption} userId={userId} />;
   });

   const noteArray = notes.map(({ noteId, text }) => {
      return <Note key={noteId} text={text} userId={userId} noteId={noteId} onDelete={()=>{handleDeleteNote(noteId)}}/>;
   });

   function handleAddPhoto() {
      setAddNoteButton(false);
      setAddPhotoButton(true);
   }

   function handleAddNote() {
      console.log("add note");
      setAddPhotoButton(false);
      setAddNoteButton(true);
   }

   function handleAddNoteAction(e) {
      e.stopPropagation();
      const note = {
         text: newNote,
         activityId: activityId,
      }
      postNote(note).then(({data}) => {
         setNotes([...notes, data]);
         setNewNote('');
         setIsNoteCreated(true);
         setTimeout(() => {
            setIsNoteCreated(false);
         }, 2000);
      })
   }

   function handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
         setSelectedFile(file);
      }
   }

   function handleAddPhotoAction(e) {
      e.stopPropagation();
      postPhoto(selectedFile,photoCaption,activityId).then(({data}) => {
             const newPic = {caption:data.caption,imgUrl:data.imgUrl};
             setPhotos([...photos, newPic]);
             setSelectedFile(null);
             setIsPhotoCreated(true);
             setPhotoCaption('');
             setTimeout(() => {
                setIsPhotoCreated(false);
             }, 2000);
          }
      )
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
                       Upload Photo
                    </label>
                    <input className="form-control w-75 my-2" type="text" id="formFile" placeholder="Picture Caption" onChange={(e)=>{setPhotoCaption(e.target.value)}}/>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                       <input className="form-control w-75" type="file" id="formFile" onChange={handleFileChange} />
                       <button type="submit" className="btn p-0 border-0 bg-transparent" onClick={handleAddPhotoAction}><FaRegSquarePlus size={40} className={"menu-options"} /></button>
                    </div>

                    {
                        isPhotoCreated && (
                            <div className={`justify-content-between text-success-emphasis align-items-center mt-3 fade show`}>New photo has been uploaded successfully !</div>
                        )
                    }
                 </div>
             )}
             {addNoteButton && (
                 <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                       <input
                           className="form-control mt-3"
                           type="text"
                           placeholder="Add a note"
                           aria-label="default input example"
                           style={{ width: "90%"}}
                           value={newNote}
                           onChange={e => setNewNote(e.target.value)}
                       />
                       <button type="submit" className="btn p-0 border-0 bg-transparent mt-3" onClick={handleAddNoteAction}><FaRegSquarePlus size={40} className={"menu-options"} /></button>
                    </div>
                    {
                        isNoteCreated && (
                            <div className={`justify-content-between text-success-emphasis align-items-center mt-3 fade show`}>New note has been added successfully !</div>
                        )
                    }
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
                  isActivityComplete && 'activity-completed'
              } ${deletedIds.includes(activity.activityId) ? 'deleted-item' : ''}`}
          >
             <div className="d-flex align-items-center">
                <div className="d-flex flex-column gap-0">
                   <p className="m-2 mb-0">
                      {deletedIds.includes(activity.activityId)
                          ? 'Deleted'
                          : activity.title}
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
                         componentName={'activity'}
                         setDeletedIds={setDeletedIds}
                         setErrorId={setErrorId}
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