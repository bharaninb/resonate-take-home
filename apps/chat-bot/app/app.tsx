// Uncomment this line to use CSS modules

import { Col, Row } from "antd";
import { Chat } from "./chat";
import { AxiosConfig } from "./config/axios";

export function App() {
  return (
    <div>
      <AxiosConfig />
      <Row>
        <Col span={12} offset={6}>
          <h1 style={{ textAlign: "center" }}>Dental Chat Bot</h1>
        <Chat />
        </Col>
      </Row>
      
    </div>
  );
}

export default App;
