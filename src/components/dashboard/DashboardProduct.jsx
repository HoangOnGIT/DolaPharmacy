import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import TableDashboard from './TableDashboard';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const DashboardProduct = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const [pageSize, setPageSize] = useState('');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [listFilter, setListFilter] = useState([
    { id: 'name_asc', name: 'Name A-Z' },
    { id: 'name_desc', name: 'Name Z-A' },
    { id: 'price_asc', name: 'Price Ascending' },
    { id: 'price_desc', name: 'Price Descending' },
    { id: 'quantity_asc', name: 'Quantity Ascending' },
    { id: 'quantity_desc', name: 'Quantity Descending' },
  ]);

  useEffect(() => {
    fetch(baseUrl+"/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      });
  }, []);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    
    setCurrentCategory(e.target.value);
  };

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl !font-bold'>Sản phẩm</h1>
        <button className='bg-[#3782f7] hover:opacity-80 !text-white transition-colors duration-300 px-4 py-2 rounded-sm font-medium flex items-center'>
          {/* Thêm sản phẩm */}
          <FaPlus className='mr-2' /> <Link to="add" >Thêm sản phẩm</Link>
        </button>
      </div>

      <div className='bg-white py-6 px-4 w-full flex flex-wrap gap-8 mt-5 items-center rounded-md shadow'>
        {/* Danh mục sản phẩm */}
        <div className='flex items-center'>
          <label className="text-lg font-medium text-gray-700 mr-3">Danh mục: </label>
          <select
            value={currentCategory}
            onChange={handleCategoryChange}
            className="ml-4 w-64 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tất cả</option>
            {categoryData.map((item, index) => (
              <option value={item.name} key={index}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Bộ lọc */}
        <div className='flex items-center'>
          <label className="text-lg font-medium text-gray-700 mr-3">Lọc:</label>
          <select
            value={currentFilter}
            onChange={handleFilterChange}
            className="ml-4 w-64 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tất cả</option>
            {listFilter.map((item, index) => (
              <option value={item.id} key={index}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='bg-white mt-6 p-6 rounded-md shadow'>
        <TableDashboard category={currentCategory} filter={currentFilter}/>
      </div>
    </>
  );
};

export default DashboardProduct;
