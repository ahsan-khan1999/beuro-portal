import Header from "@/base-components/Header";
import SideBar from "@/base-components/SideBar";
import { Layout } from "@/layout/layout";
import { useEffect, useRef } from "react";
import { Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

export default function Home() {
  const tabulatorRef = useRef(null);

  useEffect(() => {
    tabulatorRef.current = new Tabulator("#example-table", {
      // height: "311px",
      // responsiveLayout: "hide",
      // renderHorizontal: "virtual",
      layout: "fitDataStretch",
      columns: [
        { title: "Name", field: "name", responsive: 0 }, //never hide this column
        {
          title: "Progress",
          field: "progress",
          hozAlign: "right",
          sorter: "number",
        },
        { title: "Gender", field: "gender", responsive: 2 }, //hide this column first
        { title: "Rating", field: "rating", hozAlign: "center",  },
        { title: "Favourite Color", field: "col",  },
        {
          title: "Date Of Birth",
          field: "dob",
          hozAlign: "center",
          sorter: "date",
        },
        { title: "Driver", field: "car", hozAlign: "center",  },
      ],
    });

    // Cleanup the table when the component unmounts
    return () => {
      tabulatorRef.current.destroy();
    };
  }, []);
  const addRowsToTable = () => {
    const dataToAdd = [
      {
        name: "John",
        progress: 50,
        gender: "Male",
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
      <div className="max-w-full overflow-scroll">
        <div className="max-w-full overflow-scroll" id="example-table" />
      </div>
      <button onClick={addRowsToTable}>Add Rows</button>
    </Layout>
  );
}
