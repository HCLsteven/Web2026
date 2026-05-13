import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./App.css";

function App() {

  const [rows, setRows] = useState([]);

  // DataGrid 欄位
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "名稱", width: 400 },
    { field: "location", headerName: "地點", width: 350 },
    { field: "price", headerName: "票價", width: 200 }
  ];

  // useEffect 呼叫 API
  useEffect(() => {

    fetch(
      "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
    )
      .then((response) => response.json())
      .then((data) => {

        const newRows = data.map((item, index) => ({
          id: index + 1,
          title: item.title,

          location:
            item.showInfo && item.showInfo.length > 0
              ? item.showInfo[0].location
              : "",

          price:
            item.showInfo && item.showInfo.length > 0
              ? item.showInfo[0].price
              : ""
        }));

        setRows(newRows);
      });

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>景點觀光展覽資訊</h1>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>

    </div>
  );
}

export default App;