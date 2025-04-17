import { editEnabled } from "../utils/utils";
import { MenuPopover } from "./MenuPopover";

export const Note = ({ text, userId }) => {
   return (
      <div className="d-flex gap-2 align-items-center">
         <p>{text}</p>
         {editEnabled(userId) && (
            <MenuPopover
               icon="edit"
            />
         )}
      </div>
   );
};
