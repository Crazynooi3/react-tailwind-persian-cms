import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function DetailsModal({
  isShow,
  onClose,
  selectedProduct,
  updateProductList,
}) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => {
      window.removeEventListener("keydown", checkKey);
    };
  }, [onClose]);

  const deleteHandler = async () => {
    // console.log("Deleting product with ID:", selectedProduct.id);
    // console.log(selectedProduct.id);
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/${selectedProduct.id}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        console.log(response);

        onClose();
        updateProductList();
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`relative z-10 ${isShow ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500/75 transition-opacity"
        // aria-hidden="true"
      ></div>

      <div
        onClick={onClose}
        // aria-hidden="true"
        class="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm"
      >
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-right text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    جزئیات محصول
                  </h3>
                  <div class="mt-2">
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
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="hover:bg-slate-50">
                          <td className="border-b border-slate-200 p-4 py-5">
                            <img
                              onError={(e) =>
                                (e.target.src = "/images/placeholder.png")
                              }
                              src={selectedProduct.img || "/images/empty.png"}
                              alt="Product 1"
                              className="h-16 w-16 rounded object-cover"
                            />
                          </td>
                          <td className="border-b border-slate-200 p-4 py-5">
                            <p className="block text-sm font-semibold text-slate-800">
                              {selectedProduct.title}
                            </p>
                          </td>
                          <td className="border-b border-slate-200 p-4 py-5">
                            <p className="text-sm text-slate-500">
                              {selectedProduct.count} عدد
                            </p>
                          </td>
                          <td className="border-b border-slate-200 p-4 py-5">
                            <p className="text-sm text-slate-500">
                              {selectedProduct.price} تومان
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => deleteHandler()}
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                حذف محصول
              </button>
              <button
                onClick={onClose}
                type="button"
                class="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal"),
  );
}
