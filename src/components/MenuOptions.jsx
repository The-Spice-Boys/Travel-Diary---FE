import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TitleUpdateForm } from './TitleUpdateForm';
import {
  deleteActivity,
  deleteItinerary,
  deletePhoto,
  patchActivity,
  patchItinerary,
} from '../api';

export const MenuOptions = ({
  id,
  componentName,
  setDeletedIds,
  setErrorId,
  setTitle,
  title,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const apiFuncLookupDelete = {
    activity: deleteActivity,
    itinerary: deleteItinerary,
    photo: deletePhoto,
  };

  const apiFuncLookupEdit = {
    activity: patchActivity,
    itinerary: patchItinerary,
  };

  const modalInfoLookup = {
    itinerary: {
      modalTitle: 'Update itinerary title',
      modalLabel: 'New itinerary title:',
    },
    activity: {
      modalTitle: 'Update activity title',
      modalLabel: 'New activity title:',
    },
  };

  const handleEditClick = (e) => {
    e.stopPropagation();

    setModalShow(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();

    setDeletedIds((prevDeletedIds) => {
      return [...prevDeletedIds, id];
    });
    apiFuncLookupDelete[componentName](id).catch((err) => {
      setDeletedIds((prevDeletedIds) => {
        prevDeletedIds.pop();
        return [...prevDeletedIds];
      });
      setErrorId(id);
      setTimeout(() => setErrorId(null), 2000);
    });
  };

  return (
    <>
      <div className="m-2">
        <FaEdit size={20} onClick={handleEditClick} className="icon-color" />
        <MdDelete
          className="icon-color"
          size={20}
          onClick={handleDeleteClick}
        />
      </div>
      {modalShow && (
        <TitleUpdateForm
          className="icon-color"
          show={modalShow}
          onHide={() => setModalShow(false)}
          modalInfo={modalInfoLookup[componentName]}
          apiFunction={apiFuncLookupEdit[componentName]}
          elementId={id}
          setTitle={setTitle}
          title={title}
        />
      )}
    </>
  );
};
