import { Layout, theme } from "antd";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import HeaderBar from "../common/HeaderBar";
import ContentWrapper from "../common/ContentWrapper";
import {
  BarChartOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SiderMenu from "../common/SideBarMenu";
import BreadcrumbNav from "../common/BreadcrumNav";

const adminMenu = [
  {
    key: "/teachers/dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/teachers/dashboard">DashBoard</Link>,
  },
  {
    key: "/teachers/classes",
    icon: <TeamOutlined />,
    label: <Link to="/teachers/classes">Quản lý lớp học</Link>,
  },
  {
    key: "/teachers/attendance",
    icon: <CheckCircleOutlined />,
    label: <Link to="/teachers/attendance">Điểm danh & Theo dõi</Link>,
  },
  {
    key: "/teachers/reports",
    icon: <BarChartOutlined />,
    label: <Link to="/teachers/reports">Báo cáo chi tiết</Link>,
  },
];

const getBreadcrumb = (pathname: string) => {
  const map: Record<string, string> = {
    "/teachers/dashboard": "DashBoard",
    "/teachers/classes": "Quản lý lớp học",
    "/teachers/attendance": "Điểm danh & Theo dõi",
    "/teachers/reports": "Báo cáo chi tiết",
  };
  const paths = pathname.split("/").filter(Boolean);
  const crumbs = [
    { path: "/teachers/dashboard", label: "DashBoard" },
    ...(paths[1]
      ? [
          {
            path: `/teachers/${paths[1]}`,
            label: map[`/teachers/${paths[1]}`] || paths[1],
          },
        ]
      : []),
  ];
  return crumbs;
};

const AdminLayout = () => {
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
        transition: "margin-left 0.3s",
      }}
    >
      <SiderMenu
        menuItems={adminMenu}
        selectedKeys={selectedKeys}
        // logoText="CodeFarm Teacher"
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
