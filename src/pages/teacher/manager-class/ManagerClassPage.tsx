import { Card, Table, Button, Tag, Space, Tooltip, Progress } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useClassQuery } from "../../../common/hooks/useClassQuery";
import Search from "antd/es/input/Search";

const StatCard = ({
  value,
  label,
  color,
}: {
  value: any;
  label: string;
  color: string;
}) => (
  <Card className="text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-gray-500">{label}</div>
  </Card>
);

const ClassManagement = () => {
  const { data: classes = [], isLoading } = useClassQuery();

  const columns = [
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
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
      render: (_: any, record: any) => (
        <>
          <div className="flex items-center">
            <UserOutlined className="mr-1 text-green-500" />
            <span className="font-medium">
              {record.students}/{record.maxStudents}
            </span>
          </div>
          <Progress
            percent={Math.round((record.students / record.maxStudents) * 100)}
            size="small"
            className="mt-1"
            strokeColor={
              record.students >= record.maxStudents ? "#ff4d4f" : "#52c41a"
            }
          />
        </>
      ),
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
      render: () => (
        <Space>
          <Tooltip title="Điểm danh">
            <Link to={"/teachers/attendance"}>
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
      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          value={classes.length}
          label="Tổng số lớp"
          color="text-blue-600"
        />
        <StatCard
          value={classes.filter((c: any) => !c.deletedAt).length}
          label="Đang diễn ra"
          color="text-green-600"
        />
        <StatCard
          value={classes.reduce((sum: number, c: any) => sum + c.students, 0)}
          label="Tổng học viên"
          color="text-orange-600"
        />
        <StatCard
          value={
            classes.length
              ? `${Math.round(
                  classes.reduce(
                    (sum: number, c: any) => sum + c.attendanceRate,
                    0
                  ) / classes.length
                )}%`
              : "0%"
          }
          label="Tỷ lệ tham gia TB"
          color="text-purple-600"
        />
      </div>

      {/* Thanh tìm kiếm */}
      <Card>
        <div>
          <label className="block text-sm font-medium mb-1">
            Tìm kiếm lớp học
          </label>
          <Search
            placeholder="Tìm theo tên hoặc mã lớp học"
            className="max-w-xs"
          />
        </div>
      </Card>

      {/* Bảng danh sách lớp */}
      <Card title="Danh sách lớp học">
        <Table
          columns={columns}
          dataSource={classes}
          loading={isLoading}
          rowKey="id"
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

export default ClassManagement;
