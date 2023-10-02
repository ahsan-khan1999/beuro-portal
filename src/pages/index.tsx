import Header from "@/base-components/Header";
import SideBar from "@/base-components/SideBar";
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

  useEffect(() => {
    tabulatorRef.current = new Tabulator("#example-table", {
      // width:"5000px",
      // height: "311px",
      // responsiveLayout: "hide",
      // renderHorizontal: "virtual",
      responsiveLayout: "hide",
      // layout: "fitDataTable",
      layout: "fitColumns",
      resizableColumnFit: true,
      // layout: "fitDataStretch",
      columns: [
        {
          title: "ID",
          field: "id",
          responsive: 0,
          titleFormatter(cell, formatterParams, onRendered) {
             alert("test");
             return `<div class="flex lg:justify-center">
                    <div class="intro-x w-20 h-20 text-white">
                     ${cell.getData().id}
                    </div>
                </div>`;
          },
          
        }, //never hide this column
        {
          title: "Progress",
          field: "progress",
          hozAlign: "right",
          sorter: "number",
          formatter(cell) {
            return `<div class="flex lg:justify-center">
                    <div class="intro-x w-20 h-20 image-fit">
                      <img alt="Thumbnail" class="rounded-full " src="${"./"}">
                    </div>
                </div>`;
          },
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
          formatter: function (cell, formatterParams) {
            var value = cell.getValue();

            if (value) {
              return (
                "<span style='color:#ffff; font-weight:bold;'>" +
                value +
                "</span>"
              );
            } else {
              return value;
            }
          },
        },
        {
          title: "Gender",
          field: "gender",
          responsive: 2,
          // formatter: "tickCross",
          // formatterParams: {
          //   allowEmpty: true,
          //   allowTruthy: true,
          //   tickElement: "<i class='fa fa-check '></i>",
          //   crossElement: "<i class='fa fa-times'></i>",
          // },
          formatter: function (cell, formatterParams) {
            var value = cell.getValue();
            if (value.indexOf("o") > 0) {
              return (
                "<span style='color:#3FB449; font-weight:bold;'>" +
                value +
                "</span>"
              );
            } else {
              return value;
            }
          },
        }, //hide this column first
        { title: "Rating", field: "rating", hozAlign: "center" },
        {
          title: "Favourite Color",
          field: "col",
          // formatterParams(cell) {},
        },
        { title: "Favourite Color", field: "col" },
        { title: "Favourite Color", field: "col" },
        {
          title: "Date Of Birth",
          field: "dob",
          hozAlign: "center",
          sorter: "date",
          // formatterPrint: printFormatter,
        },
        {
          title: "Driver",
          field: "car",
          vertAlign: "top",
          formatter: function (cell, formatterParams) {
            var value = cell.getValue();

            if (value) {
              return (
                "<span style='color:#ffff !important; font-weight:bold;'>" +
                value +
                "</span>"
              );
            } else {
              return value;
            }
          },
        },
      ],
      rowFormatter: function (row) {
        row.getElement().style.backgroundColor = "red";
        row.getElement().style.width = "100%";
      },
    });

    // Cleanup the table when the component unmounts
    return () => {
      tabulatorRef.current.destroy();
    };
  }, []);

  const addRowsToTable = () => {
    const dataToAdd = [
      {
        id: "1",
        progress: 50,
        gender: "Mole",
        rating: 4,
        col: "Blue",
        dob: "1990-01-15",
        car: "Yes",
      },
      // Add more rows as needed
    ];

    tabulatorRef.current.addData(dataToAdd);
  };

  return (
    <Layout>
      <div className="w-full overflow-scroll">
        <div className="w-full" id="example-table" />
      </div>
      <button onClick={addRowsToTable}>Add Rows</button>
    </Layout>
  );
}
