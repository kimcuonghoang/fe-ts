import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authRegister } from "../../common/api/authApi";

import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../common/validations/authSchema";
type FormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
};

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: FormData) => authRegister(data),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        message.success("Đăng ký thành công!");
        reset();
        navigate("/login");
      },
      onError: () => {
        message.error("Đăng ký thất bại, vui lòng thử lại.");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Tạo tài khoản mới
      </h2>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Họ và tên"
          help={errors.fullname?.message}
          validateStatus={errors.fullname ? "error" : ""}
        >
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined className="text-blue-500" />}
                placeholder="Nhập họ và tên"
                size="large"
              />
            )}
          />
        </Form.Item>

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
        <Form.Item
          label="Xác nhận mật khẩu"
          help={errors.confirmPassword?.message}
          validateStatus={errors.confirmPassword ? "error" : ""}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined className="text-blue-500" />}
                placeholder="Xác nhận mật khẩu"
                size="large"
              />
            )}
          />
        </Form.Item>

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
        Đã có tài khoản?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
