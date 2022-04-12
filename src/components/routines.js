import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
// import styled from "styled-components";
// import { Link } from "react-router-dom";

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    const getRoutines = async () => {
      try {
        const response = await fetch(
          "https://fitnesstrac-kr.herokuapp.com/api/routines",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const {
          data: { routines },
        } = await response.json();
        console.log(routines);
        setRoutines(routines);
      } catch (err) {
        console.error(err);
      }
    };
    getRoutines();
  }, []);

  console.log(routines);

  return (
    <div>
      {routines.map(({ id, name, goal, creatorName, activities }) => {
        return (
          <section key={id}>
            <h3>{name}</h3>
          </section>
        );
      })}

      <div>welcome to routines!</div>
    </div>
  );
}
