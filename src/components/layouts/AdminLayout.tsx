import { Layout, theme } from "antd";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import HeaderBar from "../common/HeaderBar";
import ContentWrapper from "../common/ContentWrapper";
import {
  UserOutlined,
  BookOutlined,
  ApartmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SiderMenu from "../common/SideBarMenu";
import BreadcrumbNav from "../common/BreadcrumNav";

const adminMenu = [
  {
    key: "/admin/users",
    icon: <TeamOutlined />,
    label: <Link to="/admin/users">Quản lý người dùng</Link>,
  },
  {
    key: "/admin/majors",
    icon: <ApartmentOutlined />,
    label: <Link to="/admin/majors">Quản lý chuyên ngành</Link>,
  },
  {
    key: "/admin/subjects",
    icon: <BookOutlined />,
    label: <Link to="/admin/subjects">Quản lý môn học</Link>,
  },
  {
    key: "/admin/classes",
    icon: <UserOutlined />,
    label: <Link to="/admin/classes">Quản lý lớp học</Link>,
  },
];

const getBreadcrumb = (pathname: string) => {
  const map: Record<string, string> = {
    "/admin/users": "Người dùng",
    "/admin/majors": "Chuyên ngành",
    "/admin/subjects": "Môn học",
    "/admin/classes": "Lớp học",
  };
  const paths = pathname.split("/").filter(Boolean);
  const crumbs = [
    { path: "/admin", label: "Dashboard" },
    ...(paths[1]
      ? [
          {
            path: `/admin/${paths[1]}`,
            label: map[`/admin/${paths[1]}`] || paths[1],
          },
        ]
      : []),
  ];
  return crumbs;
};

interface AdminLayoutProps {
  collapsed: boolean;
}

const AdminLayout = ({ collapsed }: AdminLayoutProps) => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKeys = useMemo(() => {
    const match = adminMenu.find((item) =>
      location.pathname.startsWith(item.key)
    );
    return match ? [match.key] : [];
  }, [location.pathname]);

  const breadcrumbs = getBreadcrumb(location.pathname);

  useEffect(() => {
    document.title = "Admin Dashboard | CodeFarm";
  }, []);

  return (
    <Layout
      style={{
        marginLeft: collapsed ? 80 : 280,
        transition: "margin-left 0.3s",
      }}
    >
      <SiderMenu
        menuItems={adminMenu}
        selectedKeys={selectedKeys}
        logoText="CodeFarm Admin"
      />
      <Layout>
        <HeaderBar />
        <div
          style={{ padding: "16px 24px 0 24px", background: colorBgContainer }}
        >
          <BreadcrumbNav items={breadcrumbs} />
          <ContentWrapper bgColor={colorBgContainer} />
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
