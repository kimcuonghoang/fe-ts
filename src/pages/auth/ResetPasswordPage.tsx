import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { authResetPassword } from "../../common/api/authApi";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const { resetToken } = useParams(); // giả sử reset link có `/reset-password/:token`

  const onSubmit = async (data: FormData) => {
    try {
      await authResetPassword(resetToken!, data.password);

      message.success("Đặt lại mật khẩu thành công!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      message.error("Không thể đặt lại mật khẩu. Hãy thử lại.");
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Đặt lại mật khẩu
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block font-medium mb-1">Mật khẩu mới</label>
            <div className="relative">
              <LockOutlined className="absolute top-3 left-3 text-blue-500" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu mới!",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu tối thiểu 6 ký tự",
                  },
                })}
                placeholder="••••••••"
                className={`pl-10 pr-10 py-2 border rounded-md w-full ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2.5 text-blue-500"
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

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-md"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
