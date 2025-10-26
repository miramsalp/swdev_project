// https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../features/auth.js";

export function useUser() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const fetchUser = async () => {
      try {
        const userData = await getMe(token);
        setUser(userData.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  return user;
}
