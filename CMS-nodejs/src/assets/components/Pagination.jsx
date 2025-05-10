import React, { useState, useEffect } from "react";

export default function Pagination({
  paginationCount,
  currentPage,
  setCurrentPage,
  productLength,
  startNum,
  endNum,
}) {
  //   console.log(allProductData.length);

  const createPaginationBtt = () => {
    const buttons = [];

    for (let index = 1; index <= paginationCount; index++) {
      //   console.log(index);

      buttons.push(
        <a
          href="#"
          aria-current="page"
          className={`${
            currentPage === index
              ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(index);
          }}
        >
          {index}
        </a>,
      );
      //   console.log(buttons);
    }
    return buttons;
  };

  return (
    <div className="">
      <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-4 md:border-t md:border-gray-200">
        <div class="flex flex-1 justify-between sm:hidden">
          <a
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((perv) => {
                if ((perv = 1)) {
                  return perv;
                }
                return perv - 1;
              });
            }}
            href="#"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            صفحه قبلی
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((perv) => {
                if ((perv = paginationCount)) {
                  return perv;
                }
                return perv + 1;
              });
            }}
            id="perveus"
            href="#"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            صفحه بعدی
          </a>
        </div>
        <div class="hidden flex-1 flex-row-reverse items-center justify-between sm:flex">
          <div>
            <p class="mx-1 text-sm text-gray-700">
              نمایش محصولات
              <span class="mx-1 font-medium">{startNum + 1}</span>
              تا
              <span class="mx-1 font-medium">{endNum}</span>
              از
              <span class="mx-1 font-medium">{productLength}</span>
              نتیجه پیدا شده
            </p>
          </div>
          <div>
            <nav
              class="isolate inline-flex -space-x-px rounded-md shadow-xs"
              aria-label="Pagination"
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((perv) => {
                    if ((perv = 1)) {
                      return perv;
                    }
                    return perv - 1;
                  });
                }}
                href="#"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

              {createPaginationBtt()}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((perv) => {
                    if ((perv = paginationCount)) {
                      return perv;
                    }
                    return perv + 1;
                  });
                }}
                id="next"
                href="#"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
