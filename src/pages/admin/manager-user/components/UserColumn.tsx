import { useMutation, useQueryClient } from "@tanstack/react-query";

import { blockUser } from "../../../../common/api/userApi";
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
import {
  getColorByRole,
  translateRoles,
} from "../../../../common/utils/TranslateRole";
import ModalDetailUser from "./ModalDetailUser";
import UserForm from "./UserForm";
import User from "../../../../common/types/user";

const UserColumn = (getSorterProps: (field: string) => object) => {
  const queryClient = useQueryClient();
  const lockMutation = useMutation({
    mutationFn: async (id: string) => await blockUser(id, true),
    onSuccess: () => {
      message.success("Khóa người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
    onError: (error) => {
      const axiosError = error as any;
      const msg =
        axiosError.response?.data?.message ||
        "Khóa người dùng thất bại, vui lòng thử lại!";
      message.error(msg);
    },
  });

  const unlockMutation = useMutation({
    mutationFn: async (id: string) => await blockUser(id, false),
    onSuccess: () => {
      message.success("Mở khóa người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
    onError: () => message.error("Mở khóa người dùng thất bại"),
  });
  return [
    {
      title: "Mã",
      dataIndex: "studentId",
      key: "studentId",
      render: (id: string) => <TextCell text={id} />,
      ...getSorterProps("studentId"),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tên người dùng</p>,
      dataIndex: "username",
      key: "username",
      wdith: 70,
      render: (userName: string) => <TextCell text={userName} />,
      ...getSorterProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (email: string) => <TextCell text={email} />,
      ...getSorterProps("email"),
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      render: (fullName: string) => <TextCell text={fullName} />,
      ...getSorterProps("fullname"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={getColorByRole(role)}>{translateRoles(role)}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean, record: User) =>
        record.deletedAt ? (
          <Tag color="gray">Đã xóa</Tag>
        ) : isBlocked ? (
          <Tag color="red">Đã khóa</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: User) => (
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Tooltip title="Xem chi tiết">
            <ModalDetailUser userInfo={record}>
              <EyeOutlined
                style={{ cursor: "pointer", color: "blue", fontSize: 18 }}
              />
            </ModalDetailUser>
          </Tooltip>
          <Popover
            placement="bottomLeft"
            content={
              <Space direction="vertical">
                {!record.deletedAt && (
                  <UserForm userEdit={record}>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      disabled={record.isBlocked}
                    >
                      Cập nhật
                    </Button>
                  </UserForm>
                )}
                {!record.deletedAt && !record.isBlocked && (
                  <Popconfirm
                    title="Bạn chắc chắn muốn khóa?"
                    onConfirm={() => lockMutation.mutate(record._id)}
                  >
                    <Button type="text" danger icon={<LockOutlined />}>
                      Khóa
                    </Button>
                  </Popconfirm>
                )}
                {!record.deletedAt && record.isBlocked && (
                  <Button
                    type="text"
                    icon={<UnlockOutlined />}
                    onClick={() => unlockMutation.mutate(record._id)}
                  >
                    Mở khóa
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

export default UserColumn;
