import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Select,
  DatePicker,
  Input,
  Progress,
  Avatar,
  Badge,
  Spin,
  Switch,
  Button,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { Search } = Input;

const AttendanceTracking = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchText, setSearchText] = useState("");

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      searchText
        ? s.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
          s.studentId.toLowerCase().includes(searchText.toLowerCase())
        : true
    );
  }, [students, searchText]);

  const handleSubmit = () => {
    console.log("Submit checked attendance");
  };

  const columns = [
    {
      title: "Học viên",
      key: "student",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className="font-medium text-gray-800">{record.fullname}</div>
            <div className="text-sm text-gray-500">{record.studentId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tỷ lệ tham gia",
      key: "attendanceRate",
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium">{record.attendanceRate}%</div>
          <Progress
            percent={record.attendanceRate}
            size="small"
            strokeColor={
              record.attendanceRate >= 90
                ? "#52c41a"
                : record.attendanceRate >= 80
                ? "#faad14"
                : "#ff4d4f"
            }
          />
        </div>
      ),
    },
    {
      title: "Thống kê",
      key: "stats",
      render: (_: any, record: any) => (
        <div className="text-sm">
          <div className="flex justify-between">
            <span>Có mặt:</span>
            <span className="text-green-600 font-medium">
              {record.presentSessions}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Vắng:</span>
            <span className="text-red-600 font-medium">
              {record.absentSessions}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái hôm nay",
      key: "todayStatus",
      render: (_: any, record: any) => (
        <Switch
          checked={record.status}
          onChange={(checked) => {
            console.log(`Học viên ${record.fullname} trạng thái:`, checked);
          }}
        />
      ),
    },
    {
      title: "Lần cuối tham gia",
      dataIndex: "lastAttendance",
      key: "lastAttendance",
      render: (date: string) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
    },
  ];

  if (loadingClasses || loadingStudents) {
    return (
      <div className="flex justify-center py-10">
        <Spin tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bộ lọc */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">
              Chọn lớp học
            </label>
            <Select
              value={selectedClass}
              onChange={setSelectedClass}
              className="w-48"
              placeholder="Tất cả lớp"
              allowClear
            >
              {classes.map((cls: any) => (
                <Option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.students} SV)
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày học</label>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="DD/MM/YYYY"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Tìm kiếm học viên
            </label>
            <Search
              placeholder="Tìm theo tên hoặc mã SV"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>
      </Card>

      {/* Bảng danh sách học viên */}
      <Card
        title={`Danh sách học viên - ${
          classes.find((c: any) => c.id === selectedClass)?.name || "Tất cả"
        }`}
        extra={
          <Badge count={filteredStudents.length} showZero>
            <UserOutlined className="text-lg" />
          </Badge>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} học viên`,
          }}
        />
        <div className="mt-4 flex justify-end">
          <Button type="primary" onClick={handleSubmit}>
            Lưu điểm danh
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceTracking;
