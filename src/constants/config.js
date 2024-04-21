export const apiBaseUrl = process.env.NODE_ENV == 'production' ? 'https://apis.ircascms.com' : 'http://localhost:4000';
export const baseUrl = process.env.NODE_ENV == 'production' ? '/' : '/';
export const apiBaseUrlImage = process.env.NODE_ENV == 'production' ?
    'https://apis.ircascms.com/public/' :
    'http://localhost:4000/public/';

    export const SetBgColor = (index, color) => {
        return color && color !== "#fff" ? color : index % 2 !== 0 ? "#e9f6fd" : "#d5e8f3";
    }
    
    export const setCursor = (cursorName) => {
        document.body.style.cursor = cursorName;
    }
    
    export const getCursor = () => {
        return document.body.style.cursor;
    }
    
    export function getDarkerColor(color, percent = -12) {
    
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;
    
        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)
    
        var RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));
    
        return "#" + RR + GG + BB;
    }