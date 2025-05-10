import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { H1Icon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

export default function DetailsModal({
  isShow,
  onClose,
  selectedProduct,
  updateProductList,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(selectedProduct);
    // console.log(formData);
  }, [selectedProduct]);

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

  const [newTitle, setNewTitle] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImg, setNewImg] = useState("");

  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    const isValidTitle =
      newTitle.trim() !== "" &&
      /^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s]+$/.test(
        newTitle.trim(),
      );
    setIsTitleValid(isValidTitle);
  }, [newTitle]);

  const [isPriceValid, setIsPriceValid] = useState(false);

  useEffect(() => {
    const isValidNumber = /^\d+$/.test(newPrice);
    setIsPriceValid(newPrice !== "" && isValidNumber);
  }, [newPrice]);

  const [isCountValid, setIsCountValid] = useState(false);

  useEffect(() => {
    const isValidNumber = /^\d+$/.test(newCount);
    setIsCountValid(newCount !== "" && isValidNumber);
  }, [newCount]);

  const [isImgValid, setIsImgValid] = useState(false);

  useEffect(() => {
    if (newImg != "") {
      setIsImgValid(true);
    } else {
      setIsImgValid(false);
    }
  }, [newImg]);

  const [submitValid, setSubmitValid] = useState(false);

  useEffect(() => {
    if (isImgValid && isCountValid && isPriceValid && isTitleValid) {
      setSubmitValid(true);
    } else {
      setSubmitValid(false);
    }
  }, [newTitle, newPrice, newCount, newImg]);

  const editeProductHandler = () => {
    const productToEdit = {
      title: newTitle,
      price: parseInt(newPrice, 10), // تبدیل به عدد
      count: parseInt(newCount, 10), // تبدیل به عدد
      img: newImg,
      popularity: 1,
      sale: 0,
      colors: 1,
    };

    fetch(`http://localhost:8000/api/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToEdit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        updateProductList();
        toast.success("محصول با موفقیت ویرایش شد!");
        setNewTitle("");
        setNewPrice("");
        setNewCount("");
        setNewImg("");
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("مشکلی در ویرایش  محصول رخ داد!");
      });
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
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-right text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    ویرایش محصول
                  </h3>
                  <div class="mt-2">
                    <div
                      id="input-wrapper"
                      className="mt-5 grid grid-cols-2 gap-5"
                    >
                      <div id="add-new-pro">
                        <div class="relative">
                          <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            type="text"
                            class="ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                            placeholder={formData.title}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <H1Icon className="w-4 text-white" />
                          </button>
                        </div>
                      </div>

                      <div id="add-new-pro">
                        <div class="relative">
                          <input
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            type="number"
                            class={`ease w-full ${!isPriceValid && newPrice.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none`}
                            placeholder={formData.price}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <BanknotesIcon className="w-4 text-white" />
                          </button>
                          {!isPriceValid && newPrice.trim() !== "" ? (
                            <span className="text-xs font-light text-red-400">
                              لطفا اعداد انگلیسی صحیح وارد کنید
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div id="add-new-pro">
                        <div class="relative text-right">
                          <input
                            value={newCount}
                            onChange={(e) => setNewCount(e.target.value)}
                            type="number"
                            class={`ease w-full ${!isCountValid && newCount.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} rounded-md border bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow`}
                            placeholder={formData.count}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <CircleStackIcon className="w-4 text-white" />
                          </button>
                          {!isCountValid && newCount.trim() !== "" ? (
                            <span className="text-xs font-light text-red-400">
                              لطفا اعداد انگلیسی صحیح وارد کنید
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div id="add-new-pro">
                        <div class="relative">
                          <input
                            value={newImg}
                            onChange={(e) => setNewImg(e.target.value)}
                            type="email"
                            class="ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                            placeholder={formData.img}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <ArrowUpTrayIcon className="w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => editeProductHandler()}
                disabled={!submitValid}
                type="button"
                class={`inline-flex w-full ${
                  submitValid
                    ? "cursor-pointer bg-green-600 hover:bg-green-500"
                    : "cursor-not-allowed bg-gray-200"
                } shadow-xssm:ml-3 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white sm:w-auto`}
              >
                ویرایش محصول
              </button>
              <button
                onClick={onClose}
                type="button"
                class={`mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto`}
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
