import { Figure } from "react-bootstrap";
import { MenuPopover } from "./MenuPopover";
import { editEnabled } from "../utils/utils";

export const Photo = ({ url, caption, userId }) => {
   return (
      <Figure className="position-relative d-inline-block">
         <Figure.Image src={url} className="rounded" />
         {editEnabled(userId) && (
            <MenuPopover
               icon="edit"
               className="position-absolute top-0 end-0 m-2"
            />
         )}
         <Figure.Caption>{caption}</Figure.Caption>
      </Figure>
   );
};
