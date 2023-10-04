import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import TableHeadingLeads from "@/components/leads/TableHeadingLeads";
import TableRowLeads from "@/components/leads/TableRowLeads";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TableRowTypes } from "@/types";

export default function Leads() {
  const [filter, setFilter] = useState([]);
  console.log(filter, "filter");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TableRowTypes[]>([]);

  const dataToAdd: TableRowTypes[] = [
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Close",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Close",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Expired",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Expired",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      status: "Open",
    },
    // Add more rows as needed
  ];

  const handleButtonClick = (buttonName:string) => {
    // Use the spread operator to create a new array with the buttonName added
    const deletedElement = filter.filter((item) => item !== buttonName);
    filter.includes(buttonName)
      ? setFilter(deletedElement)
      : setFilter([...filter, buttonName]);
  };

  const totalItems = dataToAdd.length;
  const itemsPerPage = 2;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(dataToAdd.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-[#222B45] ">Leads</h1>
        <div className="flex items-center ">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleButtonClick("open")}
              className="py-2 pl-[10px] pr-[22px] text-[13px] font-medium text-[#393939] bg-white rounded-md relative whitespace-nowrap"
            >
              Open Leads
              {filter.includes("open") ? (
                <svg
                  className="absolute top-1 right-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM6.21875 8.77094L4.1875 6.73969L4.83344 6.09375L6.21875 7.47906L9.22906 4.46875L9.87744 5.11306L6.21875 8.77094Z"
                    fill="#4A13E7"
                  />
                </svg>
              ) : (
                <svg
                  className="absolute top-1 right-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.21875 8.69944L4.1875 6.66778L4.76153 6.09375L6.21875 7.55056L9.30016 4.46875L9.875 5.04359L6.21875 8.69944Z"
                    fill="black"
                  />
                  <path
                    d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM7.03125 11.375C6.06707 11.375 5.12454 11.0891 4.32285 10.5534C3.52116 10.0177 2.89632 9.25637 2.52734 8.36558C2.15836 7.47479 2.06182 6.49459 2.24992 5.54893C2.43803 4.60328 2.90233 3.73464 3.58411 3.05285C4.26589 2.37107 5.13453 1.90677 6.08019 1.71867C7.02585 1.53057 8.00604 1.62711 8.89683 1.99609C9.78762 2.36506 10.549 2.98991 11.0847 3.7916C11.6203 4.59328 11.9063 5.53582 11.9063 6.5C11.9063 7.79293 11.3926 9.03291 10.4784 9.94715C9.56416 10.8614 8.32418 11.375 7.03125 11.375Z"
                    fill="black"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleButtonClick("close")}
              className="py-2 pl-[10px] pr-[22px] text-[13px] font-medium text-[#393939] bg-white rounded-md relative whitespace-nowrap"
            >
              Close Leads
              {filter.includes("close") ? (
                <svg
                  className="absolute top-1 right-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM6.21875 8.77094L4.1875 6.73969L4.83344 6.09375L6.21875 7.47906L9.22906 4.46875L9.87744 5.11306L6.21875 8.77094Z"
                    fill="#4A13E7"
                  />
                </svg>
              ) : (
                <svg
                  className="absolute top-1 right-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.21875 8.69944L4.1875 6.66778L4.76153 6.09375L6.21875 7.55056L9.30016 4.46875L9.875 5.04359L6.21875 8.69944Z"
                    fill="black"
                  />
                  <path
                    d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM7.03125 11.375C6.06707 11.375 5.12454 11.0891 4.32285 10.5534C3.52116 10.0177 2.89632 9.25637 2.52734 8.36558C2.15836 7.47479 2.06182 6.49459 2.24992 5.54893C2.43803 4.60328 2.90233 3.73464 3.58411 3.05285C4.26589 2.37107 5.13453 1.90677 6.08019 1.71867C7.02585 1.53057 8.00604 1.62711 8.89683 1.99609C9.78762 2.36506 10.549 2.98991 11.0847 3.7916C11.6203 4.59328 11.9063 5.53582 11.9063 6.5C11.9063 7.79293 11.3926 9.03291 10.4784 9.94715C9.56416 10.8614 8.32418 11.375 7.03125 11.375Z"
                    fill="black"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleButtonClick("expire")}
              className="py-2 pl-[10px] pr-[22px] text-[13px] font-medium text-[#393939] bg-white rounded-md relative whitespace-nowrap"
            >
              Expire leads
              {filter.includes("expire") ? (
                <svg
                  className="absolute top-1 right-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM6.21875 8.77094L4.1875 6.73969L4.83344 6.09375L6.21875 7.47906L9.22906 4.46875L9.87744 5.11306L6.21875 8.77094Z"
                    fill="#4A13E7"
                  />
                </svg>
              ) : (
                <svg
                  className="absolute top-1 right-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.21875 8.69944L4.1875 6.66778L4.76153 6.09375L6.21875 7.55056L9.30016 4.46875L9.875 5.04359L6.21875 8.69944Z"
                    fill="black"
                  />
                  <path
                    d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM7.03125 11.375C6.06707 11.375 5.12454 11.0891 4.32285 10.5534C3.52116 10.0177 2.89632 9.25637 2.52734 8.36558C2.15836 7.47479 2.06182 6.49459 2.24992 5.54893C2.43803 4.60328 2.90233 3.73464 3.58411 3.05285C4.26589 2.37107 5.13453 1.90677 6.08019 1.71867C7.02585 1.53057 8.00604 1.62711 8.89683 1.99609C9.78762 2.36506 10.549 2.98991 11.0847 3.7916C11.6203 4.59328 11.9063 5.53582 11.9063 6.5C11.9063 7.79293 11.3926 9.03291 10.4784 9.94715C9.56416 10.8614 8.32418 11.375 7.03125 11.375Z"
                    fill="black"
                  />
                </svg>
              )}
            </button>
            <SearchInput />
            <div className="text-[#404040] font-medium flex items-center cursor-pointer">
              Sort by
              <svg
                className="ml-[2px]"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0961 6.12191C12.2318 6.00587 12.4191 5.97103 12.5874 6.03051C12.7557 6.08999 12.8795 6.23475 12.9122 6.41026C12.9449 6.58578 12.8814 6.76538 12.7457 6.88141L9.248 9.87946C9.06101 10.0394 8.78541 10.0394 8.59842 9.87946L5.1007 6.88141C4.89097 6.70204 4.86636 6.3866 5.04574 6.17687C5.22511 5.96714 5.54055 5.94253 5.75028 6.12191L8.92321 8.84114L12.0961 6.12291V6.12191Z"
                  fill="#404040"
                  stroke="black"
                />
              </svg>
            </div>
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
            >
              <g clipPath="url(#clip0_702_12694)">
                <path
                  d="M7.33125 0C6.22625 0 5.29125 0.714 4.93425 1.7H0.53125V3.4H4.93425C5.28275 4.386 6.21775 5.1 7.33125 5.1C8.73375 5.1 9.88125 3.9525 9.88125 2.55C9.88125 1.1475 8.73375 0 7.33125 0ZM11.5813 1.7V3.4H17.5312V1.7H11.5813ZM11.5813 5.95C10.4763 5.95 9.54125 6.664 9.18425 7.65H0.53125V9.35H9.18425C9.53275 10.336 10.4678 11.05 11.5813 11.05C12.9838 11.05 14.1313 9.9025 14.1313 8.5C14.1313 7.0975 12.9838 5.95 11.5813 5.95ZM15.8313 7.65V9.35H17.5312V7.65H15.8313ZM4.78125 11.9C3.67625 11.9 2.74125 12.614 2.38425 13.6H0.53125V15.3H2.38425C2.73275 16.286 3.66775 17 4.78125 17C6.18375 17 7.33125 15.8525 7.33125 14.45C7.33125 13.0475 6.18375 11.9 4.78125 11.9ZM9.03125 13.6V15.3H17.5312V13.6H9.03125Z"
                  fill="#404040"
                />
              </g>
              <defs>
                <clipPath id="clip0_702_12694">
                  <rect
                    width="17"
                    height="17"
                    fill="white"
                    transform="translate(0.53125)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <button className="py-2 pl-2 pr-[10px] px-[8px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-8 whitespace-nowrap">
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
            >
              <path
                d="M13.2526 7.94451H8.52654V12.6706C8.52654 13.1904 8.1012 13.6158 7.58133 13.6158C7.06146 13.6158 6.63612 13.1904 6.63612 12.6706V7.94451H1.91006C1.39019 7.94451 0.964844 7.51917 0.964844 6.9993C0.964844 6.47943 1.39019 6.05409 1.91006 6.05409H6.63612V1.32802C6.63612 0.808158 7.06146 0.382812 7.58133 0.382812C8.1012 0.382812 8.52654 0.808158 8.52654 1.32802V6.05409H13.2526C13.7725 6.05409 14.1978 6.47943 14.1978 6.9993C14.1978 7.51917 13.7725 7.94451 13.2526 7.94451Z"
                fill="white"
              />
            </svg>
            Add New
          </button>
        </div>
      </div>
      <TableLayout>
        <TableHeadingLeads />
        <TableRowLeads dataToAdd={dataToAdd} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}