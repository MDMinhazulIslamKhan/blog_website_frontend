import { jwtDecode } from "jwt-decode";

export const decodedToken = (
  token: string
): {
  id: string;
} => {
  return jwtDecode(token);
};
