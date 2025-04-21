import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsThreeDots } from 'react-icons/bs';
import { MenuOptions } from './MenuOptions';

export const MenuPopover = ({ className }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <MenuOptions />
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <BsThreeDots
        className={`${className} menu-popover react-icon`}
        onClick={(e) => e.stopPropagation()}
        size={20}
      />
    </OverlayTrigger>
  );
};
