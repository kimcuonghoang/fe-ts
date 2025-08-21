import React from "react";
import { Button, Card, Rate } from "antd";
import { Link } from "react-router-dom";
import {
  CodeOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  LaptopOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-[#000080] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Trung Tâm Học Lập Trình Thực Chiến
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Học từ cơ bản đến nâng cao với lộ trình bài bản & giảng viên kinh
          nghiệm
        </p>
        <Link to="/courses">
          <Button
            size="large"
            className="bg-white text-[#000080] font-semibold hover:opacity-90"
          >
            Xem các khóa học
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="p-6 shadow-md rounded-xl border hover:shadow-lg transition">
          <CodeOutlined className="text-3xl text-[#000080] mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            Thực hành dự án thực tế
          </h3>
          <p className="text-gray-600 text-sm">
            Học đi đôi với thực hành. Tự tay xây dựng dự án ngay trong khóa học.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-xl border hover:shadow-lg transition">
          <ClockCircleOutlined className="text-3xl text-[#000080] mb-4" />
          <h3 className="font-semibold text-xl mb-2">Linh hoạt thời gian</h3>
          <p className="text-gray-600 text-sm">
            Lịch học linh động, phù hợp cho cả học sinh – sinh viên và người đi
            làm.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-xl border hover:shadow-lg transition">
          <UsergroupAddOutlined className="text-3xl text-[#000080] mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            Giảng viên hỗ trợ tận tâm
          </h3>
          <p className="text-gray-600 text-sm">
            Đội ngũ giảng viên có kinh nghiệm, hỗ trợ 1-1 khi gặp khó khăn.
          </p>
        </div>
      </section>

      {/* About Center */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#000080] mb-6">
          Về Trung Tâm CodeFarm
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-6">
          CodeFarm được thành lập với sứ mệnh đào tạo thế hệ lập trình viên mới,
          không chỉ vững vàng về kiến thức mà còn làm chủ được kỹ năng thực tế.
          Chúng tôi kết hợp lý thuyết và thực hành trong từng buổi học để học
          viên có thể áp dụng ngay.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-md rounded-xl border">
            <LaptopOutlined className="text-3xl text-[#000080] mb-4" />
            <h4 className="font-semibold text-lg mb-2">
              Cơ sở vật chất hiện đại
            </h4>
            <p className="text-gray-600 text-sm">
              Phòng học trang bị đầy đủ máy tính, internet tốc độ cao và môi
              trường thoải mái.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl border">
            <TrophyOutlined className="text-3xl text-[#000080] mb-4" />
            <h4 className="font-semibold text-lg mb-2">Chứng chỉ uy tín</h4>
            <p className="text-gray-600 text-sm">
              Sau khi hoàn thành, học viên được cấp chứng chỉ xác nhận từ trung
              tâm.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl border">
            <TeamOutlined className="text-3xl text-[#000080] mb-4" />
            <h4 className="font-semibold text-lg mb-2">Cộng đồng học viên</h4>
            <p className="text-gray-600 text-sm">
              Tham gia cộng đồng học viên – nơi chia sẻ kinh nghiệm và cơ hội
              việc làm.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#000080] mb-8">
          Khóa học nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Khóa học ReactJS" bordered={true}>
            <p>Xây dựng ứng dụng web hiện đại với ReactJS & TypeScript.</p>
            <Button type="primary" className="bg-[#000080] mt-4">
              Xem chi tiết
            </Button>
          </Card>
          <Card title="NodeJS Backend" bordered={true}>
            <p>Phát triển API & hệ thống backend mạnh mẽ với NodeJS.</p>
            <Button type="primary" className="bg-[#000080] mt-4">
              Xem chi tiết
            </Button>
          </Card>
          <Card title="Fullstack MERN" bordered={true}>
            <p>Học toàn diện từ frontend đến backend theo mô hình thực tế.</p>
            <Button type="primary" className="bg-[#000080] mt-4">
              Xem chi tiết
            </Button>
          </Card>
        </div>
      </section>

      {/* Feedback */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-[#000080] text-center mb-10">
          Học viên nói gì về chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-4 shadow">
            <p className="italic text-gray-700 mb-4">
              “Khoá học rất thực tế, giúp mình tự tin apply vào công ty đầu
              tiên.”
            </p>
            <Rate disabled defaultValue={5} />
            <p className="mt-2 font-semibold">Nguyễn Văn A</p>
          </Card>
          <Card className="p-4 shadow">
            <p className="italic text-gray-700 mb-4">
              “Giảng viên nhiệt tình, giải thích dễ hiểu, hỗ trợ ngay khi cần.”
            </p>
            <Rate disabled defaultValue={5} />
            <p className="mt-2 font-semibold">Trần Thị B</p>
          </Card>
          <Card className="p-4 shadow">
            <p className="italic text-gray-700 mb-4">
              “Mình thích nhất là phần làm dự án, giống như đi làm thật vậy.”
            </p>
            <Rate disabled defaultValue={5} />
            <p className="mt-2 font-semibold">Lê Văn C</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#000080] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng bắt đầu hành trình lập trình?
        </h2>
        <p className="mb-6">
          Tham gia ngay để tạo bước đà vững chắc cho sự nghiệp công nghệ!
        </p>
        <Link to="/register">
          <Button
            type="primary"
            size="large"
            className="bg-white text-[#000080] hover:opacity-90"
          >
            Đăng ký ngay
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
