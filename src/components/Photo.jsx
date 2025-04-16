import { Figure } from "react-bootstrap";
import { MenuPopover } from "./MenuPopover";

export const Photo = ({ url, caption, editenabled }) => {
  editenabled = editenabled === "true" ? true : false;
  console.log(editenabled);
   return (
      <Figure className="position-relative d-inline-block">
         <Figure.Image src={url} className="rounded" />
         {editenabled && (
            <MenuPopover
               icon="edit"
               className="position-absolute top-0 end-0 m-2"
            />
         )}
         <Figure.Caption>{caption}</Figure.Caption>
      </Figure>
   );
};
