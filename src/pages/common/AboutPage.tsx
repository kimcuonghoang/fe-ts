import React from "react";
import { Typography } from "antd";
import {
  CodeOutlined,
  TeamOutlined,
  TrophyOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Title level={2} className="text-blue-600 text-center mb-6">
          Giới thiệu về trung tâm
        </Title>

        <Paragraph className="text-gray-700 text-center max-w-3xl mx-auto mb-10">
          Chúng tôi là trung tâm đào tạo lập trình hiện đại, chuyên cung cấp các
          khóa học từ cơ bản đến nâng cao như Web, Mobile, Backend, Data, AI...
          với đội ngũ giảng viên dày dạn kinh nghiệm và lộ trình học bài bản.
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <CodeOutlined className="text-3xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Chương trình thực chiến
            </h3>
            <p className="text-gray-600 text-sm">
              Học qua dự án thực tế giúp bạn dễ xin việc và giỏi kỹ năng code.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <TeamOutlined className="text-3xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cộng đồng hỗ trợ</h3>
            <p className="text-gray-600 text-sm">
              Cộng đồng học viên đông đảo, mentor sẵn sàng hỗ trợ 24/7.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <LaptopOutlined className="text-3xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Học online & offline</h3>
            <p className="text-gray-600 text-sm">
              Bạn có thể học tại trung tâm hoặc học online qua nền tảng riêng.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <TrophyOutlined className="text-3xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cam kết đầu ra</h3>
            <p className="text-gray-600 text-sm">
              Học viên được hỗ trợ giới thiệu việc làm sau khi hoàn thành khoá
              học.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
