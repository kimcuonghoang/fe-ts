import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ContactPage = () => {
  const onFinish = (values: any) => {
    console.log("Thông tin liên hệ:", values);
    message.success("Gửi liên hệ thành công!");
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <Title level={2} className="text-blue-600 text-center mb-6">
          Liên hệ với chúng tôi
        </Title>
        <Paragraph className="text-center text-gray-600 mb-12">
          Hãy để lại lời nhắn nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ.
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Thông tin */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <EnvironmentOutlined className="text-blue-500 text-xl" />
              <span>123 Đường ABC, Quận 1, TP. HCM</span>
            </div>
            <div className="flex items-center gap-3">
              <MailOutlined className="text-blue-500 text-xl" />
              <span>contact@trungtamcode.vn</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneOutlined className="text-blue-500 text-xl" />
              <span>0123 456 789</span>
            </div>
          </div>

          {/* Form liên hệ */}
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="fullname"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Nguyễn Văn A"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="example@email.com"
              />
            </Form.Item>

            <Form.Item
              name="message"
              label="Nội dung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <Input.TextArea rows={5} placeholder="Tôi muốn hỏi về..." />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                Gửi liên hệ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
