import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  CodeOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Trung Tâm Học Lập Trình Thực Chiến
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Học từ cơ bản đến nâng cao với lộ trình bài bản & giảng viên kinh
          nghiệm
        </p>
        <Link to="/courses">
          <Button size="large" className="bg-white text-blue-600 font-semibold">
            Xem các khóa học
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="p-6 shadow-md rounded-xl border">
          <CodeOutlined className="text-3xl text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            Thực hành dự án thực tế
          </h3>
          <p className="text-gray-600 text-sm">
            Học đi đôi với thực hành. Tự tay xây dựng dự án ngay trong khóa học.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-xl border">
          <ClockCircleOutlined className="text-3xl text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl mb-2">Linh hoạt thời gian</h3>
          <p className="text-gray-600 text-sm">
            Lịch học linh động, hỗ trợ học viên làm việc hoặc học sinh, sinh
            viên.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-xl border">
          <UsergroupAddOutlined className="text-3xl text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            Giảng viên hỗ trợ tận tâm
          </h3>
          <p className="text-gray-600 text-sm">
            Đội ngũ giảng viên có kinh nghiệm, hỗ trợ 1-1 khi gặp khó khăn.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng bắt đầu hành trình lập trình?
        </h2>
        <p className="text-gray-700 mb-6">
          Tham gia ngay để tạo bước đà vững chắc cho sự nghiệp công nghệ!
        </p>
        <Link to="/register">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đăng ký ngay
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
