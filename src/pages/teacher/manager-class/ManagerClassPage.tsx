import { Card, Table, Button, Tag, Space, Tooltip, Progress } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../../../common/api/classApi";

const MângerClassPage = () => {
  const user: any = JSON.parse(localStorage.getItem("user") || "null");
  const { data, isLoading } = useQuery({
    queryKey: ["CLASS_TEACHER"],
    queryFn: () => getAllClass({ teacherId: user._id }),
  });
  const classes = data?.data;
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
      title: "Lịch học",
      key: "schedule",
      render: (_: any, record: any) => (
        <div className="text-sm">
          <div className="flex items-center">
            <CalendarOutlined className="mr-1 text-blue-500" />
            {record.dayOfWeek}
          </div>
          <div className="flex items-center text-gray-500 mt-1">
            <ClockCircleOutlined className="mr-1" />
            Phòng {record.room}
          </div>
        </div>
      ),
    },
    {
      title: "Sĩ số",
      key: "students",
      render: (_: any, record: any) => {
        const current = record.studentIds?.length || 0;
        const max = record.maxStudents || 0;
        const percent = max > 0 ? Math.round((current / max) * 100) : 0;

        return (
          <>
            <div className="flex items-center">
              <UserOutlined className="mr-1 text-green-500" />
              <span className="font-medium">
                {current}/{max}
              </span>
            </div>
            <Progress
              percent={percent}
              size="small"
              className="mt-1"
              strokeColor={current >= max ? "#ff4d4f" : "#52c41a"}
            />
          </>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt: string | null) =>
        deletedAt ? (
          <Tag color="red">Tạm dừng</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Điểm danh">
            <Link to={`/teachers/sessions/${record._id}`}>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Lịch sử điểm danh">
            <Link to={`/teachers/attendance-history/${record._id}`}>
              <Button type="primary" icon={<CalendarOutlined />} size="small" />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Danh sách lớp giáo viên */}
      <Card title="Danh sách lớp của tôi">
        <Table
          columns={columns}
          dataSource={classes}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} lớp học`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default MângerClassPage;
