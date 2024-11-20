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

  const doc = new PDFDocument();
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

  // Generate PDF content
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

  // Table Header
  const tableTop = doc.y;
  const tableLeft = 50;
  const tableWidth = 500;

  doc.rect(tableLeft, tableTop, tableWidth, 20).stroke(); // Draw header box
  doc.text('Position', tableLeft + 5, tableTop + 5, { width: 120 });
  doc.text('Nature of Appointment', tableLeft + 125, tableTop + 5, { width: 120 });
  doc.text('Institute', tableLeft + 255, tableTop + 5, { width: 120 });
  doc.text('Service Period', tableLeft + 375, tableTop + 5, { width: 120 });

  // Table Rows
  let currentY = tableTop + 20;
  tableData.forEach(row => {
    doc.rect(tableLeft, currentY, tableWidth, 20).stroke(); // Draw row box
    doc.text(row.position, tableLeft + 5, currentY + 5, { width: 120 });
    doc.text(row.natureOfAppointment, tableLeft + 125, currentY + 5, { width: 120 });
    doc.text(row.institute, tableLeft + 255, currentY + 5, { width: 120 });
    doc.text(row.servicePeriod, tableLeft + 375, currentY + 5, { width: 120 });
    currentY += 20;
  });

  doc.moveDown();
  doc.text(`This letter is issued at her own request.`, { align: 'left' });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.text(`Roshan Agampodi`, { align: 'left' });
  doc.text(`Head of Division (Administration)`, { align: 'left' });
  doc.text(`Urban Settlement Development Authority`, { align: 'left' });

  doc.end();
};
