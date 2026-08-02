import React from "react";
import { Result } from "antd";
import "./index.scss";

const App: React.FC = () => {
  return (
    <div className="not-found-container">
      <Result status="404" title="404" subTitle="找不到页面" />
    </div>
  );
};

export default App;
