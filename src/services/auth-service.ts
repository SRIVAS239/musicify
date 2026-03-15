import { AUTH_URL } from "../utils/constants";
import { TokenResponse } from "../types/spotify";

export const getToken = async (): Promise<string | undefined> => {
  try {
    const payload = {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      client_secret: process.env.REACT_APP_CLIENT_SECRET || "",
    };

    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    const data: TokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return undefined;
  }
};
