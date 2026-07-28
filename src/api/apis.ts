import request from ".";

export const Login = async (account: string, password: string) => {
  const resp = await request({
    method: "POST",
    url: "/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      account,
      password,
    },
  });
  return resp;
};
