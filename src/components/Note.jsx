import { MenuPopover } from "./MenuPopover";
export const Note = ({ text, editenabled }) => {
  editenabled = editenabled === "true" ? true : false;
   return (
      <div className="d-flex gap-2 align-items-center">
         <p>{text}</p>
         {editenabled && (
            <MenuPopover
               icon="edit"
            />
         )}
      </div>
   );
};
