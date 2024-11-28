const PDFDocument = require('pdfkit');

exports.generateLetter = (req, res) => {
  const {
    fileNo,
    date,
    employeeName,
    employeeNo,
    nic,
    address,
    designation,
    natureOfAppointment,
    retirementDate,
    comments,
    tableData,
  } = req.body;

  const doc = new PDFDocument({ margin: 50 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfData.length,
      })
      .end(pdfData);
  });

  // Header Section
  doc.fontSize(12).text(`Date: ${date}`, { align: 'left' });
  doc.text(`File No:- ${fileNo}`, { align: 'left' });
  doc.moveDown();
  doc.text(`TO WHOM IT MAY CONCERN`, { align: 'left' });
  doc.moveDown();
  doc.fontSize(14).text(`SERVICE CONFIRMATION LETTER`, { align: 'center', underline: true });
  doc.moveDown();
  doc.font('Courier')
   .fontSize(12)
   .text(`Employee Name          : ${employeeName}`)
   .text(`Employee No            : ${employeeNo}`)
   .text(`NIC                    : ${nic}`)
   .text(`Permanent Address      : ${address}`)
   .text(`Designation            : ${designation}`)
   .text(`Nature of Appointment  : ${natureOfAppointment}`)
   .text(`Retirement Date        : ${retirementDate}`);
  doc.moveDown();
  doc.text(`Comments : ${comments}`);
  
// Add table header with borders
doc.moveDown();
doc.font('Courier-Bold').fontSize(12).text('Service Details:', { align: 'left' });
doc.moveDown(0.5);

// Define column positions and widths
const startX = 50; // Starting X position for the table
const columnWidths = {
  position: 100,
  natureOfAppointment: 150,
  institute: 90,
  servicePeriod: 150,
};
let y = doc.y; // Starting Y position

// Draw table headers with borders
doc.fontSize(11).font('Courier-Bold');
['Position', 'Nature of Appointment', 'Institute', 'Service Period'].forEach((header, index) => {
  const x = startX + Object.values(columnWidths).slice(0, index).reduce((a, b) => a + b, 0);
  doc
    .rect(x, y, columnWidths[Object.keys(columnWidths)[index]], 20) // Draw header cell border
    .stroke(); // Draw the border
  doc.text(header, x + 5, y + 5, { width: columnWidths[Object.keys(columnWidths)[index]], align: 'left' });
});
y += 20; // Move down to the next row

// Draw table rows with borders
doc.font('Courier').fontSize(11);
tableData.forEach((row) => {
  ['position', 'natureOfAppointment', 'institute', 'servicePeriod'].forEach((key, index) => {
    const x = startX + Object.values(columnWidths).slice(0, index).reduce((a, b) => a + b, 0);
    doc
      .rect(x, y, columnWidths[key], 20) // Draw cell border
      .stroke(); // Draw the border
    doc.text(row[key], x + 5, y + 5, { width: columnWidths[key], align: 'left' });
  });
  y += 20; // Space between rows
});

// Footer Section
doc.moveDown(2);
doc.fontSize(12).text('This letter is issued at her own request.', 50); // Ensure text starts at X position 50
doc.moveDown(3);
doc.text('- - - - - - - - - - -', 50); // Align explicitly to the left
doc.text('Roshan Agampodi', 50); // Align explicitly to the left
doc.text('Head of Division (Administration)', 50); // Align explicitly to the left
doc.text('Urban Settlement Development Authority', 50); // Align explicitly to the left


doc.end();
};
