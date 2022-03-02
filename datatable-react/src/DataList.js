import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

function Datalist() {
  const [userList, setUserList] = useState([]);

  const columns = [
    { dataField: "_id", text: "Id" },
    { dataField: "artist", text: "Artist", sort: true, filter: textFilter() },
    { dataField: "country", text: "Country", sort: true, filter: textFilter() },
    { dataField: "gender", text: "Gender", sort: true, filter: textFilter() },
    { dataField: "sales", text: "Sales", sort: true, filter: textFilter() },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page: ", page);
      console.log("sizePerPage: " + sizePerPage);
    },
    onSizePerPageList: function (page, sizePerPage) {
      console.log("page: ", page);
      console.log("sizePerPage: " + sizePerPage);
    },
  });

  useEffect(() => {
    fetch("http://localhost:3001/datatables")
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={userList}
        columns={columns}
        pagination={pagination}
        filter={filterFactory()}
      />
      {/* <table>
        <tr>
          <th>Id</th>
          <th>Artist</th>
          <th>Country</th>
          <th>Gender</th>
          <th>Sales</th>
        </tr>
        {userList && userList.length > 0
          ? userList.map((usr) => (
              <tr>
                <td>{usr._id}</td>
                <td>{usr.artist}</td>
                <td>{usr.country}</td>
                <td>{usr.gender}</td>
                <td>{usr.sales}</td>
              </tr>
            ))
          : "Loading..."}
      </table> */}
    </div>
  );
}

export default Datalist;
