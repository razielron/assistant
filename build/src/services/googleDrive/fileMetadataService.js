import 'dotenv/config';
//const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const convertFileToFileMetadataModel = (file) => {
    return {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        kind: file.kind,
        shared: file.shared,
    };
};
const getFilesMetadataByQ = async (auth, q) => {
    try {
        const res = await auth.files.list({
            q,
            fields: 'files(id, name, mimeType, kind, shared)',
        });
        const files = res.data.files;
        if (files && files.length) {
            return files.map(convertFileToFileMetadataModel);
        }
        else {
            console.log('File not found.');
            return [];
        }
    }
    catch (err) {
        console.error('Error retrieving file metadata:', err);
        return [];
    }
};
const getFileMetadataById = async (auth, fileId) => {
    try {
        const res = await auth.files.get({
            fileId,
            fields: 'id, name, mimeType, kind, shared',
        });
        const file = res.data;
        if (file) {
            return convertFileToFileMetadataModel(file);
        }
        else {
            console.log('File not found.');
            return null;
        }
    }
    catch (err) {
        console.error('Error retrieving file metadata:', err);
        return null;
    }
};
const getFilesMetadataByName = async (auth, fileName) => {
    const q = `name contains '${fileName}'`;
    return getFilesMetadataByQ(auth, q);
};
const getFolderByName = async (auth, folderName) => {
    const q = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`;
    return getFilesMetadataByQ(auth, q);
};
const getFilesInFolder = async (auth, folderId) => {
    const q = `'${folderId}' in parents`;
    return getFilesMetadataByQ(auth, q);
};
export { getFilesMetadataByName, getFileMetadataById, getFolderByName, getFilesInFolder, };
//# sourceMappingURL=fileMetadataService.js.map