import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { clsx } from "clsx";

const Header = () => {
  const location = useLocation();

  const [user, setUser] = useState<{ name: string; avatarUrl?: string } | null>(
    {
      name: "Nguyễn Văn A",
      avatarUrl: "",
    }
  );

  const handleLogout = () => {
    setUser(null);
    message.success("Đăng xuất thành công");
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
    <>
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="h-10 w-10" />
            <span className="text-xl font-semibold text-blue-600">
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

          {/* Auth or Avatar */}
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
                    src={user.avatarUrl || undefined}
                    icon={!user.avatarUrl && <UserOutlined />}
                  />
                  <span className="hidden md:block text-gray-700 font-medium">
                    {user.name}
                  </span>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
