import React, { useEffect, useState } from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteModal";
import DetailsModal from "../components/DetailsModal";
import EditeModal from "../components/EditeModal";
import Pagination from "./Pagination";
import Attention from "./Attention";
import AcceptComment from "../components/AcceptComment";
import EditeUserModal from "./EditeUserModal";

export default function Users({ updateProductList }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [allUserData, setAllUserData] = useState([]);

  const [passwordVisibility, setPasswordVisibility] = useState({});

  const updateUserList = () => {
    fetch("http://localhost:8000/api/users/")
      .then((response) => response.json())
      .then((data) => {
        setAllUserData(data);
        const initialVisibility = data.reduce((acc, user) => {
          acc[user.id] = false;
          return acc;
        }, {});
        setPasswordVisibility(initialVisibility);
      });
  };

  useEffect(() => {
    updateUserList();
  }, []);

  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const setSelected = (data) => {
    setSelectedUser(data);
  };

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isShowEdite, setIsShowEdite] = useState(false);
  const [isShowAccept, setIsShowAccept] = useState(false);

  const openModal = () => setIsShowDelete(true);
  const closeModal = () => setIsShowDelete(false);

  const openDetailsModal = () => setIsShowDetails(true);
  const closeDetailsModal = () => setIsShowDetails(false);

  const openEditesModal = () => setIsShowEdite(true);
  const closeEditesModal = () => setIsShowEdite(false);

  const openAcceptModal = () => setIsShowAccept(true);
  const closeAcceptModal = () => setIsShowAccept(false);

  const [userLength, setUserLength] = useState(allUserData.length);

  useEffect(() => {
    setUserLength(allUserData.length);
  }, [allUserData]);

  const numShowUser = 5;
  const [currentPage, setCurrentPage] = useState(1);

  let startNum = (currentPage - 1) * numShowUser;
  let endNum = startNum + numShowUser;
  const currentUser = allUserData.slice(startNum, endNum);
  //   console.log(currentProducts);

  const paginationCount = Math.ceil(userLength / numShowUser);

  const [showPassword, setShowPassword] = useState(false);
  const showPass = (data) => {
    setShowPassword(data);
  };
  return (
    <>
      {allUserData.length <= 0 ? (
        <Attention msg="کاربری یافت نشد. بعد از ثبت نام کاربران لیست کاربران سایت قابل نمایش است." />
      ) : (
        ""
      )}
      <div className="flex flex-col items-center justify-center md:hidden">
        <img src="/images/image.png" alt="notFind" className="w-96" />
        <span className="mt-10 text-xl">
          طراحی بخش موبایل برای این صفحه انجام نشده. مشابه بقیه صفحات است
        </span>
      </div>
      <div className="hidden rounded-md bg-gray-100 p-5 md:block">
        <div className="mt-1 mb-3 flex w-full items-center justify-between">
          <div>
            <h3 className="mb-2.5 text-2xl font-bold text-slate-800">
              لیست کاربران سایت
            </h3>
          </div>
        </div>

        <div className="relative flex h-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
          <table className="w-full table-auto text-right">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50">
                <th className="p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  NO.
                </th>

                <th className="max-w-min p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  نام و نام خانوادگی
                </th>
                <th className="p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  نام‌کاربری
                </th>
                <th className="p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  پسورد
                </th>
                <th className="p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  شماره همراه
                </th>
                <th className="p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  ایمیل
                </th>
                <th className="p-3 text-base leading-none font-semibold text-nowrap text-slate-500">
                  آدرس
                </th>

                <th className="hidden p-3 text-base leading-none font-semibold text-nowrap text-slate-500 2xl:table-cell">
                  امتیاز کاربر
                </th>
                <th className="hidden p-3 text-base leading-none font-semibold text-nowrap text-slate-500 2xl:table-cell">
                  مجموع خرید
                </th>

                <th className="p-3 text-base leading-none font-semibold text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {currentUser.map((User, index) => (
                <tr key={User.id} className="hover:bg-slate-50">
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      {index + 1}
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block max-w-min text-sm font-semibold text-nowrap text-slate-800">
                      {`${User.firsname + " " + User.lastname}`}
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      {User.username}
                    </p>
                  </td>
                  <td className="h-full border-b border-slate-200 p-4 py-5">
                    <div className="inline-flex items-center space-x-2">
                      <input
                        type={
                          passwordVisibility[User.id] === false
                            ? "password"
                            : "text"
                        }
                        disabled={true}
                        value={User.password}
                        className="max-w-20 py-2 text-sm font-semibold text-slate-800 outline-none"
                      ></input>
                      <span className="flex">
                        {passwordVisibility[User.id] === false ? (
                          <span
                            className="cursor-pointer"
                            onClick={() => togglePasswordVisibility(User.id)}
                          >
                            <EyeIcon className="w-4" />
                          </span>
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={() => togglePasswordVisibility(User.id)}
                          >
                            <EyeSlashIcon className="w-4" />
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <a
                      href={`tel:${User.phone}`}
                      className="text-sm text-slate-500"
                    >
                      {User.phone}
                    </a>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="text-sm text-slate-500">
                      <a
                        href={`mailto:${User.email}`}
                        className="text-sm text-slate-500"
                      >
                        {User.email}
                      </a>
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p
                      className="block max-w-50 truncate text-sm text-slate-500"
                      title={User.city + " - " + User.address}
                    >
                      {`${User.city + " - " + User.address}`}
                    </p>
                  </td>
                  <td className="hidden border-b border-slate-200 p-4 py-5 2xl:table-cell">
                    <p className="text-sm text-slate-500">
                      <p className="text-sm text-slate-500">{User.score}</p>
                    </p>
                  </td>
                  <td className="hidden border-b border-slate-200 p-4 py-5 2xl:table-cell">
                    <p className="text-sm text-slate-500">
                      <p className="text-sm text-slate-500">{User.buy}</p>
                    </p>
                  </td>
                  <td className="space-x-5 border-b border-slate-200 p-4 py-5">
                    <button
                      className="w-6"
                      onClick={() => {
                        openEditesModal();
                        setSelected(User);
                      }}
                    >
                      <PencilSquareIcon className="cursor-pointer text-slate-500 hover:text-green-700" />
                    </button>
                    <button
                      className="w-6"
                      onClick={() => {
                        openModal();
                        setSelected(User);
                      }}
                    >
                      <TrashIcon className="cursor-pointer text-slate-500 hover:text-red-700" />
                    </button>
                    {/* <button
                      className="w-6"
                      onClick={() => {
                        openEditesModal();
                        setSelected(comment);
                      }}
                    >
                      <PencilSquareIcon className="cursor-pointer text-slate-500 hover:text-green-700" />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            allCommentData={allUserData}
            paginationCount={paginationCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productLength={userLength}
            startNum={startNum}
            endNum={endNum}
          />
        </div>
        <DeleteModal
          url={`http://localhost:8000/api/users/${selectedUser.id}`}
          isShow={isShowDelete}
          onClose={closeModal}
          selectedComment={selectedUser}
          allCommentData={allUserData}
          updateList={updateUserList}
          toastMessage={"کاربر انتخاب شده حذف شد"}
        />

        <EditeUserModal
          url={`http://localhost:8000/api/users/${selectedUser.id}`}
          isShow={isShowEdite}
          onClose={closeEditesModal}
          selectedUser={selectedUser}
          updateUserList={updateUserList}
        />
      </div>
    </>
  );
}
