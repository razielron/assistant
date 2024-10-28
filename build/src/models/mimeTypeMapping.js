const mimeTypeMapping = {
    'application/vnd.google-apps.document': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Google Doc to DOCX
    'application/vnd.google-apps.spreadsheet': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Google Sheet to XLSX
    'application/vnd.google-apps.presentation': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', // Google Slides to PPTX
    'application/vnd.google-apps.drawing': 'image/png', // Google Drawing to PNG
    'application/vnd.google-apps.form': 'application/pdf', // Google Form to PDF
    'application/vnd.google-apps.script': 'application/vnd.google-apps.script+json', // Google Apps Script to JSON
    'application/vnd.google-apps.folder': 'application/vnd.google-apps.folder', // Google Folder (no export format)
    'application/vnd.google-apps.shortcut': 'application/vnd.google-apps.shortcut', // Google Shortcut (no export format)
    // Add more mappings for other Google Workspace file types as needed
};
const exportMimeTypeToExtension = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx', // DOCX
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx', // XLSX
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx', // PPTX
    'application/pdf': '.pdf', // PDF
    'image/png': '.png', // PNG
    'image/jpeg': '.jpg', // JPG
    'text/plain': '.txt', // TXT
    // Add more mappings for other export mime types as needed
};
function getExportMimeType(originalMimeType) {
    return mimeTypeMapping[originalMimeType] || originalMimeType;
}
function getExtensionFromExportMimeType(exportMimeType) {
    return exportMimeTypeToExtension[exportMimeType] || '';
}
export { getExportMimeType, getExtensionFromExportMimeType };
//# sourceMappingURL=mimeTypeMapping.js.map