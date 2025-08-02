import React from "react";
import { Link } from "react-router-dom";
import { FacebookFilled, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-10 pb-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Mô tả */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
              <span className="text-xl font-semibold">
                Trung Tâm Học Lập Trình
              </span>
            </div>
            <p className="text-sm text-gray-300">
              Học lập trình từ cơ bản đến nâng cao với phương pháp thực chiến,
              dễ hiểu, sát thực tế.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <MailOutlined /> contact@trungtamcode.vn
              </li>
              <li className="flex items-center gap-2">
                <PhoneOutlined /> 0123 456 789
              </li>
              <li className="flex items-center gap-2">
                <FacebookFilled />{" "}
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Trung Tâm Học Lập Trình. All rights
          reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
