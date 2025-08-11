import { Controller, useForm } from "react-hook-form";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { authResetPassword } from "../../common/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../common/validations/authSchema";
import { useMutation } from "@tanstack/react-query";

type FormData = {
  confirmPassword: string;
  resetToken: string;
  newPassword: string;
};

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetToken: resetToken,
    },
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (data: FormData) =>
      authResetPassword(resetToken!, data.newPassword),
  });
  const onSubmit = async (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        message.success("Đặt lại mật khẩu thành công!");
        navigate("/login");
      },
      onError: () => {
        message.error("Không thể đặt lại mật khẩu. Hãy thử lại.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Đặt lại mật khẩu
        </h2>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Mật khẩu"
            help={errors.newPassword?.message}
            validateStatus={errors.newPassword ? "error" : ""}
          >
            <Controller
              name="newPassword"
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
      </div>
    </div>
  );
};

export default ResetPasswordPage;
