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
import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../../common/api/classApi";

const { Option } = Select;
const { Search } = Input;

const AttendanceTracking = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchText, setSearchText] = useState("");
  const user: any = JSON.parse(localStorage.getItem("user") || "null");
  const { data } = useQuery({
    queryKey: ["CLASS_STUDENTS"],
    queryFn: () => getAllClass({ studentId: user._id }),
  });
  const students = data?.data;

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
  ];

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
          students.find((c: any) => c.id === selectedClass)?.name || "Tất cả"
        }`}
        extra={
          <Badge count={students.length} showZero>
            <UserOutlined className="text-lg" />
          </Badge>
        }
      >
        <Table
          columns={columns}
          dataSource={students}
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
