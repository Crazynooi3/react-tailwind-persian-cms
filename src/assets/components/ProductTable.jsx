import React, { useEffect, useState } from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteModal";
import DetailsModal from "../components/DetailsModal";
import EditeModal from "../components/EditeModal";
import Pagination from "./Pagination";

export default function ProductTable({ allProductData, updateProductList }) {
  const [selectedProduct, setSelectedProduct] = useState({});

  const setSelected = (data) => {
    setSelectedProduct(data);
  };

  const [isShow, setIsShow] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isShowEdite, setIsShowEdite] = useState(false);

  const openModal = () => setIsShow(true);
  const closeModal = () => setIsShow(false);

  const openDetailsModal = () => setIsShowDetails(true);
  const closeDetailsModal = () => setIsShowDetails(false);

  const openEditesModal = () => setIsShowEdite(true);
  const closeEditesModal = () => setIsShowEdite(false);

  const [productLength, setProductLength] = useState(allProductData.length);

  useEffect(() => {
    setProductLength(allProductData.length);
  }, [allProductData]);

  const numShowProduct = 5;
  const [currentPage, setCurrentPage] = useState(1);

  let startNum = (currentPage - 1) * numShowProduct;
  let endNum = startNum + numShowProduct;
  const currentProducts = allProductData.slice(startNum, endNum);
  //   console.log(currentProducts);

  const paginationCount = Math.ceil(productLength / numShowProduct);

  return (
    <div className="rounded-md bg-gray-100 p-5">
      <div className="mt-1 mb-3 flex w-full items-center justify-between">
        <div>
          <h3 className="mb-2.5 text-2xl font-bold text-slate-800">
            لیست محصولات
          </h3>
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
        <table className="w-full min-w-max table-auto text-right">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-50">
              <th className="p-4 text-base leading-none font-semibold text-slate-500">
                تصویر محصول
              </th>
              <th className="p-4 text-base leading-none font-semibold text-slate-500">
                اسم محصول
              </th>
              <th className="p-4 text-base leading-none font-semibold text-slate-500">
                موجودی فعلی
              </th>
              <th className="p-4 text-base leading-none font-semibold text-slate-500">
                قیمت محصول
              </th>
              <th className="p-4 text-base leading-none font-semibold text-slate-500"></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.div} className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-4 py-5">
                  <img
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                    src={product.img || "/images/empty.png"}
                    alt={product.img ? product.title : "تصویر موجود نیست"}
                    className="h-16 w-16 rounded object-cover"
                  />
                </td>
                <td className="border-b border-slate-200 p-4 py-5">
                  <p className="block text-sm font-semibold text-slate-800">
                    {product.title}
                  </p>
                </td>
                <td className="border-b border-slate-200 p-4 py-5">
                  <p className="text-sm text-slate-500">
                    {product.count.toLocaleString("fa-IR")} عدد
                  </p>
                </td>
                <td className="border-b border-slate-200 p-4 py-5">
                  <p className="text-sm text-slate-500">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                </td>
                <td className="space-x-5 border-b border-slate-200 p-4 py-5">
                  <button
                    className="w-6"
                    onClick={() => {
                      openDetailsModal();
                      setSelected(product);
                    }}
                  >
                    <DocumentMagnifyingGlassIcon className="cursor-pointer text-slate-500 hover:text-slate-700" />
                  </button>
                  <button
                    className="w-6"
                    onClick={() => {
                      openModal();
                      setSelected(product);
                    }}
                  >
                    <TrashIcon className="cursor-pointer text-slate-500 hover:text-red-700" />
                  </button>
                  <button
                    className="w-6"
                    onClick={() => {
                      openEditesModal();
                      setSelected(product);
                    }}
                  >
                    <PencilSquareIcon className="cursor-pointer text-slate-500 hover:text-green-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          allProductData={allProductData}
          paginationCount={paginationCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productLength={productLength}
          startNum={startNum}
          endNum={endNum}
        />
      </div>
      <DeleteModal
        url={`http://localhost:8000/api/products/${selectedProduct.id}`}
        isShow={isShow}
        onClose={closeModal}
        selectedProduct={selectedProduct}
        allProductData={allProductData}
        updateList={updateProductList}
        toastMessage={"محصول انتخاب شده با موفقیت حذف شد"}
      />
      <DetailsModal
        isShow={isShowDetails}
        onClose={closeDetailsModal}
        selectedProduct={selectedProduct}
        updateProductList={updateProductList}
      />
      <EditeModal
        isShow={isShowEdite}
        onClose={closeEditesModal}
        selectedProduct={selectedProduct}
        updateProductList={updateProductList}
      />
    </div>
  );
}
