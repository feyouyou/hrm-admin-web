import React, { useState } from "react";
import { Layout } from "antd";
import SiderBar from "./components/SiderBar";
import ContentArea from "./components/ContentArea";
import "./App.scss";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBar collapsed={collapsed} />
      <ContentArea
        collapsed={collapsed}
        onClickCollapsedBtn={() => setCollapsed(!collapsed)}
      />
    </Layout>
  );
}
