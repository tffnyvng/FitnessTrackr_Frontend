import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
// import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const { token, isLoggedIn } = useAuth();
  const username = useParams();
  //MAYBE, ill be able to implement this part into the normal routines(?) with slice.
  useEffect(() => {
    const getRoutines = async () => {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/users/:${username}/routines`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        const routines = await response.json();
        // console.log(routines);
        setRoutines(routines);
      } catch (err) {
        console.error(err);
      }
    };

    getRoutines();
  }, []);

  // console.log({ routines });

  return (
    <div>
      {routines.map(({ id, name, creatorName, goal, activities }) => {
        return (
          <section key={id}>
            <h1>{name}</h1>
            <h4>{creatorName}</h4>
            <div>{goal}</div>
            {activities.map(({ count, description, duration, name, id }) => {
              return (
                <div key={id}>
                  <h3>{name}</h3>
                  <h4>
                    COUNT:{count}, DURATION:{duration}
                  </h4>
                  <div>{description}</div>
                </div>
              );
            })}
          </section>
        );
      })}

      <div>welcome to routines!</div>
    </div>
  );
}
