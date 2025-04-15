import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Photo} from "./Photo";
import {Note} from "./Note";
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MenuPopover } from './MenuPopover';
import { GrStatusGood } from 'react-icons/gr';
import { getNotesByActivityId, getPhotosByActivityId } from '../api';

const MyVerticallyCenteredModal = (props) => {
  const {activity : {activity_id, title}} = props;
  const photos = getPhotosByActivityId(activity_id);
  const notes = getNotesByActivityId(activity_id);

  const photoArray = photos.map(({photo_id, caption, url}) => {
    return <Photo key={photo_id} url={url} caption={caption}/>
  })

  const noteArray = notes.map(({note_id, text}) => {
    return <Note key={note_id} text={text}/>
  })

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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Activity = ({ activity }) => {
  const [modalShow, setModalShow] = useState(false);

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
          <MenuPopover />
        </div>
      </ListGroup.Item>
      <MyVerticallyCenteredModal
        activity={activity}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
