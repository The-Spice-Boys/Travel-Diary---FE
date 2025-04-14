import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MenuPopover } from './MenuPopover';
import { GrStatusGood } from 'react-icons/gr';

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.itineraryactivity.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Activity = ({ itineraryActivity }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <ListGroup.Item
        className={`d-flex justify-content-between align-items-center ${
          itineraryActivity.completion_status && 'activity-completed'
        }`}
        onClick={() => {
          if (itineraryActivity.completion_status) setModalShow(true);
        }}
      >
        <p className="m-2">{itineraryActivity.title}</p>

        <div
          className="d-flex gap-1 align-items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {itineraryActivity.completion_status && (
            <GrStatusGood className="react-icon m-0" size={15} />
          )}
          <MenuPopover />
        </div>
      </ListGroup.Item>
      <MyVerticallyCenteredModal
        itineraryactivity={itineraryActivity}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
