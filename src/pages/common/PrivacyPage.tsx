import React from "react";
import { Card } from "antd";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <Card className="max-w-3xl w-full shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Chính sách bảo mật
        </h1>

        <p className="text-gray-600 mb-4">
          Hệ thống LMS cam kết bảo mật thông tin cá nhân của người dùng. Trang
          này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          1. Thông tin chúng tôi thu thập
        </h2>
        <p className="text-gray-600 mb-4">
          - Thông tin cá nhân (họ tên, email, số điện thoại). <br />
          - Thông tin học tập (khóa học, bài kiểm tra, kết quả). <br />- Dữ liệu
          kỹ thuật (địa chỉ IP, trình duyệt, thời gian đăng nhập).
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          2. Cách chúng tôi sử dụng thông tin
        </h2>
        <p className="text-gray-600 mb-4">
          - Cung cấp dịch vụ học tập trực tuyến. <br />
          - Quản lý tài khoản và hỗ trợ người dùng. <br />- Cải thiện trải
          nghiệm học tập và tính năng hệ thống.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          3. Bảo mật dữ liệu
        </h2>
        <p className="text-gray-600 mb-4">
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ
          dữ liệu cá nhân khỏi mất mát, truy cập trái phép hoặc tiết lộ.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Quyền của người dùng
        </h2>
        <p className="text-gray-600 mb-4">
          Người dùng có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá
          nhân bất kỳ lúc nào bằng cách liên hệ với quản trị viên.
        </p>

        <p className="text-gray-500 italic mt-10">
          Cập nhật lần cuối: 23/09/2025
        </p>
      </Card>
    </div>
  );
};

export default PrivacyPage;
