import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../../common/api/authApi";
import { useMutation } from "@tanstack/react-query";
import {
  setAccessToken,
  setRefreshToken,
} from "../../common/utils/localStrorage";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../common/validations/authSchema";

const { Title } = Typography;

const LoginPage = () => {
  const nav = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: any) => authLogin(values),
  });
  const onFinish = async (values: any) => {
    mutate(values, {
      onSuccess: (res) => {
        const { user, accessToken, refreshToken } = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        message.success("Đăng nhập thành công!");
        nav("/");
      },
      onError: (err) => {
        console.error("Login error:", err);
        message.error("Đăng nhập thất bại. Vui lòng thử lại!");
      },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <Title level={3} className="text-center text-blue-600 mb-6">
        Đăng nhập tài khoản
      </Title>

      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          label="Email"
          help={errors.email?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined className="text-blue-500" />}
                placeholder="example@email.com"
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          help={errors.password?.message}
          validateStatus={errors.password ? "error" : ""}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined className="text-blue-500" />}
                placeholder="••••••••"
                size="large"
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-end mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-sm mt-4">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
