import { Button, Tag } from "antd";
import {
  BookOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  StarFilled,
} from "@ant-design/icons";

const mockCourses = [
  {
    id: 1,
    title: "Lập trình Web Fullstack",
    description:
      "Học từ frontend đến backend: React, Node.js, Express, MongoDB.",
    image:
      "https://topdev.vn/blog/wp-content/uploads/2023/12/lo-trinh-tro-thanh-fullstack-developer-1.jpg",
    duration: "6 tháng",
    level: "Beginner → Advanced",
    students: 320,
    rating: 4.8,
    price: "3.500.000đ",
  },
  {
    id: 2,
    title: "Lập trình Frontend chuyên sâu",
    description: "Thành thạo HTML, CSS, JavaScript, React và TypeScript.",
    image: "https://t3h.com.vn/photos/1/Kh%C3%B3a%20ReactJS/t3h-reactJS.jpg",
    duration: "3 tháng",
    level: "Intermediate",
    students: 210,
    rating: 4.7,
    price: "2.500.000đ",
  },
  {
    id: 3,
    title: "Backend với NodeJS & Express",
    description: "Xây dựng REST API, JWT Auth, MongoDB, PostgreSQL.",
    image:
      "https://www.weblineindia.com/wp-content/uploads/2023/10/NodeJS-for-Backend.jpg",
    duration: "4 tháng",
    level: "Intermediate",
    students: 180,
    rating: 4.6,
    price: "2.800.000đ",
  },
];

const CoursesPage = () => {
  return (
    <section className="py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-[#000080] mb-4">
          Danh sách khóa học
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Chọn khóa học phù hợp với bạn. Các khóa học được thiết kế{" "}
          <b>thực chiến</b>, cập nhật công nghệ mới nhất, cam kết bạn có thể đi
          làm ngay sau khi hoàn thành.
        </p>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-[#000080] mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm flex-1">
                {course.description}
              </p>

              {/* Thông tin chi tiết */}
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-[#000080]" />{" "}
                  {course.duration}
                </p>
                <p>
                  <Tag color="blue">{course.level}</Tag>
                </p>
                <p className="flex items-center gap-2">
                  <TeamOutlined className="text-[#000080]" /> {course.students}{" "}
                  học viên
                </p>
                <p className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled
                      key={i}
                      className={
                        i < Math.round(course.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{course.rating}/5</span>
                </p>
              </div>

              {/* Giá & nút */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-[#000080]">
                  {course.price}
                </span>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  className="bg-[#000080] hover:!bg-blue-900"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesPage;
