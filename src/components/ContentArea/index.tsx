import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Avatar, Button, Dropdown, Layout, MenuProps, theme } from "antd";
import { StoreStateType } from "@src/store";
import IconMap from "../IconMap";
import "./index.scss";

interface ContentAreaProps {
  collapsed: boolean;
  onClickCollapsedBtn: () => void;
}

const { Header, Content } = Layout;

export default function ContentArea(ContentArea: ContentAreaProps) {
  const navigate = useNavigate();

  const userInfo = useSelector((state: StoreStateType) => state.userInfo);

  const { collapsed, onClickCollapsedBtn } = ContentArea;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          {IconMap.LogoutOut}
          &nbsp; 登出
        </div>
      ),
      onClick() {
        // 清除用户信息，退出登录
        localStorage.removeItem("userProfile");
        navigate("/login");
      },
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 30px 0 0",
          background: colorBgContainer,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? IconMap.RightMenuArrow : IconMap.LeftMenuArrow}
          onClick={onClickCollapsedBtn}
          style={{ fontSize: "16px", width: 64, height: 64 }}
        />
        <Dropdown menu={{ items }}>
          <div className="user-info-wrapper">
            {userInfo.username}&nbsp;
            <Avatar size={30} src={userInfo.avatar || undefined} />
          </div>
        </Dropdown>
      </Header>

      <Content
        style={{
          margin: "24px 16px",
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
}
