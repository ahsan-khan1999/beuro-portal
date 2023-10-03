import React from "react";
import { Layout } from "@/layout/layout";
import { useEffect, useRef } from "react";
import { Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
// import { StarRatingParams} from "tabulator-tables"
// import "tabulator-tables/dist/css/format.min.css";
// import 'tabulator-tables/dist/css/tabulator.min.css';
// import Tabulator from 'tabulator-tables';
// import 'tabulator-tables/dist/css/tabulator_simple.min.css'; // Import the simple CSS theme
// import 'tabulator-tables/dist/js/tabulator.min.js'; // Import the Tabulator JavaScript file
// import 'tabulator-tables/dist/js/modules/format.min.js'; // Import the format module

export default function Home() {
  const tabulatorRef = useRef(null);
  //Generate print icon
  // var printIcon = function (cell, formatterParams) {
  //   //plain text value
  //   return "<i class='fa fa-print'></i>";
  // };
  // useEffect(() => {
  //   //Build Tabulator
  //   tabulatorRef.current = new Tabulator("#example-table", {
  //      height: "311px",
  //      layout: "fitColumns",
  //      rowFormatter: function (row) {
  //        if (row.getData().col == "blue") {
  //          row.getElement().style.backgroundColor = "#1e3b20";
  //        }
  //      },
  //      columns: [
  //        { formatter: "rownum", hozAlign: "center", width: 40 },
  //        {
  //          formatter: printIcon,
  //          width: 40,
  //          hozAlign: "center",
  //          cellClick: function (e, cell) {
  //            alert("Printing row data for: " + cell.getRow().getData().name);
  //          },
  //        },
  //        {
  //          title: "Name",
  //          field: "name",
  //          width: 150,
  //          formatter: function (cell, formatterParams) {
  //            var value = cell.getValue();
  //            if (value.indexOf("o") > 0) {
  //              return (
  //                "<span style='color:#3FB449; font-weight:bold;'>" +
  //                value +
  //                "</span>"
  //              );
  //            } else {
  //              return value;
  //            }
  //          },
  //        },
  //        {
  //          title: "Progress",
  //          field: "progress",
  //          formatter: "progress",
  //          formatterParams: { color: ["#00dd00", "orange", "rgb(255,0,0)"] },
  //          sorter: "number",
  //          width: 100,
  //        },
  //        {
  //          title: "Rating",
  //          field: "rating",
  //          formatter: "star",
  //          formatterParams: { stars: 6 },
  //          hozAlign: "center",
  //          width: 120,
  //        },
  //        {
  //          title: "Driver",
  //          field: "car",
  //          hozAlign: "center",
  //          formatter: "tickCross",
  //          width: 50,
  //        },
  //        { title: "Col", field: "col", formatter: "color", width: 50 },
  //        { title: "Line Wraping", field: "lorem", formatter: "textarea" },
  //        { formatter: "buttonCross", width: 30, hozAlign: "center" },
  //      ],
  //    });
  // }, [])

  // function printFormatter(cell, formatterParams, onRendered) {
  //   return cell.getValue() ? "YES" : "NO";
  // }
  function paramLookup(cell) {
    //cell - the cell component

    //do some processing and return the param object
    return { param1: "green" };
  }
  function customJSXFormatter(cell) {
    const rowData = cell.getRow().getData(); // Get the data for the entire row
    return (
      <div>
        <p>ID: {rowData.id}</p>
        <p>Name: {rowData.name}</p>
        {/* Add more JSX content here */}
      </div>
    );
  }

  useEffect(() => {
    tabulatorRef.current = new Tabulator("#example-table", {
      data: dataToAdd,
      // width:"5000px",
      // height: "311px",
      // responsiveLayout: "hide",
      // renderHorizontal: "virtual",
      // responsiveLayout: "hide",
      // layout: "fitDataTable",
      layout: "fitColumns",
      // resizableColumnFit: true,
      // layout: "fitDataStretch",
      columns: [
        {
          title: "ID",
          field: "id",
          // responsive: 0,
          width: "60",

          // headerCssClass: "text-black",

          // cssClass: "text-white  ",
          cssClass:
            "text-white !py-[19px] !bg-blacks !text-[#4B4B4B] text !h-fit !w-16s !rounded-mds",

          // titleFormatter(cell, formatterParams, onRendered) {
          //   alert("test");
          //   return `<div class="flex lg:justify-center">
          //           <div class="intro-x w-20 h-20 text-white">
          //            ${cell.getData().id}
          //           </div>
          //       </div>`;
          // },
        }, //never hide this column
        {
          title: "Name",
          field: "name",
          // formatter: customJSXFormatter,
          formatter: function (cell, formatterParams, onRendered) {
            console.log("2134214");
            //cell - the cell component
            //formatterParams - parameters set for the column
            //onRendered - function to call when the formatter has been rendered

            return console.log("2134214");

            //return the contents of the cell;
          },
          // formatter: "star",
          // formatterParams: { stars: 6 },
          // cssClass: "text-white ",

          hozAlign: "right",
          // sorter: "number",
          // formatter(cell) {
          //   console.log(cell, "w324324");
          //   alert("324324324");
          //   debugger;

          //   return `<div class="flex lg:justify-center">
          //           <div class="intro-x w-20 h-20 image-fit">
          //             <h1>2342343124234234234324234<h1>
          //           </div>
          //       </div>`;
          // },

          // formatter(cell) {
          //   const cellValue = cell.getValue();
          //   //  const cellValue = parseFloat(cell.getValue());

          //   const cellElement = cell.getElement();

          //   //  if (cellValue < 50) {
          //   // Apply custom styling for values less than 50
          //   cellElement.style.backgroundColor = "red";
          //   cellElement.style.color = "white";
          //   //  }

          //   return cellValue;
          // },

          // formatter: function (cell, formatterParams) {
          //   var value = cell.getValue();

          //   if (value) {
          //     return (
          //       "<span style='color:#ffff; font-weight:bold;'>" +
          //       value +
          //       "</span>"
          //     );
          //   } else {
          //     return value;
          //   }
          // },
        },
        {
          title: "Email",
          field: "email",
          // responsive: 2,
          // formatter: "star",
          // formatterParams: paramLookup,

          // formatter: "tickCross",
          // formatterParams: {
          //   allowEmpty: true,
          //   allowTruthy: true,
          //   tickElement: "<i class='fa fa-check '></i>",
          //   crossElement: "<i class='fa fa-times'></i>",
          // },

          // formatter: function (cell, formatterParams) {
          //   var value = cell.getValue();
          //   if (value.indexOf("o") > 0) {
          //     return (
          //       "<span style='color:#3FB449; font-weight:bold;'>" +
          //       value +
          //       "</span>"
          //     );
          //   } else {
          //     return value;
          //   }
          // },
        }, //hide this column first
        { title: "Phone", field: "phone", hozAlign: "center" },
        {
          title: "Desire Date",
          field: "date",
          // formatterParams(cell) {},
        },
        { title: "Location", field: "location" },
        { title: "Status", field: "status", cssClass: "bg-black" },
        {
          title: "Edit",
          field: "edit",
          hozAlign: "center",
          // sorter: "date",
          // formatterPrint: printFormatter,
        },
        {
          title: "",
          field: "arrow",
          vertAlign: "top",
          width: "60",

          // formatter: function (cell, formatterParams) {
          //   var value = cell.getValue();

          //   if (value) {
          //     return (
          //       "<span style='color:#ffff !important; font-weight:bold;'>" +
          //       value +
          //       "</span>"
          //     );
          //   } else {
          //     return value;
          //   }
          // },
        },
      ],

      rowFormatter: function (row) {
        row.getElement().style.backgroundColor = "white";
        row.getElement().style.width = "100%";
        row.getElement().style.marginTop = "8px";
        row.getElement().style.borderRadius = "6px";
      },
    });

    // Cleanup the table when the component unmounts
    return () => {
      tabulatorRef.current.destroy();
    };
  }, []);
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
    // Add more rows as needed
  ];

  // const addRowsToTable = () => {
  //   const dataToAdd = [
  //     {
  //       id: "1",
  //       name: "Rahal Ahmed",
  //       email: "Test12@gmail.com",
  //       phone: "+49 302 1231234",
  //       date: "25/08/2023",
  //       location: "Islamabad",
  //       status: "Open",
  //       edit: "3434",
  //       arrow: "32",
  //     },
  //     // Add more rows as needed
  //   ];

  //   tabulatorRef.current.addData(dataToAdd);
  // };

  return (
    <Layout>
      <div className="w-full overflow-scroll">
        <div className="w-full" id="example-table" />
      </div>
      {/* <button onClick={addRowsToTable}>Add Rows</button> */}
    </Layout>
  );
}
