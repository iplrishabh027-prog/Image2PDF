
import { jsPDF } from 'jspdf';
import { ImageFile, PDFSettings, PageSize, Orientation } from '../types';

/**
 * Converts a list of ImageFiles into a single PDF Blob.
 */
export const generatePDF = async (images: ImageFile[], settings: PDFSettings): Promise<Blob> => {
  const { pageSize, orientation, margin } = settings;
  
  // Initialize jsPDF
  // If pageSize is 'auto', we'll set it per page, but start with A4
  const doc = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: pageSize === PageSize.AUTO ? 'a4' : pageSize,
  });

  for (let i = 0; i < images.length; i++) {
    const imgData = await getImageDataUrl(images[i].file);
    const { width: imgW, height: imgH } = await getImageDimensions(imgData);

    // Calculate dimensions in mm
    // jsPDF default is 72 DPI, 1 inch = 25.4 mm
    const pxToMm = 0.264583;
    let finalW_mm = imgW * pxToMm;
    let finalH_mm = imgH * pxToMm;

    // Determine page dimensions
    let pageWidth: number;
    let pageHeight: number;

    if (pageSize === PageSize.AUTO) {
      pageWidth = finalW_mm + (margin * 2);
      pageHeight = finalH_mm + (margin * 2);
    } else {
      // Standard formats handle orientation internally in jsPDF, 
      // but we need to know the values for scaling logic.
      const dims = doc.internal.pageSize;
      pageWidth = dims.getWidth();
      pageHeight = dims.getHeight();
    }

    // Add new page if not the first
    if (i > 0) {
      doc.addPage(pageSize === PageSize.AUTO ? [pageWidth, pageHeight] : pageSize, orientation);
    } else if (pageSize === PageSize.AUTO) {
      // For the first page, if auto, we must adjust the initial page size
      // jsPDF doesn't easily allow changing the first page's size after creation without a workaround
      // So for Auto, we might just use setPage
      (doc as any).internal.pageSize.width = pageWidth;
      (doc as any).internal.pageSize.height = pageHeight;
    }

    // Scale image to fit within margins
    const maxWidth = pageWidth - (margin * 2);
    const maxHeight = pageHeight - (margin * 2);

    const ratio = Math.min(maxWidth / finalW_mm, maxHeight / finalH_mm);
    const renderW = finalW_mm * ratio;
    const renderH = finalH_mm * ratio;

    // Center image
    const x = (pageWidth - renderW) / 2;
    const y = (pageHeight - renderH) / 2;

    doc.addImage(imgData, 'JPEG', x, y, renderW, renderH);
  }

  return doc.output('blob');
};

const getImageDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = dataUrl;
  });
};
