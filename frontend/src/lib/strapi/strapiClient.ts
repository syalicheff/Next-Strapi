import axios from "axios";
import { User } from "next-auth";

const STRAPI_URL = process.env.STRAPI_URL;

export async function strapiClient({ user }: { user: User }) {
  const jwt = user?.jwt || null;
  return axios.create({
    baseURL: STRAPI_URL + "/api",
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
  });
}
