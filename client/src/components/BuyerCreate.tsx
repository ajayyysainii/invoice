"use client";
import React from "react";
import { createBuyer } from "@/api/buyers";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  gst: string;
  address: string;
  nameOfBusiness: string;
  email: string;
  name: string;
  phone: number;
};

const BuyerCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await createBuyer({
        ...data,
      });
    } catch (error) {
      alert("There is error" + error);
    }
  };

  return (
    <div className="w-[90%] max-w-2xl h-[95%] bg-white rounded-2xl flex flex-col shadow-2xl shadow-gray-200/50 ring-1 ring-gray-300">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Create Buyer
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Add a new buyer to your system
        </p>
      </div>

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3 bg-white border ${
                errors.name
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 bg-white border ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Business Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              placeholder="Acme Corporation"
              {...register("nameOfBusiness", {
                required: "Business name is required",
              })}
              className={`w-full px-4 py-3 bg-white border ${
                errors.nameOfBusiness
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400`}
            />
            {errors.nameOfBusiness && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.nameOfBusiness.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register("phone", { required: "Phone number is required" })}
              className={`w-full px-4 py-3 bg-white border ${
                errors.phone
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              rows={3}
              placeholder="123 Business St, City, State, ZIP"
              {...register("address", { required: "Address is required" })}
              className={`w-full px-4 py-3 bg-white border ${
                errors.address
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none`}
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.address.message}
              </p>
            )}
          </div>

          {/* GST Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST Number
            </label>
            <input
              type="text"
              placeholder="GSTIN123456789"
              {...register("gst", { required: "GST number is required" })}
              className={`w-full px-4 py-3 bg-white border ${
                errors.gst
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400`}
            />
            {errors.gst && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.gst.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={() => handleSubmit(onSubmit)()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              Create Buyer
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
        <p className="text-xs text-gray-500 text-center">
          All information will be stored securely and encrypted
        </p>
      </div>
    </div>
  );
};

export default BuyerCreate;
