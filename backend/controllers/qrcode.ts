import {  Context, qrcode } from "../deps.ts";
import db from "../config/db.ts";



function dataURLtoBlob(dataUrl: string): Blob {
    // Decode the dataURL
    const binary: string = atob(dataUrl.split(',')[1]);

    // Create 8-bit unsigned array
    const array: number[] = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    // Return our Blob object
    return new Blob([new Uint8Array(array)], {
        type: 'image/png',
    });
}
export async function genQRCode(context: Context) {
    try {
        
        const result = await db.queryObject('SELECT url_temp FROM customers ORDER BY RANDOM() LIMIT 1');
        if (result.rows && result.rows.length > 0) {
            const urlData = result.rows[0].url_temp;
            const base64Image = await qrcode(urlData);
            const blob = dataURLtoBlob(base64Image);

            context.response.body = blob;
            context.response.headers.set('Content-Type', 'image/png');
            context.response.headers.set("Content-Disposition", 'attachment; filename=qrcode.png');
        } else {
            context.response.status = 404;
            context.response.body = { error: 'No URL found in the database' };
        }
    } catch (error) {
        console.error('Error ', error);
        context.response.status = 500; 
        context.response.body = { error: 'Internal server error' };
    }
}

