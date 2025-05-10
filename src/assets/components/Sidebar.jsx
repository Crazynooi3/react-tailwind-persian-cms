import React from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const userLocation = useLocation();

  return (
    <>
      <div
        id="sidebar"
        className="sticky hidden min-h-screen min-w-72 md:block"
      >
        <div
          id="sidebar-wapper"
          className="h-full w-full bg-gray-900 px-6 py-4"
        >
          <div
            id="sidebar-title"
            className="mb-5 flex items-center gap-3 text-xl font-semibold text-white"
          >
            <img
              className="w-12"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Logo"
            />
            <span>داشبورد مدیریتی</span>
          </div>
          <div id="sidebar-main-menu">
            <ul className="space-y-2 text-base font-semibold text-gray-400">
              <Link to={"/"}>
                <li
                  className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${userLocation.pathname === "/" ? "bg-gray-800" : ""} hover:text-white`}
                >
                  <HomeIcon className="text-gray- w-6 peer-hover:text-white" />
                  <span>صفحه اصلی</span>
                </li>
              </Link>
              <hr />
              <Link to={"/products"}>
                <li
                  className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${userLocation.pathname === "/products" ? "bg-gray-800" : ""} hover:text-white`}
                >
                  <FolderIcon className="text-gray- w-6 peer-hover:text-white" />
                  <span>محصولات</span>
                </li>
              </Link>
              <Link to={"/Comments"}>
                <li
                  className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${userLocation.pathname === "/Comments" ? "bg-gray-800" : ""} hover:text-white`}
                >
                  <ChatBubbleBottomCenterTextIcon className="text-gray- w-6 peer-hover:text-white" />
                  <span>کامنت ها</span>
                </li>
              </Link>
              <Link to={"/users"}>
                <li
                  className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${userLocation.pathname === "/users" ? "bg-gray-800" : ""} hover:text-white`}
                >
                  <UsersIcon className="text-gray- w-6 peer-hover:text-white" />
                  <span>کاربران</span>
                </li>
              </Link>
              <Link to={"/orders"}>
                <li
                  className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${userLocation.pathname === "/orders" ? "bg-gray-800" : ""} hover:text-white`}
                >
                  <ShoppingBagIcon className="text-gray- w-6 peer-hover:text-white" />
                  <span>سفارشات</span>
                </li>
              </Link>
              <Link to={"/offers"}>
                <li
                  className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${userLocation.pathname === "/offers" ? "bg-gray-800" : ""} hover:text-white`}
                >
                  <FireIcon className="text-gray- w-6 peer-hover:text-white" />
                  <span>تخفیف ها</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
