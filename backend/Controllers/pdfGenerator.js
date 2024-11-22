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
  doc.text(`Comments: ${comments}`);
  doc.moveDown();

  // Add table
// Define table headers
const tableHeaders = [
  { label: 'Position', property: 'position', width: 100 },
  { label: 'Nature of Appointment', property: 'natureOfAppointment', width: 150 },
  { label: 'Institute', property: 'institute', width: 150 },
  { label: 'Service Period', property: 'servicePeriod', width: 100 }
];

// Create table with data
doc.moveDown();
doc.font('Courier-Bold').text('Service Details:', { align: 'left' });

doc.fontSize(12).font('Courier');

// Table layout
doc.text(`${'Position'.padEnd(20)} | ${'Nature of Appointment'.padEnd(30)} | ${'Institute'.padEnd(30)} | ${'Service Period'.padEnd(15)}`);
doc.text('-'.repeat(100));

tableData.forEach(row => {
  doc.text(
    `${row.position.padEnd(20)} | ${row.natureOfAppointment.padEnd(30)} | ${row.institute.padEnd(30)} | ${row.servicePeriod.padEnd(15)}`
  );
});

doc.moveDown();

  // Footer Section
  doc.moveDown(2);
  doc.fontSize(12).text('This letter is issued at her own request.', { align: 'left' });
  doc.moveDown(5);
  doc.text('Roshan Agampodi', { align: 'left' });
  doc.text('Head of Division (Administration)', { align: 'left' });
  doc.text('Urban Settlement Development Authority', { align: 'left' });

  doc.end();
};
