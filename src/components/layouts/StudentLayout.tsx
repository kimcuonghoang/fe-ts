import { Layout, theme } from "antd";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import HeaderBar from "../common/HeaderBar";
import ContentWrapper from "../common/ContentWrapper";
import {
  CheckCircleOutlined,
  RollbackOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SiderMenu from "../common/SideBarMenu";
import BreadcrumbNav from "../common/BreadcrumNav";

const adminMenu = [
  {
    key: "/students/classes",
    icon: <TeamOutlined />,
    label: <Link to="/students/classes">Lớp học của tôi</Link>,
  },
  {
    key: "/students/attendances",
    icon: <CheckCircleOutlined />,
    label: <Link to="/students/attendances">Lịch sử điểm danh</Link>,
  },

  {
    key: "/",
    icon: <RollbackOutlined />,
    label: <Link to="/">Trở về trang chủ</Link>,
  },
];

const getBreadcrumb = (pathname: string) => {
  const map: Record<string, string> = {
    "/students/classes": "Lớp học của tôi",
    "/students/attendances": "Lịch sử điểm danh",

    "/": "Trở về trang chủ",
  };
  const paths = pathname.split("/").filter(Boolean);
  const crumbs = [
    { path: "/students", label: "Students" },
    ...(paths[1]
      ? [
          {
            path: `/students/${paths[1]}`,
            label: map[`/students/${paths[1]}`] || paths[1],
          },
        ]
      : []),
  ];
  return crumbs;
};

const StudentLayout = () => {
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
    document.title = "CodeFarm";
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

export default StudentLayout;
