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
  doc.fontSize(12).text(`Employee Name: ${employeeName}`);
  doc.text(`Employee No: ${employeeNo}`);
  doc.text(`NIC: ${nic}`);
  doc.text(`Permanent Address: ${address}`);
  doc.text(`Designation: ${designation}`);
  doc.text(`Nature of Appointment: ${natureOfAppointment}`);
  doc.text(`Retirement Date: ${retirementDate}`);
  doc.moveDown();
  doc.text(`Comments: ${comments}`);
  doc.moveDown();

  // Add table
  tableData.forEach((row) => {
    doc.text(`${row.position} | ${row.natureOfAppointment} | ${row.institute} | ${row.servicePeriod}`);
  });

  // Footer Section
  doc.moveDown(2);
  doc.fontSize(12).text('This letter is issued at her own request.', { align: 'left' });
  doc.moveDown();
  doc.text('Roshan Agampodi', { align: 'left' });
  doc.text('Head of Division (Administration)', { align: 'left' });
  doc.text('Urban Settlement Development Authority', { align: 'left' });

  doc.end();
};
