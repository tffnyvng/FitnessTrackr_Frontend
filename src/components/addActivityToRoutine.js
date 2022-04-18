import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function AddActivityToRoutine() {
  let { _id } = useParams();
  const { token, isLoggedIn } = useAuth();
  const [form, setForm] = useState({ activityId: 0, count: 0, duration: 0 });

  useEffect(() => {
    const addActivity = async () => {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/routines/${_id}/activities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );

        const data = await response.json();
        console.log({ data });
      } catch (err) {
        console.error(err);
      }
    };

    addActivity();
  }, []);

  return <div>hi im adding activity to routine </div>;
}
