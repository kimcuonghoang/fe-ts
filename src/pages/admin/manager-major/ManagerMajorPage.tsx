import {
  DeleteOutlined,
  EditOutlined,
  RotateLeftOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Tag,
} from "antd";
import { useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateMajor,
  useMajorsQuery,
  useRestoreMajor,
  useSoftDeleteMajor,
  useUpdateMajor,
} from "../../../common/hooks/useMajorQuery";
import { Major } from "../../../common/types/major";
import { Params } from "../../../common/types/api";

const ManagerMajorPage = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useMajorsQuery(params);
  const createMutation = useCreateMajor();
  const updateMutation = useUpdateMajor();
  const softDeleteMutation = useSoftDeleteMajor();
  const restoreMutation = useRestoreMajor();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const { handleSubmit, reset, control } = useForm<Omit<Major, "_id">>();

  const openModal = (major?: Major) => {
    if (major) {
      setEditingMajor(major);
      reset({
        code: major.code,
        name: major.name,
        description: major.description,
      });
    } else {
      setEditingMajor(null);
      reset({ code: "", name: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingMajor(null);
  };

  const onSubmit = async (formData: Omit<Major, "_id">) => {
    try {
      if (editingMajor) {
        await updateMutation.mutateAsync({
          id: editingMajor._id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      closeModal();
    } catch {
      message.error("Đã có lỗi xảy ra.");
    }
  };

  const handleSearch = (value: string) => {
    setParams((prev) => ({
      ...prev,
      search: value.trim(),
      page: 1,
    }));
  };

  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    setParams((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.field || undefined,
      order:
        sorter.order === "ascend"
          ? "asc"
          : sorter.order === "descend"
          ? "desc"
          : undefined,
    }));
  };

  const columns = useMemo(
    () => [
      {
        title: "Mã ngành",
        dataIndex: "code",
        key: "code",
        sorter: true,
      },
      {
        title: "Tên ngành",
        dataIndex: "name",
        key: "name",
        sorter: true,
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
              <EditOutlined />
            </Button>
            {!record.deletedAt ? (
              <Popconfirm
                title="Bạn chắc chắn muốn xóa?"
                onConfirm={() => softDeleteMutation.mutate(record._id)}
              >
                <Button type="link" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ) : (
              <Button
                type="link"
                onClick={() => restoreMutation.mutate(record._id)}
                icon={<RotateLeftOutlined />}
              />
            )}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý ngành học</h1>
        <Button type="primary" onClick={() => openModal()}>
          Thêm ngành
        </Button>
      </div>

      <Input.Search
        placeholder="Tìm kiếm ngành..."
        onSearch={handleSearch}
        allowClear
        className="mb-4 max-w-sm"
      />

      <Table
        dataSource={data?.data || []}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.meta.total,
        }}
        onChange={handleTableChange}
      />

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        title={editingMajor ? "Cập nhật ngành" : "Thêm ngành"}
        destroyOnClose
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Form.Item label="Mã ngành" required>
            <Controller
              name="code"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Tên ngành" required>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input.TextArea {...field} rows={4} />}
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
