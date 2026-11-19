import { toPng } from 'html-to-image';

function createJPG(htmlBlock: HTMLDivElement | null) {
    if (htmlBlock === null) {
        return;
    }

    toPng(htmlBlock, { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'liberty-car.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
}


export default createJPG;