import React from "react";
import { Layout } from "@/layout/layout";

export default function Home() {
  const dataToAdd = [
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    {
      id: "1",
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
      edit: "3434",
      arrow: "32",
    },
    // Add more rows as needed
  ];

  return (
    <Layout>
      <p className="text-[16px] lg:hidden block mb-2">
        <span className="text-red-600  font-bold">Note: </span>Drag to scroll on
        the table
      </p>
      <div className="overflow-x-auto rounded-md">
        <div className="grid    grid-cols-9 bg-white">
          <span className="px-6 py-4  font-medium text-[#8F8F8F]  w-10 ">ID</span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F]  ">Name</span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] ">Email</span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] ">Phone</span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] ">
            Desire Date
          </span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] ">
            Location
          </span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] ">Status</span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] ">Edit</span>
          <span className="px-6 py-4  font-medium text-[#8F8F8F] "></span>
        </div>
        <div>
          {dataToAdd?.map((item: any, index) => {
            return (
              <div key={index} className="grid    grid-cols-9 my-2 bg-white">
                <span className="px-6 py-4   ">{item.id}</span>
                <span className="px-6 py-4   ">{item.name}</span>
                <span className="px-6 py-4  ">{item.email}</span>
                <span className="px-6 py-4  ">{item.phone}</span>
                <span className="px-6 py-4  ">{item.date}</span>
                <span className="px-6 py-4  ">{item.location}</span>
                <span className="px-6 py-4  ">{item.status}</span>
                <span className="px-6 py-4  ">{item.edit}</span>

                <span className="px-6 py-4  ">
                  <img
                    src={item.thumbnail}
                    alt="Thumbnail"
                    // className="h-10 w-10 object-cover rounded-full"
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
