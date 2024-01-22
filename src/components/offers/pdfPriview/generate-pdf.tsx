// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { Pdf } from "@/components/pdf/pdf";

// const generatePDF = async () => {
//   const input = document.getElementById('pdfContent');
//   const canvas = await html2canvas(input);
//   const imgData = canvas.toDataURL('image/png');
//   const pdf = new jsPDF({
//     orientation: 'portrait',
//     unit: 'px',
//     format: [canvas.width, canvas.height]
//   });

//   pdf.addImage(imgData, 'PNG', 0, 0);
//   pdf.save('download.pdf');
// };

// export const GeneratePDF = () => {
//   return (
//     <div>
//       <div id="pdfContent" className="flex flex-col gap-y-[30px]">
//         <Pdf />
//       </div>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// };
