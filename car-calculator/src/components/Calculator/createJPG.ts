import { toPng } from 'html-to-image';

async function createJPG(htmlBlock: HTMLDivElement | null) {
    if (htmlBlock === null) {
        return;
    }

    try {
        const dataUrl = await toPng(htmlBlock, { cacheBust: true });
        const link = document.createElement('a');
        link.download = 'liberty-car.png';
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.log(err);
    }
}


export default createJPG;
