import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { clsx } from "clsx";
import logo from "../../assets/logo.png";
import { RoleEnum } from "../../common/types";
import User from "../../common/types/user";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Load user từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    message.success("Đăng xuất thành công");
    navigate("/");
  };

  // Menu theo role
  const getRoleMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case RoleEnum.SUPER_ADMIN:
        return [
          {
            key: "admin",
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Quản trị hệ thống</Link>,
          },
        ];
      case RoleEnum.TEACHER:
        return [
          {
            key: "teacher-classes",
            icon: <BookOutlined />,
            label: <Link to="/teachers/classes">Lớp giảng dạy</Link>,
          },
        ];
      case RoleEnum.STUDENT:
        return [
          {
            key: "student-classes",
            icon: <TeamOutlined />,
            label: <Link to="/students/classes">Lớp học của tôi</Link>,
          },
        ];
      default:
        return [];
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Trang cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="change-password" icon={<LockOutlined />}>
        <Link to="/change-password">Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Divider />
      {getRoleMenuItems().map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Khoá học", path: "/courses" },
    { label: "Giới thiệu", path: "/about" },
    { label: "Liên hệ", path: "/contact" },
  ];

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 w-10" />
          <span className="text-2xl font-semibold [color:#000080]">
            CodeFarm
          </span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "text-gray-700 hover:text-blue-600 transition",
                location.pathname === item.path && "text-blue-600 font-medium"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button type="text" className="text-blue-600 hover:underline">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  type="primary"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Đăng ký
                </Button>
              </Link>
            </>
          ) : (
            <Dropdown overlay={menu} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  size="default"
                  src={
                    user.avatarUrl ||
                    "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                  }
                  icon={!user.avatarUrl && <UserOutlined />}
                />
                <span className="hidden md:block text-gray-700 font-medium">
                  {user.fullname}
                </span>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
