import React, { useState, useEffect } from "react";
import { getGenres } from "../../services/fakeGenreService";
import { useNavigate } from "react-router-dom";
import { saveMovie, getMovie } from "../../services/fakeMovieService";
import Form from "./form";
import DropDown from "./dropDown";
import Joi from "joi";
import Input from "./input";

const NewMovie = () => {
  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  useEffect(() => {
    const genres = getGenres();
    setGenres(genres);
  }, []);

  const Navigate = useNavigate();

  const schema = Joi.object({
    _id: Joi.string(),
    genreId: Joi.string().required().label("Genre"),
    title: Joi.string().min(5).max(100).required().label("Title"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in stock"),
  });

  const validateProperty = ({ name, value }) => {
    const propertyToValidate = { [name]: value };
    const schemaOfProperty = Joi.object({ [name]: schema.extract(name) });
    const { error } = schemaOfProperty.validate(propertyToValidate);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    error.details.forEach((item) => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    console.log(errors);

    // if (errors)
  };

  const doSubmit = () => {
    Navigate("/movies");
    console.log("submitted");
  };

  const handleChange = ({ currentTarget: input }) => {
    console.log(input.name);

    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
    // setErrors(newErrors);
  };

  return (
    <main className="container">
      <form onSubmit={handleSubmit}>
        <h2>Movie Form</h2>
        <Input
          type="text"
          name="title"
          label="Name of movie"
          value={data.title}
          onChange={handleChange}
          placeholder="Title"
          error={errors.title}
        />

        <Input
          type="text"
          name="numberInStock"
          label="Number In Stock"
          value={data.numberInStock}
          onChange={handleChange}
          placeholder="Number in stock"
          error={errors.numberInStock}
        />

        <DropDown
          name="genreId"
          value={data.genreId}
          label="Genre"
          options={genres}
          onChange={handleChange}
          error={errors.genreId}
        />

        <Input
          type="text"
          name="dailyRentalRate"
          label="Daily Rental Rate"
          value={data.dailyRentalRate}
          onChange={handleChange}
          placeholder="Rate"
          error={errors.dailyRentalRate}
        />

        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </main>
  );
};

export default NewMovie;
