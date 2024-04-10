export class Utils {
    static async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generatePIN(length: number) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}