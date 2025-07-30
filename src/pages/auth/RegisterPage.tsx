import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authRegister } from "../../common/api/authApi";

const { Title } = Typography;

type FormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await authRegister(data);
      console.log("Register with:", res);
      await new Promise((res) => setTimeout(res, 1000));
      message.success("Đăng ký thành công!");
      reset();
      nav("/login");
    } catch (err) {
      console.log(err);
      message.error("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <Title level={3} className="text-center text-blue-600 mb-6">
        Tạo tài khoản mới
      </Title>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Họ và tên</label>
          <div className="relative">
            <UserOutlined className="absolute top-3 left-3 text-blue-500" />
            <input
              {...register("fullname", { required: "Vui lòng nhập họ tên!" })}
              className="pl-10 py-2 border border-gray-300 rounded-md w-full"
              placeholder="Nguyễn Văn A"
            />
          </div>
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <div className="relative">
            <MailOutlined className="absolute top-3 left-3 text-blue-500" />
            <input
              {...register("email", {
                required: "Vui lòng nhập email!",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email không hợp lệ!",
                },
              })}
              className="pl-10 py-2 border border-gray-300 rounded-md w-full"
              placeholder="example@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Mật khẩu</label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu!",
                minLength: {
                  value: 6,
                  message: "Mật khẩu tối thiểu 6 ký tự",
                },
              })}
              className="pl-10 py-2 border border-gray-300 rounded-md w-full"
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Xác nhận mật khẩu</label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Vui lòng xác nhận mật khẩu!",
                validate: (value) =>
                  value === password || "Mật khẩu không khớp!",
              })}
              className="pl-10 py-2 border border-gray-300 rounded-md w-full"
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          htmlType="submit"
          block
          loading={loading}
          size="large"
          className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
        >
          Đăng ký
        </Button>
      </form>

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
