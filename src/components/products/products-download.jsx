import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BiDownload } from 'react-icons/bi';

export default function ProductDownload({ search, filteredProductsSearch, category, filteredProductsCategory, products }) {
 const handleDownloadPdf = () => {
  const pdfWidth = 21; // Lebar dokumen PDF dalam cm
  const pdfHeight = 29.7; // Tinggi dokumen PDF dalam cm

  const tableWidth = 18; // Lebar tabel dalam cm
  const tableHeight = 20; // Tinggi tabel dalam cm

  const marginTop = 1; // Jarak dari batas atas dalam cm

  html2canvas(document.querySelector('.table-download')).then((canvas) => {
   const imgData = canvas.toDataURL('image/png');
   const pdf = new jsPDF('p', 'cm', 'a4');

   // Mengatur skala gambar agar sesuai dengan ukuran tabel yang diinginkan
   const scale = Math.min(tableWidth / canvas.width, tableHeight / canvas.height);
   const scaledWidth = canvas.width * scale;
   const scaledHeight = canvas.height * scale;

   // Mengatur posisi gambar di atas dokumen PDF dengan jarak dari batas atas
   const x = (pdfWidth - scaledWidth) / 2;
   const y = marginTop;

   pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
   pdf.save('stock-barang.pdf');
  });
 };

 const tableStyle = {
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  borderCollapse: 'collapse',
  fontFamily: 'Arial, sans-serif',
 };

 const thStyle = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #dddddd',
  padding: '8px',
  fontSize: '16px',
 };

 const tdStyle = {
  border: '1px solid #dddddd',
  padding: '8px',
  fontSize: '14px',
 };

 return (
  <div className='w-75 mx-auto'>
   <div className='table-download'>
    <h3 className='text-center'>Stock Barang</h3>
    <table className='table table-bordered text-center align-middle' style={tableStyle}>
     <thead>
      <tr>
       <th style={thStyle}>No</th>
       <th style={thStyle}>DATE</th>
       <th style={thStyle}>ID PRODUCT</th>
       <th style={thStyle}>NAME PRODUCT</th>
       <th style={thStyle}>QTY</th>
       <th style={thStyle}>CATEGORY</th>
      </tr>
     </thead>
     <tbody>
      {search
       ? filteredProductsSearch.map((product, index) => (
          <tr key={product.id}>
           <td style={tdStyle}>{index + 1}</td>
           <td style={tdStyle}>{product.date}</td>
           <td style={tdStyle}>{product.idProduct}</td>
           <td style={tdStyle}>{product.name}</td>
           <td style={tdStyle}>{product.qty}</td>
           <td style={tdStyle}>{product.category}</td>
          </tr>
         ))
       : category &&
         filteredProductsCategory.map((product, index) => (
          <tr key={product.id}>
           <td style={tdStyle}>{index + 1}</td>
           <td style={tdStyle}>{product.date}</td>
           <td style={tdStyle}>{product.idProduct}</td>
           <td style={tdStyle}>{product.name}</td>
           <td style={tdStyle}>{product.qty}</td>
           <td style={tdStyle}>{product.category}</td>
          </tr>
         ))}
      {!search &&
       !category &&
       products.map((product, index) => (
        <tr key={product.id}>
         <td style={tdStyle}>{index + 1}</td>
         <td style={tdStyle}>{product.date}</td>
         <td style={tdStyle}>{product.idProduct}</td>
         <td style={tdStyle}>{product.name}</td>
         <td style={tdStyle}>{product.qty}</td>
         <td style={tdStyle}>{product.category}</td>
        </tr>
       ))}
     </tbody>
    </table>
   </div>
   <div className='d-flex justify-content-center mt-3'>
    <button className='btn btn-primary d-flex gap-2 align-items-center' onClick={handleDownloadPdf}>
     <BiDownload />
     Print Data Stock
    </button>
   </div>
  </div>
 );
}
