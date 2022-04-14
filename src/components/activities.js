import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await fetch(
          "http://fitnesstrac-kr.herokuapp.com/api/activities",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        const activities = await response.json();
        // console.log(activities);
        setActivities(activities);
      } catch (err) {
        console.error(err);
      }
    };

    getActivities();
  }, []);

  return (
    <div>
      <div>
        {activities.map(({ id, name, description }) => {
          return (
            <section key={id}>
              <h1>{name}</h1>
              <div>{description}</div>
            </section>
          );
        })}
      </div>
      <div> hi im activities </div>
    </div>
  );
}
