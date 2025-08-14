import {
  DeleteOutlined,
  EditOutlined,
  RotateLeftOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Table, Tag } from "antd";
import { useState } from "react";
import { Class } from "../../../common/api/classApi";
import {
  useCreateClass,
  useRestoreClass,
  useClassQuery,
  useUpdateClass,
  useSoftDeleteClass,
} from "../../../common/hooks/useClassQuery";
import ClassModalForm from "../../../components/ClassModalForm";
import dayjs from "dayjs";

const ManagerClassPage = () => {
  const { data: classes, isLoading } = useClassQuery();
  const createMutation = useCreateClass();
  const updateMutation = useUpdateClass();
  const softDeleteMutation = useSoftDeleteClass();
  const restoreMutation = useRestoreClass();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const openModal = (cls?: Class) => {
    setEditingClass(cls ?? null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingClass(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: Omit<Class, "_id">) => {
    try {
      if (editingClass) {
        await updateMutation.mutateAsync({ id: editingClass._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      closeModal();
    } catch {
      message.error("Đã có lỗi xảy ra.");
    }
  };

  const columns = [
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Môn học",
      dataIndex: "subjectId",
      key: "subjectId",
      render: (item: any) => <p>{item?.name ?? "Chưa có môn học"}</p>,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "majorId",
      key: "majorId",
      render: (item: any) => <p>{item?.name ?? "Chưa có chuyên ngành"}</p>,
    },

    {
      title: "Giáo viên",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (item: any) => <p>{item?.fullname ?? "Chưa có giáo viên"}</p>,
    },
    {
      title: "Sĩ số",
      dataIndex: "studentIds",
      key: "studentIds",
      render: (ids: any[]) => <p>{ids?.length ?? 0}</p>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (item: string) => (
        <p>{dayjs(item).locale("vi-VN").format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Số buổi",
      dataIndex: "totalSessions",
      key: "totalSessions",
    },
    {
      title: "Ca học",
      dataIndex: "shift",
      key: "shift",
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
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Class) => (
        <div className="space-x-2">
          <Button type="link" onClick={() => openModal(record)}>
            <EditOutlined />
          </Button>
          {!record.deletedAt ? (
            <Popconfirm
              title="Bạn chắc chắn muốn xóa?"
              onConfirm={() => softDeleteMutation.mutate(record._id)}
            >
              <Button type="link" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          ) : (
            <Button
              type="link"
              onClick={() => restoreMutation.mutate(record._id)}
              icon={<RotateLeftOutlined />}
            ></Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Quản lý lớp học</h1>
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Tìm kiếm ngành..."
          onSearch={(value) => {
            setQueryParams((prev) => ({
              ...prev,
              search: value,
              searchFields: ["name", "description"],
              page: 1,
            }));
          }}
          allowClear
          className="max-w-sm"
        />

        <Button type="primary" onClick={() => openModal()}>
          Thêm lớp
        </Button>
      </div>

      <Table
        dataSource={classes}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <ClassModalForm
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingClass}
      />
    </>
  );
};

export default ManagerClassPage;
