import { Outlet } from "react-router-dom";
import { Typography } from "antd";
import { CheckCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import Header from "../common/Header";
import Footer from "../common/Footer";

const { Title, Paragraph } = Typography;

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel - Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-white text-gray-800 p-10 ">
          <div className="max-w-md">
            <img
              src="/logo.png" // chỉnh sửa lại logo nếu cần
              alt="Logo"
              className="w-20 h-20 mb-6"
            />
            <Title level={2} className="!text-blue-600">
              Programming Center
            </Title>
            <Paragraph className="text-base">
              Nơi đào tạo lập trình thực chiến từ cơ bản đến nâng cao, với đội
              ngũ giảng viên dày dạn kinh nghiệm và chương trình học bám sát nhu
              cầu tuyển dụng.
            </Paragraph>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircleOutlined className=" text-blue-500 text-lg mt-1" />
                <span>Khoá học Frontend, Backend, Fullstack thực chiến</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircleOutlined className="text-blue-500 text-lg mt-1" />
                <span>Cam kết hỗ trợ việc làm sau khi tốt nghiệp</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircleOutlined className="text-blue-500 text-lg mt-1" />
                <span>Mentor đồng hành 1:1 trong suốt quá trình học</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircleOutlined className="text-blue-500 text-lg mt-1" />
                <span>Học offline tại trung tâm hoặc online linh hoạt</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-blue-600 font-medium">
              <PhoneOutlined />
              <span>Hotline tư vấn: 0909.123.456</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Form Content */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
