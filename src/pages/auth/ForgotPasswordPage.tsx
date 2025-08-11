import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { authForgotPassword } from "../../common/api/authApi";
import { useMutation } from "@tanstack/react-query";

const { Title, Paragraph } = Typography;

type FormData = {
  email: string;
};

const ForgotPasswordPage = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (data: FormData) => authForgotPassword(data.email),
  });
  const onFinish = async (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        message.success("Email khôi phục mật khẩu đã được gửi!");
      },
      onError: () => {
        message.error("Có lỗi xảy ra, vui lòng thử lại.");
      },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <Title level={3} className="text-center text-blue-600 mb-4">
        Quên mật khẩu?
      </Title>

      <Paragraph className="text-center text-gray-600 mb-6">
        Nhập email bạn đã đăng ký. Chúng tôi sẽ gửi liên kết để đặt lại mật
        khẩu.
      </Paragraph>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-blue-500" />}
            placeholder="your@email.com"
            size="large"
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
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-sm mt-4">
        Quay lại{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
