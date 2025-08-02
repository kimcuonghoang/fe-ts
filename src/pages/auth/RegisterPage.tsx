import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authRegister } from "../../common/api/authApi";
import { message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

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

  const navigate = useNavigate();
  const { mutate, isPending: loading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: FormData) => authRegister(data),
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const password = watch("password");

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Fullname */}
        <div>
          <label className="block font-medium mb-1">Họ và tên</label>
          <div className="relative">
            <UserOutlined className="absolute top-3 left-3 text-blue-500" />
            <input
              {...register("fullname", { required: "Vui lòng nhập họ tên!" })}
              placeholder="Nguyễn Văn A"
              className={`pl-10 py-2 border rounded-md w-full ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Email */}
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
              placeholder="example@email.com"
              className={`pl-10 py-2 border rounded-md w-full ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Mật khẩu</label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-blue-500" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu!",
                minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
              })}
              placeholder="••••••••"
              className={`pl-10 pr-10 py-2 border rounded-md w-full ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-2.5 right-3 text-blue-500"
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
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
              placeholder="••••••••"
              className={`pl-10 py-2 border rounded-md w-full ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
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
