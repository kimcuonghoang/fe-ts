import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Tooltip,
  Progress,
  Select,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../../../common/api/classApi";
import SearchInput from "../../../components/common/SearchInput";
import { RoomEnum, ShiftEnum } from "../../../common/types";
import { useTable } from "../../../common/hooks/useTable";
import { Class } from "../../../common/types/class";
const { Option } = Select;
const MângerClassPage = () => {
  const { resetFilter, onFilter, query, onChangeSearchInput, onSubmitSearch } =
    useTable<Class>();
  const user: any = JSON.parse(localStorage.getItem("user") || "null");
  const { data, isLoading } = useQuery({
    queryKey: ["CLASS_TEACHER", ...Object.values(query)],
    queryFn: () => getAllClass({ teacherId: user._id, ...query }),
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
          <Tooltip title="Chi tiết">
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
        <Space
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space wrap>
            {/* Search */}
            <SearchInput
              onSearch={(value) => onSubmitSearch(value)}
              onChangeSeachInput={(value) =>
                onChangeSearchInput(value, { enableOnChangeSearch: true })
              }
              defaultValue={query.search}
              placeholder="Tìm kiếm theo tên lớp..."
              style={{ width: 250 }}
            />

            {/* Trạng thái */}
            <Select
              style={{ width: 140 }}
              allowClear
              value={query.isDeleted || ""}
              onChange={(e) => onFilter({ isDeleted: e })}
            >
              <Option value="">Tất cả trạng thái</Option>
              <Option value="false">Hoạt động</Option>
              <Option value="true">Đã xóa</Option>
            </Select>

            {/* Ca học */}
            <Select
              style={{ width: 140 }}
              allowClear
              value={query.shift || ""}
              onChange={(e) => onFilter({ shift: e.toString() })}
            >
              <Option value="">Tất cả ca học</Option>
              {Object.values(ShiftEnum).map((s) => (
                <Option key={s} value={s.toString()}>
                  {s}
                </Option>
              ))}
            </Select>

            {/* Phòng học */}
            <Select
              style={{ width: 140 }}
              allowClear
              value={query.room || ""}
              onChange={(e) => onFilter({ room: e.toString() })}
            >
              <Option value="">Tất cả phòng</Option>
              {Object.values(RoomEnum).map((r) => (
                <Option key={r} value={r.toString()}>
                  {r}
                </Option>
              ))}
            </Select>

            {/* Ngày bắt đầu */}
            {/* <RangePicker
                  value={query.startDateRange}
                  onChange={(dates) => {
                    if (!dates) return onFilter({ startDateFrom: "", startDateTo: "" });
                    onFilter({
                      startDateFrom: dates[0]?.startOf("day").toISOString(),
                      startDateTo: dates[1]?.endOf("day").toISOString(),
                    });
                  }}
                /> */}
          </Space>

          {/* Reset */}
          {Object.keys(query).some(
            (key) =>
              !["page", "limit"].includes(key) &&
              query[key] !== undefined &&
              query[key] !== ""
          ) && (
            <Button onClick={() => resetFilter({ keepPageAndLimit: true })}>
              Đặt lại bộ lọc
            </Button>
          )}
        </Space>
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
