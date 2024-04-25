import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/movies");
  };
  return (
    <div>
      <h1>Movie form {id}</h1>;
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
