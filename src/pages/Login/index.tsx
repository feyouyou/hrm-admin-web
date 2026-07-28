import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginValidate } from "@common/validate";
import { DispatchType, StoreStateType } from "@src/store";
import { fetchUserInfo } from "@src/store/slices/userInfo";
import IconMap from "@src/components/IconMap";
import "./index.scss";

const FormItem = Form.Item;

export default function Login() {
  const [form] = Form.useForm();

  const userInfo = useSelector((state: StoreStateType) => state.userInfo);

  const dispatch = useDispatch<DispatchType>();

  const handleSubmitUserInfo = (values: any) => {
    dispatch(fetchUserInfo(values));
  };

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="title">人事管理系统</div>
        <Form
          form={form}
          onFinish={handleSubmitUserInfo}
          initialValues={{
            account: "admin",
            password: "1234qwer",
          }}
        >
          <FormItem name="account" rules={loginValidate.account}>
            <Input placeholder="请输入用户名" prefix={IconMap.UserIcon} />
          </FormItem>

          <FormItem name="password" rules={loginValidate.password}>
            <Input
              placeholder="请输入密码"
              prefix={IconMap.LockIcon}
              type="password"
            />
          </FormItem>

          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={userInfo.isLoading}
          >
            {userInfo.isLoading ? "登录中..." : "登录"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
