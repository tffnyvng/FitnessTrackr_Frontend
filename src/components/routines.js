import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [username, setUsername] = useState("");

  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    const getRoutines = async () => {
      try {
        const { username } = jwt_decode(token);
        setUsername(username);

        const response = await fetch(
          "https://fitnesstrac-kr.herokuapp.com/api/routines",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const routines = await response.json();

        setRoutines(routines);
      } catch (err) {
        console.error(err);
      }
    };

    getRoutines();
  }, []);

  return (
    <div>
      <Link to={`/routines/new`}>Add a New Routine</Link>
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
                    COUNT: {count}, DURATION: {duration}
                  </h4>
                  <div>{description}</div>
                </div>
              );
            })}
            {isLoggedIn && username === creatorName && (
              <Link to={`/routines/${id}/edit`}>Edit Routine</Link>
            )}
          </section>
        );
      })}

      <div>welcome to routines!</div>
    </div>
  );
}
