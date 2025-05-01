// pages/DashboardProduct.jsx
import React, { useEffect, useState } from 'react';


const DashboardProduct = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [pageSize, setPageSize] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Products</h1>
        <button className='bg-[#3782f7] hover:opacity-[0.8] text-white cursor-pointer transition-colors duration-300 px-4 py-2 rounded-sm font-lg'>
          Thêm sản phẩm
        </button>
      </div>

      <div className='bg-white py-6 w-full flex justify-between mt-5 items-center'>
        {/* Danh mục sản phẩm */}
        <div className='flex items-center gap-2'>
          <p>Danh mục sản phẩm: </p>
          <select
            value={currentCategory}
            className='border rounded-sm p-1 text-sm cursor-pointer'
            onChange={handleCategoryChange}
          >
            <option value="">Tất cả</option>
            {categoryData.map((item, index) => (
              <option value={item.id} key={index}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Dropdown hiển thị số lượng */}
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="page-size-label">Hiển thị</InputLabel>
          <Select
            labelId="page-size-label"
            id="page-size"
            value={pageSize}
            label="Hiển thị"
            onChange={handlePageSizeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default DashboardProduct;
