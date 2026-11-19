function checkUrl(url: string) {
    try {
        if (url.trim() === '') return false;

        const iaaiRegExp = /^https:\/\/www\.iaai\.com\/VehicleDetail\/\d{8}~US$/;
        const copartRegExp = /^https:\/\/www\.copart\.com\/lot\/\d{8}?$/;

        const hostName = (new URL(url)).hostname;

        return hostName === "www.iaai.com" ? iaaiRegExp.test(url) : copartRegExp.test(url);
    } catch {
        return false;
    }
}


export default checkUrl;