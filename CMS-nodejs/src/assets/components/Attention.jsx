import React from "react";
import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

export default function Attention({ msg }) {
  return (
    <div id="attention" className="mt-5 flex items-center justify-center">
      <div
        id="attention-wrapper"
        className="flex w-fit items-center rounded-md bg-yellow-50 px-10 py-10"
      >
        <div>
          <ShieldExclamationIcon className="my-5 ml-5 w-6 text-yellow-400" />
        </div>
        <div>
          <span className="text-xl text-yellow-800">
            لطفا توجه داشته باشید !!!!
          </span>
          <br />
          <span className="text-lg text-yellow-700">{msg}</span>
        </div>
      </div>
    </div>
  );
}
