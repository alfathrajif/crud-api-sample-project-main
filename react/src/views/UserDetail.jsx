import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import Typography from "@mui/material/Typography";

export default function UserDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setUser(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
        {user.name}
      </Typography>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
        {user.id}
      </Typography>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
        {user.email}
      </Typography>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
        {user.created_at}
      </Typography>
    </div>
  );
}
