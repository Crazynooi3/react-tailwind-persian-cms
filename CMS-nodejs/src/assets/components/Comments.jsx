import React, { useEffect, useState } from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteModal";
import DetailsModal from "../components/DetailsModal";
import EditeModal from "../components/EditeModal";
import Pagination from "./Pagination";
import Attention from "./Attention";
import AcceptComment from "../components/AcceptComment";

export default function Comments({ updateProductList }) {
  const [selectedComment, setSelectedComment] = useState({});
  const [allCommentData, setAllCommentData] = useState([]);

  const updateCommentList = () => {
    fetch("http://localhost:8000/api/comments/")
      .then((response) => response.json())
      .then((data) => {
        setAllCommentData(data);
      });
  };

  useEffect(() => {
    updateCommentList();
  }, []);

  const setSelected = (data) => {
    setSelectedComment(data);
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

  const [commentLength, setCommentLength] = useState(allCommentData.length);

  useEffect(() => {
    setCommentLength(allCommentData.length);
  }, [allCommentData]);

  const numShowComment = 5;
  const [currentPage, setCurrentPage] = useState(1);

  let startNum = (currentPage - 1) * numShowComment;
  let endNum = startNum + numShowComment;
  const currentComment = allCommentData.slice(startNum, endNum);
  //   console.log(currentProducts);

  const paginationCount = Math.ceil(commentLength / numShowComment);

  return (
    <>
      {allCommentData.length <= 0 ? (
        <Attention msg="در حال حاضر نظری ثبت نشده است.در صورتی که کاربران نظرات خود را در مورد یک محصول ثبت نمایید امکان پاسخ حذف و تایید آن وجود خواهد داشت.." />
      ) : (
        ""
      )}
      <div className="rounded-md bg-gray-100 p-5">
        <div className="mt-1 mb-3 flex w-full items-center justify-between">
          <div>
            <h3 className="mb-2.5 hidden text-2xl font-bold text-slate-800 md:block">
              لیست نظرهای کاربران
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:hidden">
          <img src="/images/image.png" alt="notFind" className="w-96" />
          <span className="mt-10 text-xl">
            طراحی بخش موبایل برای این صفحه انجام نشده. مشابه بقیه صفحات است
          </span>
        </div>

        <div className="relative hidden h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md md:flex">
          <table className="w-full min-w-max table-auto text-right">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50">
                <th className="p-4 text-base leading-none font-semibold text-slate-500">
                  NO.
                </th>

                <th className="p-4 text-base leading-none font-semibold text-slate-500">
                  اسم کاربر
                </th>
                <th className="p-4 text-base leading-none font-semibold text-slate-500">
                  محصول
                </th>
                <th className="w-50 p-4 text-base leading-none font-semibold text-slate-500">
                  نظر ثبت شده
                </th>
                <th className="p-4 text-base leading-none font-semibold text-slate-500">
                  تاریخ
                </th>
                <th className="p-4 text-base leading-none font-semibold text-slate-500">
                  ساعت
                </th>
                <th className="p-4 text-base leading-none font-semibold text-slate-500">
                  {" "}
                  وضعیت
                </th>
                <th className="p-4 text-base leading-none font-semibold text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {currentComment.map((comment, index) => (
                <tr key={comment.id} className="hover:bg-slate-50">
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      {index + 1}
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      {comment.userID}
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="block text-sm font-semibold text-slate-800">
                      {comment.productID}
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p
                      className="block max-w-xs truncate text-sm font-semibold text-slate-800"
                      title={comment.body}
                    >
                      {comment.body}
                    </p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="text-sm text-slate-500">{comment.date}</p>
                  </td>
                  <td className="border-b border-slate-200 p-4 py-5">
                    <p className="text-sm text-slate-500">
                      <p className="text-sm text-slate-500">{comment.hour}</p>
                    </p>
                  </td>
                  <td className="space-x-5 border-b border-slate-200 p-4 py-5">
                    {comment.isAccept === 0 ? (
                      <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                        در انتظار بررسی
                      </span>
                    ) : (
                      <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        تایید شده
                      </span>
                    )}
                  </td>
                  <td className="space-x-5 border-b border-slate-200 p-4 py-5">
                    <button
                      className="w-6"
                      onClick={() => {
                        openAcceptModal();
                        setSelected(comment);
                      }}
                    >
                      <HandThumbUpIcon className="cursor-pointer text-slate-500 hover:text-green-700" />
                    </button>
                    <button
                      className="w-6"
                      onClick={() => {
                        openModal();
                        setSelected(comment);
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
            allCommentData={allCommentData}
            paginationCount={paginationCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productLength={commentLength}
            startNum={startNum}
            endNum={endNum}
          />
        </div>
        <DeleteModal
          url={`http://localhost:8000/api/comments/${selectedComment.id}`}
          isShow={isShowDelete}
          onClose={closeModal}
          selectedComment={selectedComment}
          allCommentData={allCommentData}
          updateList={updateCommentList}
          toastMessage={"نظر انتخاب شده حذف شد"}
        />

        <AcceptComment
          url={`http://localhost:8000/api/comments/accept/${selectedComment.id}`}
          isShow={isShowAccept}
          onClose={closeAcceptModal}
          selectedComment={selectedComment}
          allCommentData={allCommentData}
          updateList={updateCommentList}
        />
      </div>
    </>
  );
}
