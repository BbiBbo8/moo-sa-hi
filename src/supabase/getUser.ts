import React from "react";
import { supabase } from "./client";

const getUser = async () => {
  const { data: users, error } = await supabase.from("users").select("*");

  return users;
};

export default getUser;
