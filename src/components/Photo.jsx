import { Figure } from "react-bootstrap";

export const Photo = ({url, caption}) => {
  return <Figure>
    <Figure.Image src={url} />
    <Figure.Caption>{caption}</Figure.Caption>
  </Figure>
};
