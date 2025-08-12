"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Select,
  DatePicker,
  Button,
  Tag,
  Progress,
  Avatar,
  Tabs,
  Alert,
  Statistic,
  Tooltip,
} from "antd";
import {
  DownloadOutlined,
  PrinterOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  CalendarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Line, Column, Radar } from "@ant-design/plots";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const DetailedReports = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(30, "day"),
    dayjs(),
  ]);
  const [activeTab, setActiveTab] = useState("overview");

  // Dữ liệu lớp học
  const classes = [
    { id: "all", name: "Tất cả lớp" },
    { id: "1", name: "Toán Cao Cấp A1" },
    { id: "2", name: "Vật Lý Đại Cương B2" },
    { id: "3", name: "Hóa Học Hữu Cơ C1" },
    { id: "4", name: "Sinh Học Phân Tử" },
  ];

  // Dữ liệu học viên cần quan tâm
  const studentsAtRisk = [
    {
      id: 1,
      name: "Trần Thị Bình",
      studentId: "SV002",
      class: "Toán Cao Cấp A1",
      avatar: "/placeholder.svg?height=32&width=32",
      attendanceRate: 65.2,
      absentDays: 8,
      consecutiveAbsent: 3,
      lastAttendance: "2024-01-15",
      riskLevel: "high",
      issues: [
        "Vắng liên tiếp 3 buổi",
        "Tỷ lệ tham gia thấp",
        "Không liên lạc được",
      ],
    },
    {
      id: 2,
      name: "Lê Văn Cường",
      studentId: "SV015",
      class: "Vật Lý Đại Cương B2",
      avatar: "/placeholder.svg?height=32&width=32",
      attendanceRate: 72.8,
      absentDays: 6,
      consecutiveAbsent: 2,
      lastAttendance: "2024-01-18",
      riskLevel: "medium",
      issues: ["Thường xuyên đi muộn", "Tỷ lệ tham gia giảm"],
    },
    {
      id: 3,
      name: "Phạm Thị Dung",
      studentId: "SV023",
      class: "Hóa Học Hữu Cơ C1",
      avatar: "/placeholder.svg?height=32&width=32",
      attendanceRate: 78.5,
      absentDays: 5,
      consecutiveAbsent: 1,
      lastAttendance: "2024-01-19",
      riskLevel: "low",
      issues: ["Vắng không phép"],
    },
  ];

  // Dữ liệu học viên xuất sắc
  const topStudents = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      studentId: "SV001",
      class: "Toán Cao Cấp A1",
      avatar: "/placeholder.svg?height=32&width=32",
      attendanceRate: 98.5,
      perfectDays: 20,
      achievements: [
        "Không vắng buổi nào",
        "Luôn đúng giờ",
        "Tích cực tham gia",
      ],
    },
    {
      id: 2,
      name: "Hoàng Thị Mai",
      studentId: "SV007",
      class: "Vật Lý Đại Cương B2",
      avatar: "/placeholder.svg?height=32&width=32",
      attendanceRate: 96.8,
      perfectDays: 18,
      achievements: ["Tham gia tích cực", "Hỗ trợ bạn học"],
    },
  ];

  // Dữ liệu xu hướng tham gia theo tháng
  const monthlyTrendData = [
    { month: "T9/2023", rate: 89.2, students: 245 },
    { month: "T10/2023", rate: 91.5, students: 248 },
    { month: "T11/2023", rate: 87.8, students: 250 },
    { month: "T12/2023", rate: 85.3, students: 252 },
    { month: "T1/2024", rate: 88.7, students: 245 },
  ];

  // Dữ liệu so sánh các lớp
  const classPerformanceData = [
    { class: "Toán A1", attendance: 87.5, avgGrade: 8.2, satisfaction: 4.3 },
    { class: "Lý B2", attendance: 92.1, avgGrade: 7.8, satisfaction: 4.5 },
    { class: "Hóa C1", attendance: 89.3, avgGrade: 8.0, satisfaction: 4.2 },
    { class: "Sinh B1", attendance: 94.7, avgGrade: 8.5, satisfaction: 4.6 },
  ];

  // Dữ liệu phân tích theo giờ học
  const hourlyAnalysisData = [
    { hour: "7:00-8:00", rate: 95.2 },
    { hour: "8:00-9:00", rate: 92.8 },
    { hour: "9:00-10:00", rate: 89.5 },
    { hour: "10:00-11:00", rate: 87.3 },
    { hour: "13:00-14:00", rate: 85.1 },
    { hour: "14:00-15:00", rate: 83.7 },
    { hour: "15:00-16:00", rate: 81.2 },
    { hour: "16:00-17:00", rate: 78.9 },
  ];

  // Dữ liệu radar chart cho phân tích đa chiều
  const radarData = [
    { metric: "Tỷ lệ tham gia", value: 87.5, fullMark: 100 },
    { metric: "Đúng giờ", value: 82.3, fullMark: 100 },
    { metric: "Tương tác", value: 78.9, fullMark: 100 },
    { metric: "Hoàn thành BT", value: 85.7, fullMark: 100 },
    { metric: "Đánh giá", value: 88.2, fullMark: 100 },
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "yellow";
      default:
        return "default";
    }
  };

  const getRiskText = (level) => {
    switch (level) {
      case "high":
        return "Cao";
      case "medium":
        return "Trung bình";
      case "low":
        return "Thấp";
      default:
        return "Không xác định";
    }
  };

  const atRiskColumns = [
    {
      title: "Học viên",
      key: "student",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.avatar} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.studentId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Lớp học",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Tỷ lệ tham gia",
      key: "attendanceRate",
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.attendanceRate}%</div>
          <Progress
            percent={record.attendanceRate}
            size="small"
            strokeColor={record.attendanceRate >= 80 ? "#faad14" : "#ff4d4f"}
          />
        </div>
      ),
    },
    {
      title: "Mức độ rủi ro",
      key: "riskLevel",
      render: (_, record) => (
        <Tag color={getRiskColor(record.riskLevel)}>
          {getRiskText(record.riskLevel)}
        </Tag>
      ),
    },
    {
      title: "Vấn đề",
      key: "issues",
      render: (_, record) => (
        <div className="space-y-1">
          {record.issues.slice(0, 2).map((issue, index) => (
            <div key={index} className="text-sm text-red-600">
              • {issue}
            </div>
          ))}
          {record.issues.length > 2 && (
            <Tooltip title={record.issues.slice(2).join(", ")}>
              <span className="text-sm text-gray-500 cursor-help">
                +{record.issues.length - 2} vấn đề khác
              </span>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "Lần cuối tham gia",
      key: "lastAttendance",
      render: (_, record) => (
        <div>
          <div>{dayjs(record.lastAttendance).format("DD/MM/YYYY")}</div>
          <div className="text-sm text-gray-500">
            {dayjs().diff(dayjs(record.lastAttendance), "day")} ngày trước
          </div>
        </div>
      ),
    },
  ];

  const lineConfig = {
    data: monthlyTrendData,
    xField: "month",
    yField: "rate",
    smooth: true,
    color: "#1890ff",
  };

  const columnConfig = {
    data: hourlyAnalysisData,
    xField: "hour",
    yField: "rate",
    color: "#52c41a",
  };

  const radarConfig = {
    data: radarData,
    xField: "metric",
    yField: "value",
    area: {},
    point: { size: 2 },
  };

  return (
    <div className="space-y-6">
      {/* Bộ lọc */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lớp học
              </label>
              <Select
                value={selectedClass}
                onChange={setSelectedClass}
                className="w-48"
              >
                {classes.map((cls) => (
                  <Option key={cls.id} value={cls.id}>
                    {cls.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khoảng thời gian
              </label>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                format="DD/MM/YYYY"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button icon={<DownloadOutlined />}>Xuất Excel</Button>
            <Button icon={<PrinterOutlined />}>In báo cáo</Button>
          </div>
        </div>
      </Card>

      {/* Tabs báo cáo */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Tổng quan" key="overview">
            <div className="space-y-6">
              {/* Thống kê tổng quan */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center">
                  <Statistic
                    title="Tỷ lệ tham gia trung bình"
                    value={87.5}
                    suffix="%"
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<BarChartOutlined />}
                  />
                </Card>
                <Card className="text-center">
                  <Statistic
                    title="Học viên cần quan tâm"
                    value={studentsAtRisk.length}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<ExclamationCircleOutlined />}
                  />
                </Card>
                <Card className="text-center">
                  <Statistic
                    title="Học viên xuất sắc"
                    value={topStudents.length}
                    valueStyle={{ color: "#1890ff" }}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
                <Card className="text-center">
                  <Statistic
                    title="Tổng buổi học"
                    value={156}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </div>

              {/* Biểu đồ xu hướng */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Xu hướng tham gia theo tháng">
                  <Line {...lineConfig} height={250} />
                </Card>
                <Card title="Phân tích theo giờ học">
                  <Column {...columnConfig} height={250} />
                </Card>
              </div>

              <Card title="Phân tích đa chiều">
                <Radar {...radarConfig} height={300} />
              </Card>
            </div>
          </TabPane>

          <TabPane tab="Học viên cần quan tâm" key="at-risk">
            <div className="space-y-4">
              <Alert
                message="Cảnh báo"
                description={`Có ${
                  studentsAtRisk.filter((s) => s.riskLevel === "high").length
                } học viên có nguy cơ cao bỏ học. Cần liên hệ và hỗ trợ kịp thời.`}
                type="warning"
                showIcon
                className="mb-4"
              />

              <Table
                columns={atRiskColumns}
                dataSource={studentsAtRisk}
                rowKey="id"
                pagination={false}
              />
            </div>
          </TabPane>

          <TabPane tab="Học viên xuất sắc" key="top-performers">
            <div className="space-y-4">
              <Alert
                message="Thành tích tốt"
                description={`${topStudents.length} học viên có thành tích xuất sắc về tham gia lớp học.`}
                type="success"
                showIcon
                className="mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topStudents.map((student) => (
                  <Card
                    key={student.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar src={student.avatar} size={64} />
                      <div className="flex-1">
                        <div className="font-medium text-lg">
                          {student.name}
                        </div>
                        <div className="text-gray-500 mb-2">
                          {student.studentId} - {student.class}
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Tỷ lệ tham gia</span>
                            <span className="font-medium text-green-600">
                              {student.attendanceRate}%
                            </span>
                          </div>
                          <Progress
                            percent={student.attendanceRate}
                            strokeColor="#52c41a"
                          />
                        </div>

                        <div className="space-y-1">
                          {student.achievements.map((achievement, index) => (
                            <div key={index} className="text-sm text-green-600">
                              <TrophyOutlined className="mr-1" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabPane>

          <TabPane tab="So sánh lớp học" key="class-comparison">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {classPerformanceData.map((cls, index) => (
                  <Card key={index} title={cls.class} className="text-center">
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {cls.attendance}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Tỷ lệ tham gia
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {cls.avgGrade}
                        </div>
                        <div className="text-sm text-gray-500">Điểm TB</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          {cls.satisfaction}/5
                        </div>
                        <div className="text-sm text-gray-500">Hài lòng</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card title="Bảng so sánh chi tiết">
                <Table
                  dataSource={classPerformanceData}
                  columns={[
                    { title: "Lớp học", dataIndex: "class", key: "class" },
                    {
                      title: "Tỷ lệ tham gia",
                      dataIndex: "attendance",
                      key: "attendance",
                      render: (value) => `${value}%`,
                      sorter: (a, b) => a.attendance - b.attendance,
                    },
                    {
                      title: "Điểm trung bình",
                      dataIndex: "avgGrade",
                      key: "avgGrade",
                      sorter: (a, b) => a.avgGrade - b.avgGrade,
                    },
                    {
                      title: "Mức độ hài lòng",
                      dataIndex: "satisfaction",
                      key: "satisfaction",
                      render: (value) => `${value}/5`,
                      sorter: (a, b) => a.satisfaction - b.satisfaction,
                    },
                  ]}
                  pagination={false}
                />
              </Card>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default DetailedReports;
