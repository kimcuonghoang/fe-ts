import { Card, Table, Tag, Progress, Space, Tooltip, Button } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../../../common/api/classApi";
import { Link } from "react-router-dom";

const ClassListPage = () => {
  const user: any = JSON.parse(localStorage.getItem("user") || "null");
  const { data, isLoading } = useQuery({
    queryKey: ["CLASS_STUDENT"],
    queryFn: () => getAllClass({ studentIds: user._id }),
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
          {/* <div className="flex items-center">
            <CalendarOutlined className="mr-1 text-blue-500" />
            {record.dayOfWeek}
          </div> */}
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
          <Tooltip title="Xem lịch học">
            <Link to={`/students/sessions/${record._id}`}>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
              />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
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

export default ClassListPage;
