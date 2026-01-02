import { io } from "socket.io-client";

export const socket = io("https://estatehub.duckdns.org", {
  withCredentials: true,
  autoConnect: false,
});
