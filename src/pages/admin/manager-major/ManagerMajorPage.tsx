import React, { useEffect, useState } from "react";
import {
  useMajorsQuery,
  useCreateMajor,
  useUpdateMajor,
  useDeleteMajor,
  useRestoreMajor,
} from "../../../common/hooks/useMajorQuery";
import {
  DeleteOutlined,
  EditOutlined,
  RotateLeftOutlined,
} from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { Major } from "../../../common/api/majorApi";
import {
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  Tag,
  Popconfirm,
} from "antd";

const ManagerMajorPage = () => {
  const { data: majors, isLoading } = useMajorsQuery();
  const createMutation = useCreateMajor();
  const updateMutation = useUpdateMajor();
  const deleteMutation = useDeleteMajor();
  const restoreMutation = useRestoreMajor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const { handleSubmit, reset, formState, getValues, control } =
    useForm<Omit<Major, "_id">>();
  console.log(formState.errors);

  const openModal = (major?: Major) => {
    console.log("Open modal with major:", major);
    if (major) {
      console.log(major);
      setEditingMajor(major);
      console.log("Setting values for editing:", getValues());
      reset({
        code: major.code,
        name: major.name,
        description: major.description,
      });
    } else {
      setEditingMajor(null);
      reset({
        code: "",
        name: "",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingMajor(null);
  };

  const onSubmit = async (data: Omit<Major, "_id">) => {
    try {
      if (editingMajor) {
        await updateMutation.mutateAsync({ id: editingMajor._id, data });
        message.success("Cập nhật thành công!");
      } else {
        await createMutation.mutateAsync(data);
        message.success("Thêm mới thành công!");
      }
      closeModal();
    } catch {
      message.error("Đã có lỗi xảy ra.");
    }
  };

  const onDelete = async (id: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xoá?",
      okText: "Xoá",
      cancelText: "Huỷ",
      okType: "danger",
      onOk: async () => {
        await deleteMutation.mutateAsync(id);
        message.success("Xoá thành công!");
      },
    });
  };

  const columns = [
    {
      title: "Mã ngành",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên ngành",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "deletedAt",
      key: "deletedAt",
      width: 120,
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
      render: (_: any, record: Major) => (
        <div className="space-x-2">
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          {!record.deletedAt ? (
            <Popconfirm
              title="Bạn chắc chắn muốn xóa?"
              onConfirm={() => deleteMutation.mutate(record._id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" danger>
                <DeleteOutlined /> Xoá
              </Button>
            </Popconfirm>
          ) : (
            <Button
              type="link"
              onClick={() => restoreMutation.mutate(record._id)}
            >
              <RotateLeftOutlined />
              Khôi phục
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý ngành học</h1>
        <Button type="primary" onClick={() => openModal()}>
          Thêm ngành
        </Button>
      </div>

      <Table
        dataSource={majors?.filter((m) => !m.isDeleted)}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        title={editingMajor ? "Cập nhật ngành" : "Thêm ngành"}
        destroyOnClose
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Form.Item label="Mã ngành">
            <Controller
              name="code"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập mã ngành" />
              )}
            />
          </Form.Item>
          <Form.Item label="Tên ngành">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập tên ngành" />
              )}
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder="Nhập mô tả" rows={4} />
              )}
            />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={closeModal}>Huỷ</Button>
            <Button type="primary" htmlType="submit">
              {editingMajor ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManagerMajorPage;
