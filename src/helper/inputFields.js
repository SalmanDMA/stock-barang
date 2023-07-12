export const inputFields = [
 {
  id: 1,
  nameAttribute: 'date',
  label: 'Date',
  type: 'date',
  validation: {
   required: {
    value: true,
    message: 'Date is required',
   },
  },
 },
 {
  id: 2,
  nameAttribute: 'idProduct',
  label: 'Id Product',
  type: 'text',
  validation: {
   required: {
    value: true,
    message: 'Id Product is required',
   },
   pattern: {
    value: /^[0-9]+$/,
    message: 'Id Product must be a number',
   },
  },
 },
 {
  id: 3,
  nameAttribute: 'name',
  label: 'Name',
  type: 'text',
  validation: {
   required: {
    value: true,
    message: 'Name is required',
   },
   minLength: {
    value: 2,
    message: 'Name must be at least 2 characters',
   },
   pattern: {
    value: /^[A-Za-z\s]+$/,
    message: 'Name must contain only letters and spaces',
   },
  },
 },
 {
  id: 4,
  nameAttribute: 'qty',
  label: 'Qty',
  type: 'text',
  validation: {
   required: {
    value: true,
    message: 'Qty is required',
   },
   pattern: {
    value: /^[0-9]+$/,
    message: 'Qty must be a number',
   },
  },
 },
 {
  id: 5,
  nameAttribute: 'category',
  label: 'Category',
  type: 'text',
  validation: {
   required: {
    value: true,
    message: 'Category is required',
   },
   minLength: {
    value: 2,
    message: 'Category must be at least 10 characters',
   },
   pattern: {
    value: /^[A-Za-z\s]+$/,
    message: 'Category must contain only letters and spaces',
   },
  },
 },
];
