import { AiFillCloseCircle } from 'react-icons/ai';
import './products-input.css';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { inputFields } from '../../../helper/inputFields';
import { useSelector } from 'react-redux';

export default function ProductInput({ isOpen, handleOpenPopup, updateProduct, addProduct }) {
 const overlayRef = useRef(null);
 const editingProduct = useSelector((state) => state.products.editingProduct);
 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  watch,
  setValue,
 } = useForm({
  defaultValues: editingProduct ? editingProduct : {},
  mode: 'onChange',
 });

 useEffect(() => {
  const handleEscapeKey = (event) => {
   if (event.keyCode === 27 && isOpen) {
    handleOpenPopup();
   }
  };

  document.addEventListener('keydown', handleEscapeKey);

  if (editingProduct) {
   inputFields.forEach(({ nameAttribute }) => {
    setValue(nameAttribute, editingProduct[nameAttribute]);
   });
  }

  return () => {
   document.removeEventListener('keydown', handleEscapeKey);
   inputFields.forEach(({ nameAttribute }) => {
    setValue(nameAttribute, '');
   });
  };
 }, [isOpen, handleOpenPopup, editingProduct, setValue]);

 const handleOverlayClick = (event) => {
  if (event.target === overlayRef.current) {
   handleOpenPopup();
  }
 };

 const onSubmit = (data) => {
  if (editingProduct) {
   if (editingProduct.id) {
    updateProduct(editingProduct.id, editingProduct.category, {
     ...data,
     id: editingProduct.id,
    });
   } else {
    console.error('Invalid editProduct');
   }
  } else {
   addProduct(data);
  }

  reset();
  handleOpenPopup();
 };

 return (
  <section className={`overlay ${isOpen ? 'show' : ''}`} onClick={handleOverlayClick} ref={overlayRef}>
   <div className={`card shadow mb-4 w-50 mx-auto position-relative form-container ${isOpen ? 'show' : ''}`}>
    <div className='close-btn' onClick={handleOpenPopup}>
     <AiFillCloseCircle className='icon-close' />
    </div>
    <div className='card-header bg-secondary-subtle py-3'>
     <h4 className='m-0 fw-bold text-primary'>{editingProduct ? 'Edit Product' : 'Add Product'}</h4>
    </div>
    <div className='card-body p-4'>
     <form onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map(({ id, nameAttribute, label, type, validation }) => (
       <div className='mb-3' key={id}>
        <label htmlFor={nameAttribute} className='form-label'>
         {label}
         <span className='text-danger'>*</span>
        </label>
        <input type={type} name={nameAttribute} className='form-control' id={nameAttribute} aria-describedby='dateHelp' {...register(nameAttribute, validation)} value={watch(nameAttribute) || ''} />
        {errors[nameAttribute] && <p className='text-danger'>{errors[nameAttribute].message}</p>}
       </div>
      ))}
      <button type='submit' className='btn btn-primary'>
       {editingProduct ? 'Update' : 'Add'}
      </button>
     </form>
    </div>
   </div>
  </section>
 );
}
