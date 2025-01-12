import { toJpeg } from 'html-to-image';

function createJPG(htmlBlock: HTMLDivElement | null) {
    if (htmlBlock === null) {
        return;
    }

    toJpeg(htmlBlock, { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'liberty-car.jpg'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
}


export default createJPG;