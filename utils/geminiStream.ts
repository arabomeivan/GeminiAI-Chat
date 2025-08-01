export const createGeminiWebSocket = (
  onMessage: (text: string) => void,
  onOpen?: () => void,
  onClose?: () => void,
): WebSocket => {
  const ws = new WebSocket("wss://your-gemini-backend.com/ws");

  ws.onopen = () => {
    console.log("WebSocket connected");
    onOpen?.();
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "response" && data.chunk) {
      onMessage(data.chunk); // streamed chunk from Gemini
    }
  };

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
    onClose?.();
  };

  return ws;
};
