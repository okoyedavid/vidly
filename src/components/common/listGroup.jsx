import { values } from "lodash";
import React from "react";

const ListGroup = ({
  genres,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedGenre,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => onItemSelect(genre)}
          key={genre[valueProperty]}
          className={
            selectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
