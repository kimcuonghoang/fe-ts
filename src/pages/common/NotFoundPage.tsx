import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Icon minh họa */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 flex items-center justify-center">
        <BookOpen className="w-20 h-20 text-indigo-600" strokeWidth={1.5} />
      </div>

      {/* Tiêu đề */}
      <h1 className="text-6xl font-extrabold text-indigo-700 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Ôi! Trang này không tồn tại
      </h2>

      {/* Mô tả */}
      <p className="text-gray-600 text-center max-w-md mb-8">
        Có thể bạn đã nhập sai địa chỉ hoặc trang đã bị xóa khỏi hệ thống học
        tập. Hãy quay lại để tiếp tục hành trình tri thức nhé.
      </p>

      {/* Nút hành động */}
      <Button
        type="primary"
        size="large"
        className="!bg-indigo-600 hover:!bg-indigo-700 rounded-xl shadow-md px-6 py-2 font-medium"
        onClick={() => navigate("/")}
      >
        Quay về Trang chủ
      </Button>
    </div>
  );
};

export default NotFoundPage;
