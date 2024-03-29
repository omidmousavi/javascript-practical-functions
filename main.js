/**
 * return different of 2 inputs time
 * @param {number} hour1 
 * @param {number} minutes1 
 * @param {number} hour2 
 * @param {number} minutes2 
 * @returns different of 2 inputs time
 */
function diff_time(hour1, minutes1, hour2, minutes2) 
{
    let output_text = "";

    if (hour1 >= 24 || hour2 >= 24 || minutes1 >= 60 || minutes2 >= 60) {
        output_text = "نامشخص";
        return output_text;
    }
    let time1 = (hour1 * 60) + minutes1;
    let time2 = (hour2 * 60) + minutes2;
    // Found difference between time1 and time2 as minutes
    let diff_minutes = ((time2 < time1) ? (1440 - (time1 - time2)) : (time2 - time1));

    if (diff_minutes == 0) {
        output_text = "نامشخص";
        return output_text;
    }

    let diff_hour = 0;
    while (diff_minutes >= 60) {
        diff_hour++;
        diff_minutes = diff_minutes - 60;
    }

    if (diff_hour >= 1) {
        output_text += diff_hour + " ساعت ";
    }
    if (diff_hour >= 1 && diff_minutes >= 1) {
        output_text += " و ";
    }
    if (diff_minutes >= 1) {
        output_text += diff_minutes + " دقیقه ";
    }
    return output_text;
}

/**
 * Validate input value
 * @param {dictionary} setting = is_numeric, max_num, min_num, isset, is_email, max_str_len, min_str_len, str_len
 * @param {string|number} value 
 * @returns if value is ok return true else return false
 */
function validate_value(setting, value)
{
    // setting = {
    //     'is_numeric':true,
    //     'max_num':10,
    //     'min_num':2,
    //     'isset':true
    //     'is_email':true
    //     'max_str_len':20
    //     'min_str_len':10     
    //     'str_len':8
    // };

    if (setting.hasOwnProperty('is_numeric')) {
        if (isNaN(value))
            return false;
    }
    if (setting.hasOwnProperty('max_num')) {
        if (parseInt(value) > setting.max_num)
            return false;
    }
    if (setting.hasOwnProperty('min_num')) {
        if (parseInt(value) < setting.min_num)
            return false;
    }
    if (setting.hasOwnProperty('isset')) {
        if (value == null) {
            return false;
        } else if (value.trim() == '' || String(value).length == 0) {
            return false;
        }
    }
    if (setting.hasOwnProperty('is_email')) {
        let mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!value.match(mail_format)) {
            return false;
        }
    }
    if (setting.hasOwnProperty('max_str_len')) {
        if (String(value).length > setting.max_str_len)
            return false;
    }
    if (setting.hasOwnProperty('min_str_len')) {
        if (String(value).length < setting.min_str_len)
            return false;
    }
    if (setting.hasOwnProperty('str_len')) {
        if (String(value).length != setting.str_len)
            return false;
    }

    return true;
}

var cPrev = -1; // global var saves the previous c, used to
/**
 * sort table by table column of 0 to ...
 * @param {string} table_id 
 * @param {number} c 
 */
function sort_table(table_id, c) 
{
    rows = document.getElementById(table_id).rows.length; // num of rows
    columns = document.getElementById(table_id).rows[0].cells.length; // num of columns
    arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array

    for (ro = 0; ro < rows; ro++) { // cycle through rows
        for (co = 0; co < columns; co++) { // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById(table_id).rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it

    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }

    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro = 0; ro < rows; ro++) {
        for (co = 0; co < columns; co++) {
            document.getElementById(table_id).rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}

/**
 * XSS filter
 * @param {string} value 
 * @returns value
 */
function xss_filter(value) 
{
    let lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    value = value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    return value;
}

/**
 * split number width ( split_with_char = , )
 * @param {number} Number 
 * @returns string
 */
function separate(Number, split_with_char = ",") 
{
    Number+= '';
    Number= Number.replace(split_with_char, '');
    x = Number.split('.');
    y = x[0];
    z = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
        y = y.replace(rgx, '$1' + split_with_char + '$2');
    return y + z;
}

/**
 * Check Json format 
 * @param {string} str 
 * @returns bool > true/false
 */
function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Set Cookie
 * @param {string} cname 
 * @param {string} cvalue 
 * @param {number} exdays 
 */
function set_cookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get cookie value by cookie name
 * @param {string} cname 
 * @returns {string}  cookie name
 */
function get_cookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
* delete all cookies
* run this func after confirm
*/
async function delete_all_cookies() {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

/**
 * Check object in array
 * @param {array} array
 * @param object
 */
function in_array(array, object) {
    if (array.indexOf(object) >= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * Sort array 
 * @param {array} array 
 * @param {string} sort_type DESC / ASC
 */
function sort_array(array, sort_type="DESC") {
    if (sort_type.toLocaleUpperCase() == "DESC") {
        return array.sort(function(a, b){return a - b});
    } else if (sort_type.toLocaleUpperCase() == "ASC") {
        return array.sort(function(a, b){return b - a});
    }
}


function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// block some characters in number boxs
// $("input[type=number]").on("keypress", function () {
//     return event.keyCode === 8 ? true : !isNaN(Number(event.key));
// });

