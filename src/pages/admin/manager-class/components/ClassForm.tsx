import { Form, Input, DatePicker, Select, InputNumber, Button } from "antd";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllMajors } from "../../../../common/api/majorApi";
import { getAllUser } from "../../../../common/api/userApi";
import { getAllSubjects } from "../../../../common/api/subjectApi";
import dayjs from "dayjs";

interface ClassFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const SHIFT_OPTIONS = [
  { label: "Ca 1 (07:00 - 09:00)", value: "1" },
  { label: "Ca 2", value: "2" },
  { label: "Ca 3", value: "3" },
  { label: "Ca 4", value: "4" },
  { label: "Ca 5", value: "5" },
  { label: "Ca 6", value: "6" },
];

const ROOM_OPTIONS = [
  { label: "Online", value: "Online" },
  { label: "A101", value: "A101" },
  { label: "F204", value: "F204" },
];

const ClassForm = ({ initialValues, onSubmit, loading }: ClassFormProps) => {
  const [form] = Form.useForm();

  // fetch majors
  const { data: majors } = useQuery({
    queryKey: ["majors"],
    queryFn: () => getAllMajors(),
  });

  // fetch teachers
  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllUser({ role: "teacher" }),
  });

  // fetch subjects
  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getAllSubjects(),
  });

  // khi có initialValues (edit), set vào form
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        teacherId: initialValues.teacherId?.fullname,
        subjectId: initialValues.subjectId?.name,
        majorId: initialValues.majorId?.name,
        startDate: initialValues.startDate
          ? dayjs(initialValues.startDate)
          : null,
        sessionDates: initialValues.sessionDates
          ? initialValues.sessionDates.map((d: string) => dayjs(d))
          : [],
      });
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      startDate: values.startDate
        ? dayjs(values.startDate).toISOString()
        : null,
      sessionDates: values.sessionDates
        ? values.sessionDates.map((d: any) => dayjs(d).toISOString())
        : [],
    };
    onSubmit(payload);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Tên lớp"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}
      >
        <Input placeholder="Nhập tên lớp" />
      </Form.Item>

      <Form.Item
        label="Ngày học trong tuần"
        name="daysOfWeek"
        rules={[{ required: true, message: "Vui lòng nhập ngày học" }]}
      >
        <Input placeholder="Ví dụ: 2-4-6 hoặc 3-5-7" />
      </Form.Item>

      {/* Chuyên ngành */}
      <Form.Item
        label="Chuyên ngành"
        name="majorId"
        rules={[{ required: true, message: "Vui lòng chọn chuyên ngành" }]}
      >
        <Select
          placeholder="Chọn chuyên ngành"
          options={majors?.data.map((m: any) => ({
            label: m.name,
            value: m._id,
          }))}
        />
      </Form.Item>

      {/* Môn học */}
      <Form.Item
        label="Môn học"
        name="subjectId"
        rules={[{ required: true, message: "Vui lòng chọn môn học" }]}
      >
        <Select
          placeholder="Chọn môn học"
          options={subjects?.data.map((s: any) => ({
            label: s.name,
            value: s._id,
          }))}
        />
      </Form.Item>

      {/* Giáo viên */}
      <Form.Item
        label="Giáo viên phụ trách"
        name="teacherId"
        rules={[{ required: true, message: "Vui lòng chọn giáo viên" }]}
      >
        <Select
          placeholder="Chọn giáo viên"
          showSearch
          options={teachers?.data.map((t: any) => ({
            label: t.fullname,
            value: t._id,
          }))}
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item label="Ngày bắt đầu" name="startDate">
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Số buổi học" name="totalSessions" initialValue={100}>
        <InputNumber min={1} max={100} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Ca học"
        name="shift"
        rules={[{ required: true, message: "Vui lòng chọn ca học" }]}
      >
        <Select placeholder="Chọn ca học" options={SHIFT_OPTIONS} />
      </Form.Item>

      <Form.Item
        label="Phòng học"
        name="room"
        rules={[{ required: true, message: "Vui lòng chọn phòng học" }]}
      >
        <Select placeholder="Chọn phòng học" options={ROOM_OPTIONS} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
