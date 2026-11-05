export async function downloadCv() {
  const fileName = 'Noman_Hossain_CV.pdf';
  const fileUrl = '/Noman_Hossain_CV.pdf';

  try {
    const response = await fetch(fileUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = blobUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    }, 3000);
  } catch (error) {
    console.warn('Blob download fallback engaged:', error);
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
    }, 2000);
  }
}


