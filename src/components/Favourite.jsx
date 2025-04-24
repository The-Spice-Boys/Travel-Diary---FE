import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { Itinerary } from "./Itinerary.jsx";
import { MenuOptions } from "./MenuOptions.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User.jsx";
import { IoMdHeart } from "react-icons/io";

export const Favourite = ({ itineraryId, favourites }) => {
    const { loggedInUser } = useContext(UserContext);
    const returnColour = (fave) => (fave ? "heart-fav" : "heart-unfav");
    const [isFavourited, setIsFavourited] = useState(false);
    const [colour, setColour] = useState("heart-unfav");
    const [favouriteId, setFavouriteId] = useState(null);
 
    useEffect(() => {
       const faveMatch =
          favourites.find((fave) => {
             const isFave = fave.itinerary.itineraryId === itineraryId;
             return isFave;
          }) ?? null;
 
       const newFaveState = faveMatch === null ? false : true;
       setIsFavourited(newFaveState);
       setColour(returnColour(newFaveState));
       setFavouriteId(newFaveState ? faveMatch.favouriteId : null);
    }, [favourites]);
 
    const handleFavourite = () => {
       const newFaveState = !isFavourited;
       setColour(returnColour(newFaveState));
       setIsFavourited(newFaveState);
 
       if (newFaveState) {
          postFavourite({ userId: loggedInUser.userId, itineraryId })
             .then(({ favouriteId }) => {
                setFavouriteId(favouriteId);
             })
             .catch((err) => {
                setColour("heart-unfav");
                setIsFavourited(false);
             });
       } else {
          deleteFavourite(favouriteId).catch((err) => {
             setColour("heart-fav");
             setIsFavourited(true);
          });
       }
    };
 
    return (
       <IoMdHeart
          className={`heart ${colour} m-2`}
          onClick={(e) => {
             e.stopPropagation();
             handleFavourite();
          }}
          size={25}
       />
    );
 };