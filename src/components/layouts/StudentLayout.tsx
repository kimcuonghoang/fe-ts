import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const StudentLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto w-full px-4 py-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default StudentLayout;
