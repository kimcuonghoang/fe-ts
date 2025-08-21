import { useState } from "react";
import { Card, Table, Space, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionByClassId } from "../../../common/api/sessionApi";
import { Link, useParams } from "react-router-dom";

const ManagerSessionPage = () => {
  const { classId } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["SESSIONS", classId],
    queryFn: () => getAllSessionByClassId(classId!),
    enabled: !!classId,
  });
  const sessions = data?.data;
  const columns = [
    {
      title: "Ngày học",
      dataIndex: "sessionDates",
      key: "sessionDates",
      render: (sessionDates: string) =>
        dayjs(sessionDates).format("DD/MM/YYYY"),
    },
    {
      title: "Lớp",
      dataIndex: "classId",
      key: "classId",
      render: (_: any, record: any) => record.classId?.name || "Chưa cập nhật",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (_: any, record: any) =>
        record.teacherId?.fullname || "Chưa cập nhật",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Link to={`/teachers/attendance/${record._id}`}>Điểm danh</Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Bộ lọc */}
      <Card>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chọn ngày</label>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="DD/MM/YYYY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Chọn lớp</label>
            <Select
              placeholder="Tất cả lớp"
              value={selectedClass}
              onChange={setSelectedClass}
              className="w-48"
              allowClear
            >
              <Select.Option value="react">ReactJS Cơ bản</Select.Option>
              <Select.Option value="node">NodeJS Nâng cao</Select.Option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Bảng danh sách buổi học */}
      <Card title="Danh sách buổi học">
        <Table
          columns={columns}
          dataSource={sessions}
          loading={isLoading}
          rowKey="id"
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} buổi học`,
          }}
        />
      </Card>
    </div>
  );
};

export default ManagerSessionPage;
