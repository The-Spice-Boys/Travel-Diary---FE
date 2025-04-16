import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoMenu } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "react-bootstrap";

export const MenuPopover = ({icon, className = ""}) => {
  const lookup = {
    "menu": <IoMenu />,
    "edit": <FaEdit />,
    "dots": <BsThreeDots/>
  }
   const popover = (
      <Popover id="popover-basic">
         <Popover.Header as="h3">Popover right</Popover.Header>
         <Popover.Body>
            <input className="btn btn-primary" type="button" value="Edit" />
            <input className="btn btn-primary" type="button" value="Delete" />
         </Popover.Body>
      </Popover>
   );

   return (
      <Button className={className} onClick={(e) => e.stopPropagation()}>
         <OverlayTrigger
            trigger="click"
            placement="left"
            overlay={popover}
         >
          {lookup[icon]}
         </OverlayTrigger>
      </Button>
   );
};
