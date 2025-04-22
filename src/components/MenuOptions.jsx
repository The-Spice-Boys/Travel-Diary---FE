import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { deleteActivity, deleteItinerary, deletePhoto } from '../api';

export const MenuOptions = ({
  id,
  componentName,
  setDeletedIds,
  setErrorId,
}) => {
  const apiFuncLookupDelete = {
    activity: deleteActivity,
    itinerary: deleteItinerary,
    photo: deletePhoto,
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
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
    <div className="m-2">
      <FaEdit size={20} onClick={handleEditClick} className="menu-options" />
      <MdDelete
        size={20}
        onClick={handleDeleteClick}
        className="menu-options"
      />
    </div>
  );
};
