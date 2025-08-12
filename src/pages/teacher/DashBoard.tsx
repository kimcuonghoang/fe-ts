"use client"

import { Card, Row, Col, Statistic, Progress, List, Tag, Timeline } from "antd"
import {
  TeamOutlined,
  UserOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons"
import { Line, Column, Pie } from "@ant-design/plots"

const Dashboard = () => {
  // Dữ liệu thống kê tổng quan
  const stats = [
    {
      title: "Tổng số lớp",
      value: 8,
      prefix: <TeamOutlined className="text-blue-600" />,
      suffix: "lớp",
      change: 12.5,
      trend: "up",
    },
    {
      title: "Tổng học viên",
      value: 245,
      prefix: <UserOutlined className="text-green-600" />,
      suffix: "học viên",
      change: 8.2,
      trend: "up",
    },
    {
      title: "Tỷ lệ tham gia TB",
      value: 87.5,
      prefix: <TrophyOutlined className="text-orange-600" />,
      suffix: "%",
      change: -2.1,
      trend: "down",
    },
    {
      title: "Giờ giảng dạy",
      value: 156,
      prefix: <ClockCircleOutlined className="text-purple-600" />,
      suffix: "giờ",
      change: 15.3,
      trend: "up",
    },
  ]

  // Dữ liệu biểu đồ tỷ lệ tham gia theo tuần
  const attendanceData = [
    { week: "Tuần 1", rate: 92 },
    { week: "Tuần 2", rate: 88 },
    { week: "Tuần 3", rate: 85 },
    { week: "Tuần 4", rate: 90 },
    { week: "Tuần 5", rate: 87 },
    { week: "Tuần 6", rate: 89 },
    { week: "Tuần 7", rate: 91 },
    { week: "Tuần 8", rate: 86 },
  ]

  // Dữ liệu biểu đồ số học viên theo lớp
  const classData = [
    { class: "Lớp A1", students: 32 },
    { class: "Lớp A2", students: 28 },
    { class: "Lớp B1", students: 35 },
    { class: "Lớp B2", students: 30 },
    { class: "Lớp C1", students: 25 },
    { class: "Lớp C2", students: 29 },
  ]

  // Dữ liệu phân bố điểm số
  const gradeData = [
    { grade: "Xuất sắc (9-10)", value: 45, percent: 18.4 },
    { grade: "Giỏi (8-8.9)", value: 78, percent: 31.8 },
    { grade: "Khá (7-7.9)", value: 89, percent: 36.3 },
    { grade: "Trung bình (5-6.9)", value: 28, percent: 11.4 },
    { grade: "Yếu (<5)", value: 5, percent: 2.1 },
  ]

  // Danh sách lớp học gần đây
  const recentClasses = [
    {
      name: "Lớp Toán A1",
      time: "08:00 - 10:00",
      students: 32,
      attendance: 28,
      status: "completed",
    },
    {
      name: "Lớp Lý B2",
      time: "10:15 - 12:15",
      students: 30,
      attendance: 27,
      status: "completed",
    },
    {
      name: "Lớp Hóa C1",
      time: "14:00 - 16:00",
      students: 25,
      attendance: 0,
      status: "upcoming",
    },
    {
      name: "Lớp Sinh B1",
      time: "16:15 - 18:15",
      students: 35,
      attendance: 0,
      status: "upcoming",
    },
  ]

  // Hoạt động gần đây
  const recentActivities = [
    {
      time: "10 phút trước",
      action: "Hoàn thành điểm danh lớp Toán A1",
      type: "attendance",
    },
    {
      time: "25 phút trước",
      action: "Cập nhật điểm kiểm tra lớp Lý B2",
      type: "grade",
    },
    {
      time: "1 giờ trước",
      action: "Thêm bài tập mới cho lớp Hóa C1",
      type: "assignment",
    },
    {
      time: "2 giờ trước",
      action: "Gửi thông báo đến phụ huynh lớp A1",
      type: "notification",
    },
  ]

  const lineConfig = {
    data: attendanceData,
    xField: "week",
    yField: "rate",
    smooth: true,
    color: "#1890ff",
    point: {
      size: 4,
      shape: "circle",
    },
    yAxis: {
      min: 80,
      max: 95,
    },
  }

  const columnConfig = {
    data: classData,
    xField: "class",
    yField: "students",
    color: "#52c41a",
    columnWidthRatio: 0.6,
  }

  const pieConfig = {
    data: gradeData,
    angleField: "value",
    colorField: "grade",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name}: {percentage}",
    },
  }

  return (
    <div className="space-y-6">
      {/* Thống kê tổng quan */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hover:shadow-md transition-shadow">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.trend === "up" ? "#3f8600" : "#cf1322" }}
              />
              <div className="flex items-center mt-2 text-sm">
                {stat.trend === "up" ? (
                  <RiseOutlined className="text-green-600 mr-1" />
                ) : (
                  <FallOutlined className="text-red-600 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-gray-500 ml-1">so với tháng trước</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Biểu đồ và thông tin chi tiết */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Tỷ lệ tham gia theo tuần" className="h-full">
            <Line {...lineConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Lớp học hôm nay" className="h-full">
            <List
              dataSource={recentClasses}
              renderItem={(item) => (
                <List.Item className="px-0">
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.time}</div>
                      </div>
                      <Tag color={item.status === "completed" ? "green" : "blue"}>
                        {item.status === "completed" ? "Đã hoàn thành" : "Sắp diễn ra"}
                      </Tag>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sĩ số: {item.students}</span>
                      {item.status === "completed" && (
                        <span className="text-green-600">
                          Có mặt: {item.attendance}/{item.students}
                        </span>
                      )}
                    </div>
                    {item.status === "completed" && (
                      <Progress
                        percent={Math.round((item.attendance / item.students) * 100)}
                        size="small"
                        className="mt-2"
                      />
                    )}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Số học viên theo lớp">
            <Column {...columnConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Phân bố điểm số">
            <Pie {...pieConfig} height={300} />
          </Card>
        </Col>
      </Row>

      {/* Hoạt động gần đây */}
      <Card title="Hoạt động gần đây">
        <Timeline
          items={recentActivities.map((activity, index) => ({
            color:
              activity.type === "attendance"
                ? "green"
                : activity.type === "grade"
                  ? "blue"
                  : activity.type === "assignment"
                    ? "orange"
                    : "purple",
            children: (
              <div key={index}>
                <div className="font-medium text-gray-800">{activity.action}</div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  )
}

export default Dashboard
