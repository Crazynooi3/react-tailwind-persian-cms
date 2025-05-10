import React, { useEffect, useState } from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteModal";
import DetailsModal from "../components/DetailsModal";
import EditeModal from "../components/EditeModal";
import Pagination from "./Pagination";

export default function ProductTitle({ allProductData, updateProductList }) {
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
    <>
      <div id="ProductTitle" className="mx-5 mt-5 rounded-md md:hidden">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">لیست محصولات</h3>
            <div className="rounded-md bg-gray-800 p-3 text-white md:hidden">
              {" "}
              اضافه کردن محصول
            </div>
          </div>
        </div>
      </div>
      {currentProducts.map((product) => (
        <div
          id="productMobileWrapper"
          className="justify-centerrounded-md mx-5 mt-5 flex flex-col items-center rounded-md bg-gray-100 p-5 md:hidden"
        >
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="font-bold">{product.title}</div>
            <div className="">{product.count} عدد</div>
            <div className="">{product.price} تومان</div>
            <div className="">
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
            </div>
          </div>
        </div>
      ))}
      <div className="md:hidden">
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
    </>
  );
}
