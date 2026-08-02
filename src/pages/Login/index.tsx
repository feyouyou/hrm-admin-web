import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, notification } from "antd";
import { loginValidate } from "@common/validate";
import { DispatchType, StoreStateType } from "@src/store";
import { login, setUserInfo } from "@src/store/slices/userInfo";
import { GetPermissionList } from "@src/api/apis";
import IconMap from "@src/components/IconMap";
import "./index.scss";

const FormItem = Form.Item;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form] = Form.useForm();

  const userInfo = useSelector((state: StoreStateType) => state.userInfo);

  const dispatch = useDispatch<DispatchType>();

  const handleSubmitUserInfo = async (values: any) => {
    try {
      const loginResp = await dispatch(login(values)).unwrap();
      // 这里手动执行一下loading，方式拿到了用户信息后就停止loading，因为权限列表请求也需要继续loading
      dispatch(setUserInfo({ isLoading: true }));
      const permissionListResp = await GetPermissionList(
        loginResp.identity || 0,
      );
      dispatch(setUserInfo({ isLoading: false }));
      localStorage.setItem("userProfile", JSON.stringify(loginResp));
      localStorage.setItem(
        "permissionsList",
        JSON.stringify(permissionListResp.permissionList),
      );
      message.success(loginResp.username + "登录成功");
      backToFromPath();
    } catch (err: any) {
      message.error(err?.message || "登录失败，请重试");
    }
  };

  // 登录成功后回跳
  const backToFromPath = () => {
    const backPath = location.state?.from?.pathname || "/dashboard";
    navigate(backPath);
  };

  useEffect(() => {
    notification.info({
      title: "测试账号",
      description: (
        <div>
          <div>管理员账号：admin，密码：123123</div>
          <div>员工账号：xiaoming，密码：123123</div>
        </div>
      ),
      duration: 1,
    });
  }, []);

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="title">人事管理系统</div>
        <Form
          form={form}
          onFinish={handleSubmitUserInfo}
          initialValues={{
            account: "admin",
            password: "123123",
          }}
        >
          <FormItem name="account" rules={loginValidate.account}>
            <Input
              placeholder="请输入用户名"
              prefix={IconMap.UserIcon}
              allowClear
            />
          </FormItem>

          <FormItem name="password" rules={loginValidate.password}>
            <Input
              placeholder="请输入密码"
              prefix={IconMap.LockIcon}
              type="password"
              allowClear
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
