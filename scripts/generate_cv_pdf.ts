import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

async function generateCvPdf() {
  const pdfDoc = await PDFDocument.create();

  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // A4 dimensions: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 45;
  const contentWidth = pageWidth - marginX * 2; // 505.28

  // Colors
  const bannerBg = rgb(178 / 255, 209 / 255, 217 / 255); // soft slate teal
  const textDark = rgb(0.12, 0.12, 0.12);
  const textBody = rgb(0.15, 0.15, 0.15);
  const lineDark = rgb(0.75, 0.75, 0.75);

  // Helper for section banner
  function drawSectionBanner(page: any, title: string, yPos: number): number {
    const bannerHeight = 22;
    page.drawRectangle({
      x: marginX,
      y: yPos - bannerHeight,
      width: contentWidth,
      height: bannerHeight,
      color: bannerBg,
    });

    page.drawText(title, {
      x: marginX + 8,
      y: yPos - bannerHeight + 5.5,
      size: 13,
      font: timesBold,
      color: textDark,
    });

    return yPos - bannerHeight - 14;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  let y = pageHeight - 48;

  // Name
  page1.drawText('Noman Hossain', {
    x: marginX,
    y: y,
    size: 26,
    font: timesBold,
    color: textDark,
  });

  // Photo top-right
  const photoPath = path.resolve('public/cv-avatar.png');
  if (fs.existsSync(photoPath)) {
    try {
      const photoBytes = fs.readFileSync(photoPath);
      const photoImage = await pdfDoc.embedPng(photoBytes);
      const photoW = 76;
      const photoH = 88;
      const photoX = pageWidth - marginX - photoW;
      const photoY = y - 76;

      page1.drawRectangle({
        x: photoX - 1.5,
        y: photoY - 1.5,
        width: photoW + 3,
        height: photoH + 3,
        borderColor: lineDark,
        borderWidth: 1,
        color: rgb(1, 1, 1),
      });

      page1.drawImage(photoImage, {
        x: photoX,
        y: photoY,
        width: photoW,
        height: photoH,
      });
    } catch (e) {
      console.error('Error embedding photo:', e);
    }
  }

  y -= 26;

  // Mailing Address Header
  page1.drawText('Mailing Address:', {
    x: marginX,
    y: y,
    size: 11,
    font: timesBold,
    color: textDark,
  });

  y -= 15;
  page1.drawText('Holding No - 99, Kajibari, Satarkul, Badda, Dhaka.', {
    x: marginX,
    y: y,
    size: 10,
    font: timesRoman,
    color: textBody,
  });

  y -= 14;
  page1.drawText('Contact No: +8801309465316', {
    x: marginX,
    y: y,
    size: 10,
    font: timesRoman,
    color: textBody,
  });

  y -= 14;
  page1.drawText('E-mail: nomanhossaininfo@gmail.com', {
    x: marginX,
    y: y,
    size: 10,
    font: timesRoman,
    color: textBody,
  });

  y -= 14;
  page1.drawText('LinkedIn: linkedin.com/in/talha-jobaer-267b8a431/', {
    x: marginX,
    y: y,
    size: 10,
    font: timesRoman,
    color: textBody,
  });

  y -= 25;

  // SECTION 1: Professional Summary
  y = drawSectionBanner(page1, 'Professional Summary', y);

  const summaryLines = [
    'Video Editor & Motion Graphics Designer with a strong interest in creating engaging and',
    'visually clear content. Skilled in video editing, motion graphics, and visual storytelling,',
    'with practical experience working on different types of video projects. Skilled at approaching',
    'diverse video editing challenges with a practical problem-solving mindset.Always eager to learn,',
    'explore new techniques, and improve through hands-on work.',
  ];

  for (const line of summaryLines) {
    page1.drawText(line, {
      x: marginX,
      y: y,
      size: 9.5,
      font: timesRoman,
      color: textBody,
    });
    y -= 14.5;
  }

  y -= 12;

  // SECTION 2: Job Experience
  y = drawSectionBanner(page1, 'Job Experience', y);

  const jobExp = [
    { label: 'Position', value: 'Video Editor.' },
    { label: 'Institute', value: 'Content Creation Team.' },
    { label: 'Responsibility', value: 'Short Film & YouTube Content Editing' },
    { label: 'Duration', value: 'Feb 2025 - Jun 2025.' },
  ];

  for (const item of jobExp) {
    page1.drawText(item.label, {
      x: marginX,
      y: y,
      size: 10.5,
      font: timesBold,
      color: textDark,
    });
    page1.drawText(':', {
      x: marginX + 130,
      y: y,
      size: 10.5,
      font: timesBold,
      color: textDark,
    });
    page1.drawText(item.value, {
      x: marginX + 148,
      y: y,
      size: 10,
      font: timesRoman,
      color: textBody,
    });
    y -= 16;
  }

  y -= 12;

  // SECTION 3: Educational Qualifications
  y = drawSectionBanner(page1, 'Educational Qualifications', y);

  const eduItems = [
    { title: 'Diploma in Arabic Language', inst: 'Jamia Islamia Darul Uloom Madania, Bangladesh- (2025-2026)' },
    { title: 'Takmil (Dawra Hadith)', inst: 'Jamia Hossainia Madinatul Uloom, Tajumuddin, Bhola- (2024-2025 )' },
  ];

  for (const edu of eduItems) {
    page1.drawText(edu.title, {
      x: marginX,
      y: y,
      size: 10,
      font: timesBold,
      color: textDark,
    });
    const titleWidth = timesBold.widthOfTextAtSize(edu.title, 10);
    page1.drawText(` ${edu.inst}`, {
      x: marginX + titleWidth,
      y: y,
      size: 10,
      font: timesRoman,
      color: textBody,
    });
    y -= 18;
  }

  y -= 10;

  // SECTION 4: Professional Training
  y = drawSectionBanner(page1, 'Professional Training', y);

  const trainingInfo = [
    { label: 'Institute Name', value: 'As-Sunnah Skill Development Institute' },
    { label: 'Course Name', value: 'Small Business Management' },
    { label: 'Duration', value: '3 Months' },
  ];

  for (const t of trainingInfo) {
    page1.drawText(t.label, {
      x: marginX,
      y: y,
      size: 10,
      font: timesBold,
      color: textDark,
    });
    page1.drawText(':', {
      x: marginX + 130,
      y: y,
      size: 10,
      font: timesBold,
      color: textDark,
    });
    page1.drawText(t.value, {
      x: marginX + 148,
      y: y,
      size: 10,
      font: timesRoman,
      color: textBody,
    });
    y -= 15.5;
  }

  // Topic Covered:
  page1.drawText('Topic Covered:', {
    x: marginX,
    y: y,
    size: 10,
    font: timesBold,
    color: textDark,
  });
  y -= 14.5;

  const topics = [
    'Video Editing.',
    'Graphic Design.',
    'Meta Marketing.',
    'Artificial Intelligence.',
  ];

  for (const top of topics) {
    page1.drawText('•', {
      x: marginX + 8,
      y: y,
      size: 9,
      font: timesBold,
      color: textDark,
    });
    page1.drawText(top, {
      x: marginX + 22,
      y: y,
      size: 9.5,
      font: timesRoman,
      color: textBody,
    });
    y -= 14;
  }

  y -= 12;

  // SECTION 5: Skills
  y = drawSectionBanner(page1, 'Skills', y);

  // Hard Skills
  page1.drawText('•', {
    x: marginX,
    y: y,
    size: 9.5,
    font: timesBold,
    color: textDark,
  });
  page1.drawText('Hard Skills', {
    x: marginX + 14,
    y: y,
    size: 10,
    font: timesBold,
    color: textDark,
  });
  page1.drawText(':', {
    x: marginX + 130,
    y: y,
    size: 10,
    font: timesBold,
    color: textDark,
  });
  page1.drawText('Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop,', {
    x: marginX + 148,
    y: y,
    size: 9.5,
    font: timesRoman,
    color: textBody,
  });
  y -= 14;
  page1.drawText('Adobe Illustrator ,Canva, Genarative AI Tools.', {
    x: marginX + 148,
    y: y,
    size: 9.5,
    font: timesRoman,
    color: textBody,
  });

  y -= 18;

  // Soft Skill
  page1.drawText('•', {
    x: marginX,
    y: y,
    size: 9.5,
    font: timesBold,
    color: textDark,
  });
  page1.drawText('Soft Skill', {
    x: marginX + 14,
    y: y,
    size: 10,
    font: timesBold,
    color: textDark,
  });
  page1.drawText(':', {
    x: marginX + 130,
    y: y,
    size: 10,
    font: timesBold,
    color: textDark,
  });
  page1.drawText('Ms Word, Excel, PowerPoint, Meta Marketing.', {
    x: marginX + 148,
    y: y,
    size: 9.5,
    font: timesRoman,
    color: textBody,
  });
  y -= 14;
  page1.drawText('Problem Solving, Creative Thinking, Leadership, Teamwork,', {
    x: marginX + 148,
    y: y,
    size: 9.5,
    font: timesRoman,
    color: textBody,
  });
  y -= 14;
  page1.drawText('Time Management.', {
    x: marginX + 148,
    y: y,
    size: 9.5,
    font: timesRoman,
    color: textBody,
  });
  y -= 14;
  page1.drawText('Typing Speed: English — 35 WPM | Bangla — 16 WPM.', {
    x: marginX + 148,
    y: y,
    size: 9.5,
    font: timesRoman,
    color: textBody,
  });

  // ==========================================
  // PAGE 2
  // ==========================================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);

  let y2 = pageHeight - 50;

  // SECTION: Language Skills
  y2 = drawSectionBanner(page2, 'Language Skills', y2);

  const languages = [
    { name: 'Bangla', level: 'Native .' },
    { name: 'English', level: 'Working Proficiency.' },
    { name: 'Arabic', level: 'Working Proficiency.' },
    { name: 'Urdu', level: 'Basic Proficiency.' },
  ];

  for (const lang of languages) {
    page2.drawText('•', {
      x: marginX,
      y: y2,
      size: 9.5,
      font: timesBold,
      color: textDark,
    });
    page2.drawText(lang.name, {
      x: marginX + 14,
      y: y2,
      size: 10,
      font: timesBold,
      color: textDark,
    });
    page2.drawText(':', {
      x: marginX + 105,
      y: y2,
      size: 10,
      font: timesBold,
      color: textDark,
    });
    page2.drawText(lang.level, {
      x: marginX + 115,
      y: y2,
      size: 10,
      font: timesRoman,
      color: textBody,
    });
    y2 -= 17;
  }

  y2 -= 15;

  // SECTION: Reference
  y2 = drawSectionBanner(page2, 'Reference', y2);

  const references = [
    {
      name: 'Nazmul Huda',
      designation: 'Senior Trainer [ Video Editing ]',
      institute: 'As-Sunnah Skill Development Institute',
      mobile: '+8801571036429',
      email: 'nazmul.huda.editor@gmail.com',
    },
    {
      name: 'Sheikh Muhammod Akash',
      designation: 'Executive (Digital Management) & Video Editor',
      institute: 'ReThink',
      mobile: '+8801862338439',
      email: 'Sheikhmdakash8439@gmail.com',
    },
  ];

  for (let i = 0; i < references.length; i++) {
    const ref = references[i];
    const items = [
      { label: 'Name', value: ref.name },
      { label: 'Designation', value: ref.designation },
      { label: 'Institute Name', value: ref.institute },
      { label: 'Mobile', value: ref.mobile },
      { label: 'E-mail', value: ref.email },
    ];

    for (const it of items) {
      page2.drawText(it.label, {
        x: marginX,
        y: y2,
        size: 10,
        font: timesBold,
        color: textDark,
      });
      page2.drawText(':', {
        x: marginX + 105,
        y: y2,
        size: 10,
        font: timesBold,
        color: textDark,
      });
      page2.drawText(it.value, {
        x: marginX + 118,
        y: y2,
        size: 9.5,
        font: timesRoman,
        color: textBody,
      });
      y2 -= 16;
    }

    if (i === 0) {
      y2 -= 16;
    }
  }

  // QR Code at bottom center of Page 2
  try {
    const portfolioUrl = 'https://ais-pre-vtjinawy76zxcdritytl6r-368126515078.asia-southeast1.run.app';
    const qrDataUrl = await QRCode.toDataURL(portfolioUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    const qrBase64 = qrDataUrl.split(',')[1];
    const qrBytes = Buffer.from(qrBase64, 'base64');
    const qrImage = await pdfDoc.embedPng(qrBytes);

    const qrSize = 100;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = 160;

    page2.drawImage(qrImage, {
      x: qrX,
      y: qrY,
      width: qrSize,
      height: qrSize,
    });

    const scanText = 'Scan to see my portfolio';
    const scanTextW = timesBold.widthOfTextAtSize(scanText, 11);
    page2.drawText(scanText, {
      x: (pageWidth - scanTextW) / 2,
      y: qrY - 18,
      size: 11,
      font: timesBold,
      color: textDark,
    });
  } catch (err) {
    console.error('Error generating QR code for CV:', err);
  }

  // Save the PDF to public directory
  const pdfBytes = await pdfDoc.save();
  const outPath = path.resolve('public/Noman_Hossain_CV.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Successfully generated CV PDF at:', outPath, 'Bytes:', pdfBytes.length);
}

generateCvPdf().catch(console.error);
