export function downloadFile(content: string, fileName: string): void {
  const data = "data:text/json;charset=utf-8," + encodeURIComponent(content);
  const downloadAnchorNode = document.createElement("a");

  downloadAnchorNode.setAttribute("href", data);
  downloadAnchorNode.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchorNode);

  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
