//const { values } = require("lodash");

// sets or overwrites an value in local storage
function setSessionItem(label, value) {
    localStorage.setItem(label, value);
}

// retreives an value from localStorage by label
// returns null if not existent
function getSessionItem(label) {
    return localStorage.getItem(label);
}

// checks, if an item exists in local storage
function existsSessionItem(label) {
    return !isNullOrUndefined(getSessionItem(label));
}

// checks, if an value exists in local storage
function valueExistsSessionItem(label, value) {
    values = localStorage.getItem(label);
    if (values.length > 0) {
        array = values.split(',')
    
        if (array.includes(value)) {
            return true;
        }else {
            return false;
        }
    }else {
        return false;
    }  
}

// sets or overwrites an json object as value to local storage
function setJSONSessionItem(label, jsonValue) {
    setSessionItem(label, JSON.stringify(jsonValue));
}

// retreives an json object from local storage
// if not existent returns null
// if json string converts to json object
function getJSONSessionItem(label) {
    var val = getSessionItem(label);

    // if undefined (not existent), return undefined
    if (isNullOrUndefined(val)) 
        return val;

    // if json string, convert and return as json object
    if (isJSONString(val)) 
        return tryParseJSONString(val);

    // otherwise return as string
    return val;
}

// removes a session item by label
function removeSessionItem(label) {
    localStorage.removeItem(label);
}

// clears complete session / deletes all session items
function clearSession() {
    localStorage.clear();
}

// try parse JSON string
// returns false if no json string otherwise the JSON object
function tryParseJSONString(str) {
    try {
        var obj = JSON.parse(str);
        if (obj && typeof obj === "object") 
            return obj;
    } catch (e) { }
    return false;
}

// check if given string is a json string
function isJSONString(str) {
    return tryParseJSONString(str) != false;
}

// function checks if given value is null or undefined
function isNullOrUndefined(val) {
    return val === null || val === undefined;
}

//Anzeige Warenkorb laden
function loadWarenkorb() {
    let laenge = getSessionItem("id").split(',').length;
    $("#anzahl_bestellungen").text(laenge);
}