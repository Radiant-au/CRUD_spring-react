import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { listProducts } from "../services/productService";
import { columns, customStyles } from "../services/table";
import ActionButton from "../components/ActionButton";
import { useNavigate } from "react-router-dom";


const Action_column = { name: "Action", width: '200px' , cell: (row) => <ActionButton productID={row.id} /> };
const Image_column = {name: "Image" ,cell : (row) => <img className="w-24 h-24 object-cover" src={`http://localhost:8080${row.imagePath}`} alt={`${row.name}`} />}

const columnLookup = {
  ID: columns[0],
  Name: columns[1],
  Price: columns[2],
  Category: columns[3],
  Description: columns[4],
  Action: Action_column,
  Image: Image_column
};

const columns_order = ['ID','Image', 'Name', 'Category', 'Price', 'Description', 'Action'];
const reorderedColumns = columns_order.map(col => columnLookup[col]);

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listProducts()
      .then((res) => {
        setProduct(res.data);
       
      })
      .catch((error) => console.error(error));
  },[]);

  const filteredData = product.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  function addNewProduct(){
    navigator('/add-product');
  }

  return (
  
    <div className="container flex justify-center">
      <div>
        <div className="flex justify-between">
          <button
            className="m-6 mx-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3"
            onClick={addNewProduct}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap ="round"
                strokeLinejoin ="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              ></path>
            </svg>
            Add Product
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border rounded m-5"
          />
        </div>
        <DataTable
          pagination
          columns={reorderedColumns}
          data={filteredData}
          customStyles={customStyles}
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
}
