import { Link } from "react-router-dom";
import {
  FacebookFilled,
  MailOutlined,
  PhoneOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#000080] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="Logo" className="w-20 h-20" />
            <span className="text-xl font-bold">CodeFarm</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Trung tâm đào tạo lập trình thực chiến, giúp bạn từ con số 0 đến khi
            làm việc thực tế tại doanh nghiệp.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
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

        <div>
          <h3 className="text-lg font-semibold mb-4">Khóa học phổ biến</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/courses/react" className="hover:text-white">
                ReactJS Cơ Bản
              </Link>
            </li>
            <li>
              <Link to="/courses/nodejs" className="hover:text-white">
                NodeJS Backend
              </Link>
            </li>
            <li>
              <Link to="/courses/fullstack" className="hover:text-white">
                Fullstack MERN
              </Link>
            </li>
            <li>
              <Link to="/courses/devops" className="hover:text-white">
                DevOps Căn Bản
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <MailOutlined /> contact@codefarm.vn
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
            <li className="flex items-center gap-2">
              <YoutubeFilled />{" "}
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} CodeFarm. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
