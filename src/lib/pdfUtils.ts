import {
  PDFDocument,
  rgb,
  pushGraphicsState,
  popGraphicsState,
  translate,
  rotateRadians,
} from 'pdf-lib';

export interface Paper {
  id: string;
  title: string;
  paper_type: string;
  standard: string;
  subject: string;
  file_url: string;
  file_name: string;
}

export interface UserInfo {
  collegeName: string;
  email: string;
  phone: string;
}

const containsDevanagari = (text: string): boolean =>
  /[\u0900-\u097F]/.test(text);

async function addMarathiTextAsImage(
  page: any,
  text: string,
  pageWidth: number,
  pageHeight: number
) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = Math.min(Math.max(800, text.length * 25), 1400);
    canvas.height = 100;

    let fontSize = 42;
    ctx.font = `bold ${fontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    while (ctx.measureText(text).width > canvas.width * 0.9 && fontSize > 16) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageBytes = await fetch(canvas.toDataURL('image/png')).then((r) =>
      r.arrayBuffer()
    );
    const image = await page.doc.embedPng(imageBytes);

    const scale = Math.min((pageWidth * 0.8) / canvas.width, 0.5);
    const dims = image.scale(scale);

    page.drawImage(image, {
      x: (pageWidth - dims.width) / 2,
      y: pageHeight - 45,
      width: dims.width,
      height: dims.height,
    });
  } catch (e) {
    console.warn('Marathi header failed:', e);
  }
}

async function addSingleMarathiWatermark(
  page: any,
  text: string,
  pageWidth: number,
  pageHeight: number
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 2000;
  canvas.height = 600;

  let fontSize = 200;
  ctx.font = `bold ${fontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(120,120,120,0.35)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  while (ctx.measureText(text).width > canvas.width * 0.9 && fontSize > 40) {
    fontSize -= 5;
    ctx.font = `bold ${fontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imgBytes = await fetch(canvas.toDataURL('image/png')).then((r) =>
    r.arrayBuffer()
  );
  const img = await page.doc.embedPng(imgBytes);
  const dims = img.scale(1);

  page.pushOperators(pushGraphicsState());
  page.pushOperators(translate(pageWidth / 2, pageHeight / 2));
  page.pushOperators(rotateRadians(Math.PI / 4));
  page.drawImage(img, {
    x: -dims.width / 2,
    y: -dims.height / 2,
    width: dims.width,
    height: dims.height,
  });
  page.pushOperators(popGraphicsState());
}

async function addSingleEnglishWatermark(
  page: any,
  text: string,
  pageWidth: number,
  pageHeight: number,
  pdfDoc: any
) {
  const font = await pdfDoc.embedFont('Helvetica-Bold');
  let fontSize = Math.min((pageWidth / text.length) * 2, 180);

  while (
    font.widthOfTextAtSize(text, fontSize) > pageWidth * 0.8 &&
    fontSize > 30
  ) {
    fontSize -= 5;
  }

  page.pushOperators(pushGraphicsState());
  page.pushOperators(translate(pageWidth / 2, pageHeight / 2));
  page.pushOperators(rotateRadians(Math.PI / 4));
  page.drawText(text, {
    x: -font.widthOfTextAtSize(text, fontSize) / 2,
    y: -fontSize / 2,
    size: fontSize,
    font,
    color: rgb(0.45, 0.45, 0.45),
    opacity: 0.35,
  });
  page.pushOperators(popGraphicsState());
}

export const downloadWithWatermark = async (
  fileUrl: string,
  userInfo: UserInfo,
  title: string
): Promise<Blob> => {
  try {
    const response = await fetch(fileUrl);
    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();

      // Add header with title
      if (containsDevanagari(title)) {
        await addMarathiTextAsImage(page, title, width, height);
      } else {
        const font = await pdfDoc.embedFont('Helvetica-Bold');
        let fontSize = 24;
        while (font.widthOfTextAtSize(title, fontSize) > width * 0.8 && fontSize > 12) {
          fontSize -= 2;
        }
        page.drawText(title, {
          x: (width - font.widthOfTextAtSize(title, fontSize)) / 2,
          y: height - 35,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      // Add watermark with college name
      if (containsDevanagari(userInfo.collegeName)) {
        await addSingleMarathiWatermark(page, userInfo.collegeName, width, height);
      } else {
        await addSingleEnglishWatermark(
          page,
          userInfo.collegeName,
          width,
          height,
          pdfDoc
        );
      }
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw error;
  }
};

export const downloadActualPDF = async (
  paper: { file_url: string; title: string; standard: string; subject: string; paper_type: string },
  userInfo: UserInfo
) => {
  try {
    const watermarkedPdf = await downloadWithWatermark(
      paper.file_url,
      userInfo,
      paper.title
    );

    const url = URL.createObjectURL(watermarkedPdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${userInfo.collegeName.replace(/\s+/g, '_')}_${paper.standard}_${paper.subject}_${paper.paper_type}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};
