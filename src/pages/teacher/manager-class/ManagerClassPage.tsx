import { Card, Table, Button, Tag, Space, Tooltip, Progress } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useClassQuery } from "../../../common/hooks/useClassQuery";

const ClassManagement = () => {
  const { data: classes, isLoading } = useClassQuery();

  const columns = [
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium text-gray-800">{text}</div>
          <div className="text-sm text-gray-500">
            {record.subject} - {record.level}
          </div>
        </div>
      ),
    },
    {
      title: "Lịch học",
      dataIndex: "schedule",
      key: "schedule",
      render: (text, record) => (
        <div>
          <div className="flex items-center text-sm">
            <CalendarOutlined className="mr-1 text-blue-500" />
            {record.dayOfWeek}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <ClockCircleOutlined className="mr-1" />
            Phòng {record.room}
          </div>
        </div>
      ),
    },
    {
      title: "Sĩ số",
      key: "students",
      render: (_, record) => (
        <div>
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
        </div>
      ),
    },
    {
      title: "Tỷ lệ tham gia",
      dataIndex: "attendanceRate",
      key: "attendanceRate",
      render: (rate: number) => (
        <div>
          <div className="font-medium">{rate}%</div>
          <Progress
            percent={rate}
            size="small"
            strokeColor={
              rate >= 90 ? "#52c41a" : rate >= 80 ? "#faad14" : "#ff4d4f"
            }
          />
        </div>
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
      title: "Điểm danh gần nhất",
      dataIndex: "lastAttendance",
      key: "lastAttendance",
      render: (date: string) =>
        date ? dayjs(date).format("DD/MM/YYYY") : "Chưa có",
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
          {/* <Tooltip title="Chỉnh sửa">
            <Link to={"#"}>
              <Button
                icon={<EditOutlined />}
                size="small"
                // onClick={() => handleEditClass(record)}
              />
            </Link>
          </Tooltip> */}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header với thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {/* {classes.length} */}
          </div>
          <div className="text-gray-500">Tổng số lớp</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {/* {classes.filter((c) => c.status === "active").length} */}
          </div>
          <div className="text-gray-500">Đang diễn ra</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {/* {classes.reduce((sum, c) => sum + c.students, 0)} */}
          </div>
          <div className="text-gray-500">Tổng học viên</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {/* {Math.round(
              classes.reduce((sum, c) => sum + c.attendanceRate, 0) /
                classes.length
            )} */}
            %
          </div>
          <div className="text-gray-500">Tỷ lệ tham gia TB</div>
        </Card>
      </div>

      {/* Bảng danh sách lớp học */}
      <Card title="Danh sách lớp học">
        <Table
          columns={columns}
          dataSource={classes}
          loading={isLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} lớp học`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default ClassManagement;
