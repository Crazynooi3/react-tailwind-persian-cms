import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Users from "./Users";

export default function Dashbord() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;

      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const fakePurchaseData = [
    { date: "05-01", product: "لپ‌تاپ", quantity: 5, amount: 25000 },
    { date: "05-02", product: "موبایل", quantity: 10, amount: 15000 },
    { date: "05-03", product: "هدفون", quantity: 15, amount: 5000 },
    { date: "05-04", product: "موس", quantity: 8, amount: 2000 },
  ];

  return (
    <>
      <div className="my-3 flex w-full items-center justify-between px-5">
        <h3 className="text-base font-bold text-slate-800 md:text-2xl">
          داشبورد گزارشات با اطلاعات فرضی
        </h3>
      </div>
      <div
        id="top-wrapper"
        className="mx-5 mt-5 mb-20 flex flex-col gap-5 rounded-md bg-gray-100 p-5 md:flex-row"
      >
        <div className="flex-2 rounded-md">
          <div className="relative flex h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
            <table className="w-full min-w-max table-auto text-right">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <th className="p-4 text-base leading-none font-semibold text-slate-500">
                    {" "}
                    no.
                  </th>
                  <th className="p-4 text-base leading-none font-semibold text-slate-500">
                    {" "}
                    نام کاربر
                  </th>
                  <th className="p-4 text-base leading-none font-semibold text-slate-500">
                    {" "}
                    وضعیت
                  </th>
                  <th className="p-4 text-base leading-none font-semibold text-slate-500">
                    {" "}
                    نام کاربری
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      1
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      احسان قناد
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      <span class="ring-green-50-600/20 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset">
                        {" "}
                        کاربر فعال
                      </span>
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      crazy_nooi3
                    </p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      2
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      احسان قناد
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      <span class="ring-green-50-600/20 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset">
                        {" "}
                        کاربر فعال
                      </span>
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      crazy_nooi3
                    </p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      3
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      احسان قناد
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      <span class="ring-green-50-600/20 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset">
                        {" "}
                        کاربر فعال
                      </span>
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      crazy_nooi3
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 className="mx-5 mt-5 text-base font-semibold"> توضیحات:</h3>
            <ul className="mx-5 my-5">
              <li>
                <p className="pt-5">
                  پروژه پیش رو یک داشبورد مدیریتی است که با فریم ورک React و با
                  کمک Tailwind نوشته شده است.
                </p>
              </li>
              <li>
                <p className="pt-5">
                  به جز صفجه اصلی که در حال حاضر در آن قرار دارید تب های دیگر
                  مدیریت شده و تمامی عملیات های مربوط به CRUD برای آن تعبیه و
                  بهینه شده است.
                </p>
              </li>
              <li>
                <p className="pt-5">
                  در بک اند این پروژه از nodeJS استفاده شده است که الگو آماده
                  برداشته شده و کمی تغییرات داشته. همچنین این پروژه جنبه تمرین
                  داشته و سعی شده در بخش های مهم که ارتباط بین سرور و سایت می
                  باشد بهترین عملکرد اراپه شود.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div dir="ltr" className="flex-1 rounded-md bg-white p-5">
          <span className="block px-4 text-right">نمودار فروش</span>
          <LineChart
            width={isMobile ? 500 : 300}
            height={isMobile ? 500 : 300}
            data={fakePurchaseData}
            className="mt-5"
          >
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
      </div>
    </>
  );
}
