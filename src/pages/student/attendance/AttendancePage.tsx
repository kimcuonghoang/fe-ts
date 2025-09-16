import { Card, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../../../common/api/classApi";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AttendancePage = () => {
  const user: any = JSON.parse(localStorage.getItem("user") || "null");

  const { data, isLoading } = useQuery({
    queryKey: ["CLASS_STUDENT"],
    queryFn: () => getAllClass({ studentIds: user._id }),
  });

  const classes = data?.data || [];

  const columns = [
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Môn học",
      key: "subjectId",
      render: (_: any, record: any) =>
        record.subjectId?.name || "Chưa cập nhật",
    },
    {
      title: "Phòng học",
      dataIndex: "room",
      key: "room",
      render: (room: string) => (
        <div className="flex items-center text-gray-600">
          <ClockCircleOutlined className="mr-1 text-blue-500" /> Phòng{" "}
          {room || "Chưa cập nhật"}
        </div>
      ),
    },
    {
      title: "Ngày học",
      dataIndex: "daysOfWeek",
      key: "daysOfWeek",
      render: (daysOfWeek: string) => (
        <div className="flex items-center text-gray-600">
          <CalendarOutlined className="mr-1 text-green-500" />{" "}
          {daysOfWeek || "Chưa cập nhật"}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Link to={`/students/attendances/${record._id}`}>Xem điểm danh</Link>
      ),
    },
  ];

  return (
    <Card title="Danh sách lớp của tôi">
      <Table
        bordered
        columns={columns}
        dataSource={classes}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} lớp học`,
        }}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default AttendancePage;
