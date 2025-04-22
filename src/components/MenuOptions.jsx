import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteItinerary } from "../api";

export const MenuOptions = ({
  id,
  componentName,
  setIsDeleted,
  setDeletedIds,
}) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();

    if (componentName === "itinerary") {
      console.log(id);
      setIsDeleted(true);
      setDeletedIds((prevDeletedIds) => {
        return [...prevDeletedIds, id];
      });
      deleteItinerary(id)
        .then(() => setIsDeleted(true))
        .catch((err) => console.log(err));
    } else if (componentName === "activity") {
    } else {
    }
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
