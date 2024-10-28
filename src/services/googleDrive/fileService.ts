import { drive_v3 } from 'googleapis';
import 'dotenv/config';
import * as fs from 'fs';
import { FileMetadataModel } from '../../models/fileMetadataModel.js';
import * as path from 'path';
import { getExportMimeType, getExtensionFromExportMimeType } from '../../models/mimeTypeMapping.js';

async function downloadFileRouter(auth: drive_v3.Drive, file: FileMetadataModel, destination: string): Promise<void> {
  const isGoogleWorkspaceFile = file.mimeType.startsWith('application/vnd.google-apps.');
  const exportMimeType = getExportMimeType(file.mimeType);
  const exportFileExtension = getExtensionFromExportMimeType(exportMimeType);
  const fileName = `${file.name}${exportFileExtension}`;
  const fullPath = path.join(destination, fileName);

  if (isGoogleWorkspaceFile) {
    await exportFile(auth, file, fullPath, exportMimeType);
  } else {
    await downloadFile(auth, file, fullPath);
  }
}

async function downloadFile(auth: drive_v3.Drive, file: FileMetadataModel, fullPath: string): Promise<void> {
  try {
    const dest = fs.createWriteStream(fullPath);
    const res = await auth.files.get(
      {
        fileId: file.id,
        alt: 'media',
      },
      { responseType: 'stream' }
    );

    res.data
      .on('end', () => {
        console.log('File downloaded successfully.');
      })
      .on('error', (err: Error) => {
        console.error('Error downloading file:', err);
      })
      .pipe(dest);
  } catch (error) {
    console.error('Error in downloadFile:', error);
  }
}

async function exportFile(auth: drive_v3.Drive, file: FileMetadataModel, fullPath: string, exportMimeType: string): Promise<void> {
  try {
    const dest = fs.createWriteStream(fullPath);
    const res = await auth.files.export(
      {
        fileId: file.id,
        mimeType: exportMimeType,
      },
      { responseType: 'stream' }
    );

    res.data
      .on('end', () => {
        console.log('File exported successfully.');
      })
      .on('error', (err: Error) => {
        console.error('Error exporting file:', err);
      })
      .pipe(dest);
  } catch (error) {
    console.error('Error in exportFile:', error);
  }
}

export {
  downloadFileRouter,
  downloadFile,
  exportFile,
};
