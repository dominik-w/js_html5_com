/*
 * Utils for node.js programs
 * (c) http://javascript-html5-tutorial.com/
 */

var tools = {
    sanitize: function (html) {
        return String(html)
                .replace(/&(?!\w+;)/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
    },
    
    addslashes: function (str) {
        // http://phpjs.org/functions/addslashes/
        return (str + '')
                .replace(/[\\"']/g, '\\$&')
                .replace(/\u0000/g, '\\0');
    },
    
    getNow: function () {
        var date = new Date();

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        var hh = date.getHours();
        hh = (hh < 10 ? "0" : "") + hh;

        var mm = date.getMinutes();
        mm = (mm < 10 ? "0" : "") + mm;

        return year + "-" + month + "-" + day + " " + hh + ":" + mm;
    }
    
};

module.exports = tools;
