export function downloadFile(path, fileName) {
    var link = document.createElement("a");
    link.download = fileName;
    link.href = path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }