"use client";

import { useEffect, useState } from "react";

const SectionRow = ({ title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/section/${encodeURIComponent(
        title
      )}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, [title]);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold p-3">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto px-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="min-w-[180px]"
          >
            <img
              src={`http://localhost:5000/popular/${movie.image}`}
              alt={movie.name}
              className="w-full h-[260px] rounded-lg object-cover"
            />

            <p className="mt-2 text-center">
              {movie.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionRow;