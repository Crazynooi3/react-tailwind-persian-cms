import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { H1Icon } from "@heroicons/react/24/outline";
import { H2Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

export default function EditeUserModal({
  url,
  isShow,
  onClose,
  selectedUser,
  updateUserList,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(selectedUser);
    // console.log(formData);
  }, [selectedUser]);

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

  const [newName, setNewName] = useState("");
  const [newLast, setNewLast] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    const isValidName =
      newName.trim() !== "" &&
      /^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s]+$/.test(
        newName.trim(),
      );
    setIsNameValid(isValidName);
  }, [newName]);

  const [isLastValid, setIsLastValid] = useState(false);

  useEffect(() => {
    const isValidLast =
      newLast.trim() !== "" &&
      /^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s]+$/.test(
        newLast.trim(),
      );
    setIsLastValid(isValidLast);
  }, [newLast]);

  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const isValidEmail =
      newEmail.trim() !== "" &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmail.trim());
    setIsEmailValid(isValidEmail);
  }, [newEmail]);

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    const isValidPhone =
      newPhone.trim() !== "" && /^[1-9][0-9]{9}$/.test(newPhone.trim());
    setIsPhoneValid(isValidPhone);
  }, [newPhone]);

  const [submitValid, setSubmitValid] = useState(false);

  useEffect(() => {
    if (isNameValid && isLastValid && isEmailValid && isPhoneValid) {
      setSubmitValid(true);
    } else {
      setSubmitValid(false);
    }
  }, [newName, newLast, newEmail]);

  const editeUserHandler = () => {
    const userToEdit = {
      firsname: newName.trim() !== "" ? newName : selectedUser.firsname,
      lastname: newLast.trim() !== "" ? newLast : selectedUser.lastname,
      username: newUsername.trim() !== "" ? newUsername : selectedUser.username,
      password: selectedUser.password,
      phone: newPhone.trim() !== "" ? newPhone : selectedUser.phone,
      city: newCity.trim() !== "" ? newCity : selectedUser.city,
      email: newEmail.trim() !== "" ? newEmail : selectedUser.email,
      address: newAddress.trim() !== "" ? newAddress : selectedUser.address,
      score: selectedUser.score,
      buy: selectedUser.buy,
    };

    fetch(`${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToEdit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        updateUserList();
        toast.success("کاربر با موفقیت ویرایش شد!");
        setNewName("");
        setNewLast("");
        setNewUsername("");
        setNewPhone("");
        setNewCity("");
        setNewEmail("");
        setNewAddress("");
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
                    ویرایش کاربر
                  </h3>
                  <hr className="mt-3" />
                  <div class="mt-1">
                    <div
                      id="input-wrapper"
                      className="mt-5 grid grid-cols-2 gap-5"
                    >
                      <div id="add-new-pro" className="text-right">
                        <span className="block py-2.5 text-sm text-slate-400">
                          نام کاربر:
                        </span>
                        <div class="relative">
                          <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            type="text"
                            class="ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                            placeholder={formData.firsname}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <H1Icon className="w-4 text-white" />
                          </button>
                        </div>
                      </div>

                      <div id="add-new-pro" className="text-right">
                        <span className="block py-2.5 text-sm text-slate-400">
                          نام خانوادگی کاربر:
                        </span>
                        <div class="relative">
                          <input
                            value={newLast}
                            onChange={(e) => setNewLast(e.target.value)}
                            type="text"
                            class={`ease w-full ${!isLastValid && newLast.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none`}
                            placeholder={formData.lastname}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <H2Icon className="w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      <div id="add-new-pro" className="text-right">
                        <span className="block py-2.5 text-sm text-slate-400">
                          نام کاربری کاربر:
                        </span>
                        <div class="relative text-right">
                          <input
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            type="text"
                            class={`ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow`}
                            placeholder={formData.username}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <UserCircleIcon className="w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      <div id="add-new-pro" className="text-right">
                        <span className="block py-2.5 text-sm text-slate-400">
                          تلفن همراه کاربر:
                        </span>
                        <div class="relative">
                          <input
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            type="text"
                            class={`ease w-full ${!isPhoneValid && newPhone.trim() !== "" ? "border-red-500 outline-red-400" : "border-slate-400 outline-none"} rounded-md border bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow`}
                            placeholder={formData.phone}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <PhoneIcon className="w-4 text-white" />
                          </button>
                          {!isPhoneValid && newPhone.trim() !== "" ? (
                            <span className="text-xs font-light text-red-400">
                              شماره همراه باید بدون صفر و انگلیسی وارد شود.
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div id="add-new-pro" className="text-right">
                        <span className="block py-2.5 text-sm text-slate-400">
                          شهر کاربر:
                        </span>
                        <div class="relative">
                          <input
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            type="text"
                            class="ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                            placeholder={formData.city}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <MapPinIcon className="w-4 text-white" />
                          </button>
                        </div>
                      </div>

                      <div id="add-new-pro" className="text-right">
                        <span className="block py-2.5 text-sm text-slate-400">
                          آدرس کامل کاربر:
                        </span>
                        <div class="relative">
                          <input
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            type="text"
                            class="ease w-full rounded-md border border-slate-400 bg-transparent py-3 pr-10 pl-3 text-lg text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                            placeholder={formData.address}
                          />
                          <button
                            class="absolute top-3 right-1 rounded border border-transparent bg-slate-800 p-1.5 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <GlobeAmericasIcon className="w-4 text-white" />
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
                onClick={() => editeUserHandler()}
                // disabled={!submitValid}
                type="button"
                class={`shadow-xssm:ml-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 sm:w-auto`}
              >
                ویرایش کاربر
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
