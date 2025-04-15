import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { IoMenu } from 'react-icons/io5';

export const MenuPopover = () => {
  

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
          <input class="btn btn-primary" type="button" value="Edit"/>
        <input class="btn btn-primary" type="button" value="Delete"/>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <IoMenu size={20} />
    </OverlayTrigger>
  );
};
