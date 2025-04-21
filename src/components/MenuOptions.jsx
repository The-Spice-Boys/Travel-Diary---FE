import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const MenuOptions = () => {
  const handleEditClick = (e) => {
    e.stopPropagation();
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();
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
