import { authorize } from './services/googleAuthorization/authorization.js';
import { getFilesMetadataByName, getFolderByName, getFilesInFolder, } from './services/googleDrive/fileMetadataService.js';
import { downloadFileRouter } from './services/googleDrive/fileService.js';
async function main() {
    const auth = await authorize();
    const fileIds = await getFilesMetadataByName(auth, 'ביטוח לאומי - משכורת חודש 02');
    if (fileIds) {
        console.log('File IDs: ', fileIds);
    }
    const folderIds = await getFolderByName(auth, 'תיכון');
    if (folderIds.length != 1) {
        console.error('did not find or found more than 1 folder with that name');
    }
    console.log({ folder: folderIds[0] });
    const filesInDirectory = await getFilesInFolder(auth, folderIds[0].id);
    if (filesInDirectory) {
        console.log({ filesInDirectory });
    }
    await downloadFileRouter(auth, fileIds[0], './');
}
(async () => {
    await main();
})();
//# sourceMappingURL=main.js.map