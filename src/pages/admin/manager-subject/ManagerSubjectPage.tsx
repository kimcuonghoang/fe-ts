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
import { useMemo, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";

import {
  useCreateSubject,
  useRestoreSubject,
  useSoftDeleteSubject,
  useSubjectsQuery,
  useUpdateSubject,
} from "../../../common/hooks/useSubjectQuery";
import { Subject } from "../../../common/types/subject";
import { Params } from "../../../common/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../../../common/validations/subjectSchema";

const ManagerSubjectPage = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 5,
  });
  const { data, isLoading } = useSubjectsQuery(params);
  const createMutation = useCreateSubject();
  const updateMutation = useUpdateSubject();
  const softDeleteMutation = useSoftDeleteSubject();
  const restoreMutation = useRestoreSubject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      editingSubject ? createSubjectSchema : updateSubjectSchema
    ) as Resolver<Omit<Subject, "_id" | "code">>,
  });
  const openModal = (subject?: Subject) => {
    if (subject) {
      setEditingSubject(subject);
      reset({
        name: subject.name,
        englishName: subject.englishName,
        description: subject.description,
      });
    } else {
      setEditingSubject(null);
      reset({
        name: "",
        description: "",
        englishName: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingSubject(null);
  };

  const onSubmit = async (data: Omit<Subject, "_id">) => {
    try {
      if (editingSubject) {
        await updateMutation.mutateAsync({ id: editingSubject._id, data });
      } else {
        await createMutation.mutateAsync(data);
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
        title: "Tên môn",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "englishName",
        dataIndex: "englishName",
        key: "englishName",
      },
      {
        title: "Mã môn",
        dataIndex: "code",
        key: "code",
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
        render: (_: any, record: Subject) => (
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
    ],
    []
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý môn học</h1>
        <Button type="primary" onClick={() => openModal()}>
          Thêm môn
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
        title={editingSubject ? "Cập nhật môn" : "Thêm môn"}
        destroyOnClose
      >
        <Form onFinish={handleSubmit(onSubmit)} className="space-y-4">
          <Form.Item
            label="Tên môn"
            required
            help={errors.name?.message}
            validateStatus={errors.name ? "error" : ""}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập tên môn" />
              )}
            />
          </Form.Item>
          <Form.Item
            label="English Name"
            required
            help={errors.englishName?.message}
            validateStatus={errors.englishName ? "error" : ""}
          >
            <Controller
              name="englishName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập mã môn" />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            required
            help={errors.description?.message}
            validateStatus={errors.description ? "error" : ""}
          >
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
              {editingSubject ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerSubjectPage;
