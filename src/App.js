import React from "react";
import Movies from "./movies";
import Navbar from "./navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Costumers from "./customers";
import Rentals from "./rentals";
import NotFound from "./utils/notFound";
import LoginForm from "./components/loginForm";
import Register from "./register";
import "./App.css";
import NewMovie from "./components/common/newMovie";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/movies/:id" element={<NewMovie />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/costumers" element={<Costumers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
