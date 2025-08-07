import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Spin,
  InputNumber,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Class } from "../common/api/classApi";

import { useSubjectQuery } from "../common/hooks/useSubjectQuery";
import { useMajorsQuery } from "../common/hooks/useMajorQuery";
import { useStudentQuery, useTeacherQuery } from "../common/hooks/useUserQuery";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: any;
  initialData?: Class | null;
}

type FormValues = Omit<Class, "_id"> & {
  startDate?: string | Date;
};

const ClassModalForm = ({ open, onClose, onSubmit, initialData }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>();

  const { data: subjects, isLoading: isSubjectsLoading } = useSubjectQuery();
  const { data: majors, isLoading: isMajorsLoading } = useMajorsQuery();
  const { data: teachers, isLoading: isTeachersLoading } = useTeacherQuery();
  const { data: students, isLoading: isStudentsLoading } = useStudentQuery();
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        startDate: initialData.startDate
          ? dayjs(initialData.startDate).locale("vi-VN").toDate()
          : undefined,
      });
    } else {
      reset({});
    }
  }, [initialData, reset]);

  const submitHandler = (data: FormValues) => {
    const formattedData: Partial<Class> = {
      ...data,
      startDate: dayjs(data.startDate).toDate() ?? undefined,
    };
    onSubmit(formattedData);
  };
  const shift = [
    { label: "Ca 1 ( 7h00 - 9h00 )", value: "1" },
    { label: "Ca 2", value: "2" },
    { label: "Ca 3", value: "3" },
    { label: "Ca 4", value: "4" },
    { label: "Ca 5", value: "5" },
    { label: "Ca 6", value: "6" },
  ];

  return (
    <Modal
      open={open}
      title={initialData ? "Cập nhật lớp học" : "Thêm lớp học"}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" onFinish={handleSubmit(submitHandler)}>
        <Form.Item label="Tên lớp" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Vui lòng nhập tên lớp" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Môn học" required>
          <Controller
            name="subjectId"
            control={control}
            rules={{ required: "Vui lòng chọn môn học" }}
            render={({ field }) =>
              isSubjectsLoading ? (
                <Spin />
              ) : (
                <Select
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(value) => field.onChange(value)}
                  options={subjects?.map((s) => ({
                    label: s.name,
                    value: s._id,
                  }))}
                  placeholder="Chọn môn học"
                />
              )
            }
          />
        </Form.Item>

        <Form.Item label="Chuyên ngành" required>
          <Controller
            name="majorId"
            control={control}
            rules={{ required: "Vui lòng chọn chuyên ngành" }}
            render={({ field }) =>
              isMajorsLoading ? (
                <Spin />
              ) : (
                <Select
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(value) => field.onChange(value)}
                  options={majors?.map((m) => ({
                    label: m.name,
                    value: m._id,
                  }))}
                  placeholder="Chọn chuyên ngành"
                />
              )
            }
          />
        </Form.Item>

        <Form.Item label="Giáo viên phụ trách">
          <Controller
            name="teacherId"
            control={control}
            render={({ field }) =>
              isTeachersLoading ? (
                <Spin />
              ) : (
                <Select
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(value) => field.onChange(value)}
                  options={teachers?.map((t) => ({
                    label: t.fullname,
                    value: t._id,
                  }))}
                  placeholder="Chọn giáo viên"
                />
              )
            }
          />
        </Form.Item>
        <Form.Item label="Học viên">
          <Controller
            name="studentIds"
            control={control}
            render={({ field }) =>
              isStudentsLoading ? (
                <Spin />
              ) : (
                <Select
                  {...field}
                  mode="multiple"
                  value={field.value ?? undefined}
                  onChange={(value) => field.onChange(value)}
                  options={students?.map((t) => ({
                    label: t.fullname,
                    value: t._id,
                  }))}
                  placeholder="Chọn học viên"
                />
              )
            }
          />
        </Form.Item>

        <Form.Item label="Ngày bắt đầu">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                type="date"
                format="YYYY-MM-DD"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                style={{ width: "100%" }}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Số buổi học">
          <Controller
            name="totalSessions"
            control={control}
            render={({ field }) => <InputNumber min={1} {...field} />}
          />
        </Form.Item>

        <Form.Item label="Ca học">
          <Controller
            name="shift"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value ?? undefined}
                onChange={(value) => field.onChange(value)}
                options={shift}
                placeholder="Chọn ca học"
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            {initialData ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ClassModalForm;
