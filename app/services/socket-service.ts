import { Socket } from "phoenix";
import Cookies from "js-cookie";
let socket: Socket | null = null;

export function initSocket() {
  if (!socket) {
    const token = Cookies.get("access_token");
    console.log(
      "Initializing socket with token:",
      token ? "present" : "missing",
    );

    socket = new Socket("ws://localhost:4000/socket", { params: { token } });

    socket.onOpen(() => console.log("Socket connected"));
    socket.onError((error) => console.error("Socket error:", error));
    socket.onClose(() => console.log("Socket disconnected"));

    socket.connect();
  }
  return socket;
}

export function joinChannel(topic: string, onMessage: (msg: _TSFixMe) => void) {
  if (!socket)
    throw new Error("Socket not initialized. Call initSocket first.");

  return new Promise((resolve, reject) => {
    const channel = socket?.channel(topic, {});

    channel
      ?.join()
      .receive("ok", () => {
        console.log(`Joined channel ${topic}`);
        channel.on("new_message", (payload) => onMessage(payload));
        resolve(channel);
      })
      .receive("error", (err) => reject(err));
  });
}
