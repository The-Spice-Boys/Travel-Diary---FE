import { Figure } from "react-bootstrap";

export const Photo = ({url, caption, edit}) => {

  return <Figure>
    <Figure.Image src={url} />
    {edit}
    <Figure.Caption>{caption}</Figure.Caption>
  </Figure>
};
