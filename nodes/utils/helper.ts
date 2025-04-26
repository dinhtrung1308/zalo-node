import axios from 'axios';
import fs from 'fs';


export async function saveImage(url: string) {
    try {
        const timestamp = Date.now();          
        const imgPath  = `temp-${timestamp}.png`;

        const { data } = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));

        return imgPath;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function removeImage(imgPath: string) {
    try {
        fs.unlinkSync(imgPath);
    } catch (error) {
        console.error(error);
    }
}