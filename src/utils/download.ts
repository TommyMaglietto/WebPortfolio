type DownloadOptions = {
  url: string;
  filename: string;
};

export async function downloadFile({ url, filename }: DownloadOptions) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
      window.location.href = url;
      return;
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.location.href = url;
  }
}
