import { Rule } from "antd/es/form";

type LoginField = "account" | "password";

export const loginValidate: Record<LoginField, Rule[]> = {
  account: [
    { required: true, message: "用户名不能为空" },
    { max: 16, message: "用户名过长" },
    { min: 4, message: "用户名过短" },
  ],
  password: [
    { required: true, message: "密码不能为空" },
    { max: 16, message: "密码过长" },
    { min: 4, message: "密码过短" },
  ],
};
