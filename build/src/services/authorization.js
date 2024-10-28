import { google } from 'googleapis';
import * as fs from 'fs';
import * as rls from 'readline-sync';
import clipboardy from 'clipboardy';
import 'dotenv/config';
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = 'token.json';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
/**
 * Authorizes the application and stores the token for future use.
 * @returns A promise that resolves with the authorized OAuth2 client.
 */
async function authorize() {
    // Create an OAuth2 client with the given credentials.
    console.log("before try");
    const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'urn:ietf:wg:oauth:2.0:oob');
    // Check if we have previously stored a token.
    try {
        console.log("try");
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
        oAuth2Client.setCredentials(token);
        return google.drive({ version: 'v3', auth: oAuth2Client });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        console.log("catch");
        // If no token is found, get a new one.
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        await clipboardy.write(authUrl);
        const code = await new Promise((resolve) => {
            // Get the authorization code from the user (e.g., via a prompt).
            // Replace this with your preferred method of obtaining the code.
            // For example, you could use readline-sync:
            const code = rls.question('Enter the code from that page here: ');
            resolve(code);
            //throw new Error('Authorization code input not implemented.');
        });
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        // Store the token to disk for later program executions
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log('Token stored to', TOKEN_PATH);
        return google.drive({ version: 'v3', auth: oAuth2Client });
    }
}
export { authorize, };
//# sourceMappingURL=authorization.js.map