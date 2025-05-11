import React, { useState, useEffect, useRef } from "react";
import { H1Icon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Attention from "./Attention";
import ProductTable from "./ProductTable";
import toast, { Toaster } from "react-hot-toast";
import ProductTitle from "./ProductTitle";

export default function Products() {
  const fileInputRef = useRef(null);
  const [allProductData, setAllProductData] = useState([]);
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

  const updateProductList = () => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        setAllProductData(data);
      });
  };

  useEffect(() => {
    updateProductList();
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImg, setNewImg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // ایجاد پیش‌نمایش
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // آپلود خودکار
      const formData = new FormData();
      formData.append("image", file);

      fetch("http://localhost:8000/api/products/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.filePath) {
            setNewImg(data.filePath); // مسیر تصویر رو ذخیره کن
            toast.success("تصویر با موفقیت آپلود شد!");
          } else {
            toast.error(data.message || "خطا در آپلود تصویر!");
            setSelectedFile(null);
            setPreview(null);
          }
        })
        .catch((error) => {
          console.error("خطا:", error);
          toast.error("خطا در آپلود تصویر!");
          setSelectedFile(null);
          setPreview(null);
        });
    }
  };

  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    const isValidTitle =
      newTitle.trim() !== "" &&
      /^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s]+$/.test(
        newTitle.trim()
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
    setIsImgValid(newImg !== ""); // تصویر معتبره اگه مسیر داشته باشیم
  }, [newImg]);

  const [submitValid, setSubmitValid] = useState(false);

  useEffect(() => {
    if (isCountValid && isPriceValid && isTitleValid) {
      setSubmitValid(true);
    } else {
      setSubmitValid(false);
    }
  }, [newTitle, newPrice, newCount]);

  const addProductHandler = () => {
    const toastId = toast.loading("در حال اضافه کردن محصول ...");
    const productToAdd = {
      title: newTitle,
      price: parseInt(newPrice, 10), // تبدیل به عدد
      count: parseInt(newCount, 10), // تبدیل به عدد
      img: newImg,
      popularity: 1,
      sale: 0,
      colors: 1,
    };

    fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToAdd),
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

        setTimeout(() => {
          toast.dismiss(toastId);
          toast.success("محصول با موفقیت اضافه شد!");
        }, 2000);
        fileInputRef.current.value = "";
        setNewTitle("");
        setNewPrice("");
        setNewCount("");
        setNewImg("");
        setSelectedFile(null);
        setPreview(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("مشکلی در اضافه کردن محصول رخ داد!");
      });
  };

  return (
    <div id="products" className="pb-18">
      {allProductData.length <= 0 ? (
        <Attention msg="در حال حاضر محصولی تعریف نشده است. لطفا ابتدا از طریق بخش زیر محصول خود را اضافه کنید." />
      ) : (
        ""
      )}
      <div
        id="top-wrapper"
        className="mx-5 mt-5 hidden rounded-md bg-gray-100 p-5 md:block"
      >
        <h2 className="text-2xl font-bold">اضافه کردن محصول جدید</h2>
        <div id="input-wrapper" className="mt-5 grid grid-cols-2 gap-5">
          <div id="add-new-pro">
            <div class="relative">
              <input
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                type="email"
                name="title"
                class={`ease w-full ${!isTitleValid && newTitle.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} rounded-md border bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:shadow`}
                placeholder="اسم محصول جدید را وارد نمایید"
              />
              <button
                class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <H1Icon className="w-4 text-white" />
              </button>
              {!isTitleValid && newTitle.trim() !== "" ? (
                <span className="text-xs font-light text-red-400">
                  وارد کردن این فیلد اجباری است
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div id="add-new-pro">
            <div class="relative">
              <input
                value={newPrice}
                onChange={(e) => {
                  setNewPrice(e.target.value);
                }}
                type="email"
                name="price"
                class={`ease w-full ${!isPriceValid && newPrice.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} rounded-md border bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:shadow`}
                placeholder="قیمت محصول جدید را وارد نمایید"
              />
              <button
                class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <BanknotesIcon className="w-4 text-white" />
              </button>
              {!isPriceValid && newPrice.trim() !== "" ? (
                <span className="text-xs font-light text-red-400">
                  لطفا ار اعداد انگلیسی استفاده نمایید
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div id="add-new-pro">
            <div class="relative">
              <input
                value={newCount}
                onChange={(e) => setNewCount(e.target.value)}
                type="text"
                name="count"
                class={`ease w-full rounded-md border ${!isCountValid && newCount.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:shadow`}
                placeholder="موجودی انبار محصول جدید را وارد نمایید"
              />
              <button
                class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <CircleStackIcon className="w-4 text-white" />
              </button>
              {!isCountValid && newCount.trim() !== "" ? (
                <span className="text-xs font-light text-red-400">
                  لطفا ار اعداد انگلیسی استفاده نمایید
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div id="add-new-pro">
            <div class="relative">
              <input
                name="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                class="ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                placeholder="آدرس تصویر محصول جدید را وارد نمایید"
              />
              <button
                class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <ArrowUpTrayIcon className="w-4 text-white" />
              </button>
              {!isImgValid && selectedFile && (
                <span className="text-xs font-light text-red-400">
                  لطفاً تصویر را آپلود کنید
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className={`mt-5 rounded-md p-3 px-5 text-lg text-white ${
              submitValid
                ? "cursor-pointer bg-slate-800"
                : "cursor-not-allowed bg-slate-300"
            }`}
            onClick={addProductHandler}
            disabled={!submitValid}
          >
            اضافه کردن محصول
          </button>
        </div>
      </div>
      <div className="m-5 hidden md:block">
        <ProductTable
          allProductData={allProductData}
          updateProductList={updateProductList}
        />
      </div>
      <div>
        {isMobile && (
          <ProductTitle
            allProductData={allProductData}
            updateProductList={updateProductList}
          />
        )}
      </div>
    </div>
  );
}
