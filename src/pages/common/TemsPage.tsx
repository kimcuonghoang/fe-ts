import React from "react";
import { Card } from "antd";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <Card className="max-w-3xl w-full shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Điều khoản dịch vụ
        </h1>

        <p className="text-gray-600 mb-4">
          Khi sử dụng hệ thống LMS, bạn đồng ý tuân thủ các điều khoản dịch vụ
          dưới đây. Vui lòng đọc kỹ trước khi tiếp tục.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          1. Quyền và nghĩa vụ của người dùng
        </h2>
        <p className="text-gray-600 mb-4">
          - Cung cấp thông tin chính xác khi đăng ký tài khoản. <br />
          - Bảo mật thông tin đăng nhập và không chia sẻ cho người khác. <br />-
          Không sử dụng hệ thống cho mục đích gian lận, vi phạm pháp luật.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          2. Quyền và nghĩa vụ của hệ thống LMS
        </h2>
        <p className="text-gray-600 mb-4">
          - Cung cấp dịch vụ học tập trực tuyến ổn định. <br />
          - Bảo mật dữ liệu người dùng theo Chính sách bảo mật. <br />- Có quyền
          tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện vi phạm.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          3. Nội dung khóa học và bản quyền
        </h2>
        <p className="text-gray-600 mb-4">
          - Nội dung khóa học thuộc quyền sở hữu của giảng viên hoặc hệ thống.{" "}
          <br />- Người dùng không được sao chép, phát tán hoặc sử dụng cho mục
          đích thương mại nếu chưa được phép.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Giới hạn trách nhiệm
        </h2>
        <p className="text-gray-600 mb-4">
          Hệ thống không chịu trách nhiệm cho các sự cố gián đoạn dịch vụ ngoài
          khả năng kiểm soát hợp lý (sự cố mạng, thiên tai, tấn công mạng...).
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          5. Thay đổi điều khoản
        </h2>
        <p className="text-gray-600 mb-4">
          Hệ thống LMS có quyền thay đổi, cập nhật điều khoản bất kỳ lúc nào và
          sẽ thông báo cho người dùng trên nền tảng.
        </p>

        <p className="text-gray-500 italic mt-10">
          Cập nhật lần cuối: 23/09/2025
        </p>
      </Card>
    </div>
  );
};

export default TermsPage;
