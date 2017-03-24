
/*function to gradient*/
/*copy from http://stackoverflow.com/questions/3080421/javascript-color-gradient*/
function hex(a) {
    var b = "0123456789abcdef", c = parseInt(a);
    return 0 == c || isNaN(a) ? "00" : (c = Math.round(Math.min(Math.max(0, c), 255)), b.charAt((c - c % 16) / 16) + b.charAt(c % 16));
}
function convertToHex(a) {
    return hex(a[0]) + hex(a[1]) + hex(a[2]);
}
function trim(a) {
    return"#" == a.charAt(0) ? a.substring(1, 7) : a;
}
function convertToRGB(a) {
    var b = [];
    return b[0] = parseInt(trim(a).substring(0, 2), 16), b[1] = parseInt(trim(a).substring(2, 4), 16), b[2] = parseInt(trim(a).substring(4, 6), 16), b;
}
function generateColor(a, b, c) {
    var d = convertToRGB(a), e = convertToRGB(b), f = c, g = 0, h = [];
    for (i = 0; i < f; i++) {
        var j = [];
        g += 1 / f, j[0] = d[0] * g + (1 - g) * e[0], j[1] = d[1] * g + (1 - g) * e[1], j[2] = d[2] * g + (1 - g) * e[2], h.push(convertToHex(j));
    }
    return h;
}
/*function to gradient*/
/*function to convert hex to rgb*/
/*copy from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb*/
function hex2rgba(a, b) {
    var c = a.replace("#", "");
    c = c.match(new RegExp("(.{" + c.length / 3 + "})", "g"));
    for (var d = 0; d < c.length; d++)
        c[d] = parseInt(1 == c[d].length ? c[d] + c[d] : c[d], 16);
    return"undefined" != typeof b && c.push(b), "rgba(" + c.join(",") + ")";
}
/*function to convert hex to rgb*/