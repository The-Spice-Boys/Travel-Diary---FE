import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Photo} from "./Photo";
import {Note} from "./Note";
import { use, useContext, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MenuPopover } from './MenuPopover';
import { GrStatusGood } from 'react-icons/gr';
import { getNotesByActivityId, getPhotosByActivityId } from '../api';
import { UserContext } from '../context/User';
import { useParams } from 'react-router-dom';

const MyVerticallyCenteredModal = (props) => {
  const {activity : {activity_id, title}, edit} = props;
  const photos = getPhotosByActivityId(activity_id);
  const notes = getNotesByActivityId(activity_id);
  const [addPhotoButton, setAddPhotoButton] = useState(false)
  const [addNoteButton, setAddNoteButton] = useState(false)
  

  const photoArray = photos.map(({photo_id, caption, url}) => {
    return <Photo key={photo_id} url={url} caption={caption} edit={edit}/>
  })

  const noteArray = notes.map(({note_id, text}) => {
    return <Note key={note_id} text={text} edit={edit}/>
  })

  function handleAddPhoto(){
    setAddPhotoButton(true);
  }

  function handleAddNote(){
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

        {addPhotoButton ? (
          <div class="mb-3">
            <label for="formFile" class="form-label">Upload photo</label>
            <input class="form-control" type="file" id="formFile"/>
                 </div>
                ) : null}
        {addNoteButton ? (<input class="form-control" type="text" placeholder="Add a note" aria-label="default input example"/>) 
        : null}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleAddPhoto}>Add Photo</Button>
        <Button onClick={handleAddNote}>Add Note</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Activity = ({ activity }) => {
  const [modalShow, setModalShow] = useState(false);
  const {loggedInUser} = useContext(UserContext)
  const {username} = useParams()
  const editPermission = loggedInUser === username ? <MenuPopover /> : null

  return (
    <>
      <ListGroup.Item
        className={`d-flex justify-content-between align-items-center ${
          activity.completion_status && 'activity-completed'
        }`}
        onClick={() => {
          if (activity.completion_status) setModalShow(true);
        }}
      >
        <p className="m-2">{activity.title}</p>

        <div
          className="d-flex gap-1 align-items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {activity.completion_status && (
            <GrStatusGood className="react-icon m-0" size={15} />
          )}
          {editPermission}
        </div>
      </ListGroup.Item>
      <MyVerticallyCenteredModal
        edit = {editPermission}
        activity={activity}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
