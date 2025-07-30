import React from "react";
import { Card, Typography, Button } from "antd";
import { BookOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const mockCourses = [
  {
    id: 1,
    title: "Lập trình Web Fullstack",
    description: "Từ frontend đến backend với React, Node.js, MongoDB.",
    image: "/course1.jpg",
  },
  {
    id: 2,
    title: "Lập trình Frontend chuyên sâu",
    description: "Thành thạo HTML, CSS, JavaScript, React và TypeScript.",
    image: "/course2.jpg",
  },
  {
    id: 3,
    title: "Backend với NodeJS & Express",
    description: "Xây dựng API RESTful, JWT Auth, MongoDB, PostgreSQL.",
    image: "/course3.jpg",
  },
];

const CoursesPage = () => {
  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <Title level={2} className="text-blue-600">
          Danh sách khóa học
        </Title>
        <Paragraph className="text-gray-600 max-w-xl mx-auto">
          Các khóa học được thiết kế bài bản, thực chiến, phù hợp cho người mới
          bắt đầu đến nâng cao.
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4">
        {mockCourses.map((course) => (
          <Card
            key={course.id}
            cover={
              <img
                alt={course.title}
                src={course.image}
                className="h-48 object-cover"
              />
            }
            className="rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Title level={4}>{course.title}</Title>
            <Paragraph>{course.description}</Paragraph>
            <Button
              type="primary"
              icon={<BookOutlined />}
              className="bg-blue-600 hover:bg-blue-700"
              block
            >
              Xem chi tiết
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
