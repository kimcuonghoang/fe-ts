import React from "react";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

type Props = {};

const CommonLayout = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
