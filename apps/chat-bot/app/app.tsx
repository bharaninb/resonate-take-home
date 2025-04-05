// Uncomment this line to use CSS modules

import { Chat } from "./chat";
import { AxiosConfig } from "./config/axios";

export function App() {
  return (
    <div>
      <AxiosConfig />
      <Chat />
    </div>
  );
}

export default App;
