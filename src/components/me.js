import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../custom-hooks";
import jwt_decode from "jwt-decode";

const DELETE_ROUTINE = "DELETE_ROUTINE";
const SET_ROUTINES = "SET_ROUTINES";

function routinesReducer(state = [], { type, payload }) {
  switch (type) {
    case SET_ROUTINES: {
      return payload;
    }
    case DELETE_ROUTINE: {
      return state.filter((routine) => routine.id !== payload.id);
    }
    default:
      return state;
  }
}

export default function Me() {
  const { token } = useAuth();
  const [username, setUsername] = useState("");
  const [state, dispatch] = useReducer(routinesReducer, []);

  useEffect(() => {
    const fetchMyRoutines = async () => {
      try {
        const { username } = jwt_decode(token);
        setUsername(username);
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`
        );
        const routines = await response.json();
        if (response.status === 200) {
          dispatch({ type: SET_ROUTINES, payload: routines });
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchMyRoutines();
  }, [token]);

  async function handleDelete(routineId) {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        dispatch({ type: DELETE_ROUTINE, payload: data });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <h2>Welcome to your page, {username}!</h2>
      <hr />
      <div>
        {state.map((routine) => (
          <div key={routine.id}>
            <div>
              <h3>Goal</h3>
              <span>
                <Link to={`/routines/${routine.id}/edit`}>Edit Routine</Link>
              </span>
              <p>{routine.goal}</p>
            </div>
            <div>
              {routine.activities.map((activity) => {
                <aside key={activity.id}>
                  <h4>Name</h4>
                  <p>{activity.name}</p>
                  <p>{activity.description}</p>
                  <div>
                    <span>Count: {activity.count}</span>
                    <span>Duration: {activity.duration}</span>
                  </div>
                </aside>;
              })}
            </div>
            <button
              onClick={() => {
                handleDelete(routine.id);
              }}
            >
              Delete button
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
