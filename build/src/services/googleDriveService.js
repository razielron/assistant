import 'dotenv/config';
//const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const getFileMetadataByName = async (auth, fileName) => {
    try {
        const res = await auth.files.list({
            q: `name contains '${fileName}'`,
            fields: 'files(id, name, mimeType, modifiedTime)',
        });
        const files = res.data.files;
        if (files && files.length) {
            return files.map(x => ({ id: x.id, name: x.name }));
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
            fileId: fileId,
            fields: 'id, name, mimeType, modifiedTime',
        });
        const fileMetadata = res.data;
        if (fileMetadata) {
            console.log('File metadata:', fileMetadata);
        }
        else {
            console.log('File not found.');
        }
    }
    catch (err) {
        console.error('Error retrieving file metadata:', err);
    }
};
export { getFileMetadataByName, getFileMetadataById };
//# sourceMappingURL=googleDriveService.js.map