import { drive_v3 } from 'googleapis';
import 'dotenv/config';
import {FileMetadataModel} from '../../models/fileMetadataModel.js'

//const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const convertFileToFileMetadataModel = (file: drive_v3.Schema$File): FileMetadataModel => {
  return {
    id: file.id,
    name: file.name,
    mimeType: file.mimeType,
    kind: file.kind,
    shared: file.shared,
  }
}

const getFilesMetadataByQ = async (auth: drive_v3.Drive, q: string): Promise<FileMetadataModel[]> => {
  try {
    const res = await auth.files.list({
      q,
      fields: 'files(id, name, mimeType, kind, shared)',
    });

    const files = res.data.files;

    if (files && files.length) {
      return files.map(convertFileToFileMetadataModel);
    } else {
      console.log('File not found.');
      return [];
    }

  } catch (err) {
    console.error('Error retrieving file metadata:', err);
    return [];
  }
}

const getFileMetadataById = async (auth: drive_v3.Drive, fileId: string): Promise<FileMetadataModel | null> => {
  try {
    const res = await auth.files.get({
      fileId,
      fields: 'id, name, mimeType, kind, shared',
    });

    const file = res.data;

    if (file) {
      return convertFileToFileMetadataModel(file);
    } else {
      console.log('File not found.');
      return null;
    }

  } catch (err) {
    console.error('Error retrieving file metadata:', err);
    return null;
  }
}

const getFilesMetadataByName = async (auth: drive_v3.Drive, fileName: string): Promise<FileMetadataModel[]> => {
  const q = `name contains '${fileName}'`;
  return getFilesMetadataByQ(auth, q);
};

const getFolderByName = async (auth: drive_v3.Drive, folderName: string): Promise<FileMetadataModel[]> => {
  const q = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`;
  return getFilesMetadataByQ(auth, q);
}

const getFilesInFolder = async (auth: drive_v3.Drive, folderId: string): Promise<FileMetadataModel[]> => {
  const q = `'${folderId}' in parents`;
  return getFilesMetadataByQ(auth, q);
};

export {
  getFilesMetadataByName,
  getFileMetadataById,
  getFolderByName,
  getFilesInFolder,
};
