import { BiEdit, BiTrash, BiPlus } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ProductInput from './products-input/products-input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDownload from './products-download';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingProduct, setProducts } from '../../store/slices/productsSlices';
import { setCategoryQuery, setCategory, setCategoryValue } from '../../store/slices/categoriesSlices';
import { Link } from 'react-router-dom';

export default function Product() {
 const [isOpen, setIsOpen] = useState(false);
 const products = useSelector((state) => state.products.products);
 const dispatch = useDispatch();
 const categoryQuery = useSelector((state) => state.categories.categoryQuery);
 const category = useSelector((state) => state.categories.category);
 const categoryValue = useSelector((state) => state.categories.categoryValue);
 const [search, setSearch] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [showPDF, setShowPDF] = useState(false);
 //  const [isDataLoaded, setIsDataLoaded] = useState(false);

 useEffect(() => {
  getDataProducts();
 }, []);

 const getDataProducts = async () => {
  try {
   const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/Products`);
   dispatch(setProducts(data));

   const categories = data.map((product) => product.category);

   // Cek apakah setiap kategori baru sudah ada dalam categoryQuery
   const newCategories = categories.filter((categoryName) => !categoryQuery.some((item) => item.name === categoryName));

   if (newCategories.length === 0) {
    // Jika tidak ada kategori baru, return atau lakukan tindakan lain
    return;
   }

   const updatedCategoryQuery = [
    ...categoryQuery,
    ...newCategories.map((categoryName, index) => ({
     id: categoryQuery.length + index + 1,
     name: categoryName,
    })),
   ];

   dispatch(setCategoryQuery(updatedCategoryQuery));
  } catch (error) {
   console.log(error);
  }
 };

 const addProduct = async (product) => {
  try {
   const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/Products`, product);
   // Memeriksa apakah ada produk dengan ID yang sama
   const isDuplicateId = products.some((p) => p.idProduct === data.idProduct);
   if (isDuplicateId) {
    toast.warning('Product cannot be added with duplicate ID.');
    return;
   } else {
    dispatch(setProducts([...products, data]));
    const updatedCategoryQuery = [
     ...categoryQuery,
     {
      id: categoryQuery.length,
      name: data.category,
     },
    ];
    dispatch(setCategoryQuery(updatedCategoryQuery));
    toast.success('Product added successfully.');
   }
  } catch (error) {
   console.log(error);
   toast.error('Failed to add product.');
  }
 };

 const updateProduct = async (id, category, updatedProduct) => {
  try {
   const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/Products/${id}`, updatedProduct);
   const updatedProducts = products.map((product) => (product.id === id ? data : product));
   dispatch(setProducts(updatedProducts));
   const updatedCategoryQuery = categoryQuery.map((item) => (item.name === category ? { ...item, name: data.category } : item));
   dispatch(setCategoryQuery(updatedCategoryQuery));
   dispatch(setEditingProduct(null));
   toast.success('Product updated successfully.');
  } catch (error) {
   console.log(error);
   toast.error('Failed to update product.');
  }
 };

 const deleteProduct = async (id, category) => {
  try {
   await axios.delete(`${import.meta.env.VITE_BASE_URL}/Products/${id}`);
   const updatedProducts = products.filter((product) => product.id !== id);
   dispatch(setProducts(updatedProducts));
   const updatedCategoryQuery = categoryQuery.filter((item) => item.name !== category);
   dispatch(setCategoryQuery(updatedCategoryQuery));
   toast.success('Product deleted successfully.');
  } catch (error) {
   console.log(error);
   toast.error('Failed to delete product.');
  }
 };

 const handleOpenPopup = () => {
  setIsOpen(!isOpen);
  dispatch(setEditingProduct(null));
 };

 const handleEdit = (id) => {
  setIsOpen(!isOpen);
  const productToEdit = products.find((product) => product.id === id);
  dispatch(setEditingProduct(productToEdit));
 };

 const handleSearchChange = (e) => {
  setSearch(!search);
  setSearchQuery(e.target.value);
 };

 const handleSearchBlur = () => {
  setSearch(!search);
  setSearchQuery('');
 };

 const handleCategoryChange = (e) => {
  dispatch(setCategory(true));
  const selectedCategory = e.target.value;
  dispatch(setCategoryValue(selectedCategory));
 };

 const filteredProductsCategory = products.filter((product) => {
  if (categoryValue === 'All' || categoryValue === '') {
   return true;
  } else {
   const categories = categoryValue.split(',').map((category) => category.trim().toLowerCase());
   const productCategories = product.category.split(',').map((category) => category.trim().toLowerCase());
   return productCategories.some((productCategory) => categories.includes(productCategory));
  }
 });

 const filteredProductsSearch = products.filter((product) => {
  const productName = product.name.toLowerCase();

  if (categoryValue === 'All' || categoryValue === '') {
   // Jika kategori yang dipilih adalah "All" atau tidak ada kategori yang dipilih, tampilkan semua produk yang sesuai dengan pencarian
   return productName.includes(searchQuery.toLowerCase());
  } else {
   // Jika ada kategori yang dipilih, hanya tampilkan produk yang sesuai dengan pencarian dan termasuk dalam kategori yang dipilih
   const categories = categoryValue.split(',').map((category) => category.trim().toLowerCase());
   const productCategories = product.category.split(',').map((category) => category.trim().toLowerCase());

   return productName.includes(searchQuery.toLowerCase()) && productCategories.some((productCategory) => categories.includes(productCategory));
  }
 });

 const handleShowPDF = () => {
  setShowPDF(!showPDF);
 };

 return (
  <div className='mt-5 container-fluid'>
   <nav>
    <Link to={'/home'}>Home</Link>
   </nav>
   <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
   <div className='card shadow mb-4'>
    <div className='card-header bg-secondary-subtle py-3'>
     <h4 className='m-0 fw-bold text-primary'>Data Stock Barang</h4>
    </div>
    <div className='card-body'>
     <div className='mb-3 d-flex gap-3'>
      <button className='btn btn-success d-flex gap-2 align-items-center' onClick={handleOpenPopup}>
       <BiPlus />
       Add Data Stock
      </button>
      <button className='btn btn-primary d-flex gap-2 align-items-center' onClick={handleShowPDF}>
       {showPDF ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
       {showPDF ? 'Hide Preview Data Stock' : 'Show Preview Data Stock'}
      </button>
     </div>
     <div className='mb-4 d-flex justify-content-between align-items-center flex-wrap'>
      <div className='d-flex gap-3 align-items-center w-25'>
       <p className='m-0'>Category :</p>
       <select className='form-select w-50' aria-label='Default select example' value={categoryValue} onChange={handleCategoryChange}>
        {categoryQuery.map((cat) => (
         <option key={cat.id} value={cat.name}>
          {cat.name}
         </option>
        ))}
       </select>
      </div>
      <div className='input-group w-25'>
       <span className='input-group-text'>Search</span>
       <input type='search' className='form-control' aria-label='search' placeholder='Search by name here...' onChange={handleSearchChange} onBlur={handleSearchBlur} value={searchQuery} />
      </div>
     </div>
     <div className='table-responsive'>
      {!showPDF && (
       <table className='table table-bordered text-center align-middle'>
        <thead>
         <tr>
          <th className='bg-secondary-subtle'>No</th>
          <th className='bg-secondary-subtle'>DATE</th>
          <th className='bg-secondary-subtle'>ID PRODUCT</th>
          <th className='bg-secondary-subtle'>NAME PRODUCT</th>
          <th className='bg-secondary-subtle'>QTY</th>
          <th className='bg-secondary-subtle'>CATEGORY</th>
          <th className='bg-secondary-subtle'>ACTION</th>
         </tr>
        </thead>
        <tbody>
         {search
          ? filteredProductsSearch.map((product, index) => (
             <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.date}</td>
              <td>{product.idProduct}</td>
              <td>{product.name}</td>
              <td>{product.qty}</td>
              <td>{product.category}</td>
              <td className='d-flex gap-2 justify-content-center'>
               <button className='btn btn-primary' onClick={() => handleEdit(product.id)}>
                <BiEdit className='fs-5' />
               </button>
               <button className='btn btn-danger' onClick={() => deleteProduct(product.id, product.category)}>
                <BiTrash className='fs-5' />
               </button>
              </td>
             </tr>
            ))
          : category &&
            filteredProductsCategory.map((product, index) => (
             <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.date}</td>
              <td>{product.idProduct}</td>
              <td>{product.name}</td>
              <td>{product.qty}</td>
              <td>{product.category}</td>
              <td className='d-flex gap-2 justify-content-center'>
               <button className='btn btn-primary' onClick={() => handleEdit(product.id)}>
                <BiEdit className='fs-5' />
               </button>
               <button className='btn btn-danger' onClick={() => deleteProduct(product.id, product.category)}>
                <BiTrash className='fs-5' />
               </button>
              </td>
             </tr>
            ))}
         {!search &&
          !category &&
          products.map((product, index) => (
           <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.date}</td>
            <td>{product.idProduct}</td>
            <td>{product.name}</td>
            <td>{product.qty}</td>
            <td>{product.category}</td>
            <td className='d-flex gap-2 justify-content-center'>
             <button className='btn btn-primary' onClick={() => handleEdit(product.id)}>
              <BiEdit className='fs-5' />
             </button>
             <button className='btn btn-danger' onClick={() => deleteProduct(product.id, product.category)}>
              <BiTrash className='fs-5' />
             </button>
            </td>
           </tr>
          ))}
        </tbody>
       </table>
      )}
     </div>
     {showPDF && <ProductDownload search={search} filteredProductsSearch={filteredProductsSearch} category={category} filteredProductsCategory={filteredProductsCategory} products={products} />}
    </div>
   </div>
   <ProductInput isOpen={isOpen} handleOpenPopup={handleOpenPopup} updateProduct={updateProduct} addProduct={addProduct} />
  </div>
 );
}
