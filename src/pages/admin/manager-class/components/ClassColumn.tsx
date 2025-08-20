import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Button,
  message,
  Popconfirm,
  Popover,
  Space,
  Tag,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { TextCell } from "../../../../components/common/TextCell";

import ModalDetailClass from "./ModalDetailClass";

import { Link } from "react-router-dom";
import { restoreClass, softDelteClass } from "../../../../common/api/classApi";
import { Class } from "../../../../common/types/class";

const ClassColumn = (getSorterProps: (field: string) => object) => {
  const queryClient = useQueryClient();
  const lockMutation = useMutation({
    mutationFn: async (id: string) => await softDelteClass(id),
    onSuccess: () => {
      message.success("Khóa lớp học thành công");
      queryClient.invalidateQueries({ queryKey: ["CLASS"] });
    },
    onError: () => message.error("Khóa lớp học thất bại"),
  });

  const unlockMutation = useMutation({
    mutationFn: async (id: string) => await restoreClass(id),
    onSuccess: () => {
      message.success("Mở khóa lớp học thành công");
      queryClient.invalidateQueries({ queryKey: ["CLASS"] });
    },
    onError: () => message.error("Mở khóa lớp học thất bại"),
  });
  return [
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
      render: (id: string) => <TextCell text={id} />,
      ...getSorterProps("name"),
    },
    {
      title: "Chuyên ngành",
      dataIndex: "majorId",
      key: "majorId",

      render: (majorId: string) => <TextCell text={majorId?.name} />,
      ...getSorterProps("majorId"),
    },
    {
      title: "Bộ môn",
      dataIndex: "subjectId",
      key: "subjectId",

      render: (subjectId: string) => <TextCell text={subjectId?.name} />,
      ...getSorterProps("subjectId"),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (teacherId: string) => <TextCell text={teacherId?.fullname} />,
      ...getSorterProps("teacherId"),
    },
    {
      title: "Ca học",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Trạng thái",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt: string | null) =>
        deletedAt ? (
          <Tag color="red">Đã xóa</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Class) => (
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Tooltip title="Xem chi tiết">
            <ModalDetailClass classInfo={record}>
              <EyeOutlined
                style={{ cursor: "pointer", color: "blue", fontSize: 18 }}
              />
            </ModalDetailClass>
          </Tooltip>
          <Popover
            placement="bottomLeft"
            content={
              <Space direction="vertical" style={{ display: "flex" }}>
                {!record.deletedAt && (
                  <Link to={`/admin/classes/edit/${record._id}`}>
                    <EditOutlined />
                  </Link>
                )}

                {!record.deletedAt ? (
                  <Popconfirm
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={() => lockMutation.mutate(record._id)}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button type="link" danger>
                      <LockOutlined /> Xoá
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button
                    type="link"
                    onClick={() => unlockMutation.mutate(record._id)}
                  >
                    <UnlockOutlined /> Khôi phục
                  </Button>
                )}
              </Space>
            }
            trigger="click"
          >
            <EllipsisOutlined
              style={{
                fontSize: 24,
              }}
            />
          </Popover>
        </Space>
      ),
    },
  ];
};

export default ClassColumn;
