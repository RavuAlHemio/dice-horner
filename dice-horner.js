var DiceHorner;
(function (DiceHorner) {
    function getElement(id) {
        return document.getElementById(id);
    }
    function getInput(id) {
        return getElement(id);
    }
    function getSpan(id) {
        return getElement(id);
    }
    function updateThrowMaxVal() {
        var minValue = +getInput("die-min").value;
        var maxValue = +getInput("die-max").value;
        if (maxValue <= minValue) {
            getSpan("die-throw-max-val").textContent = "? (max value must be greater than min value)";
            return;
        }
        var valDiff = maxValue - minValue;
        var base = valDiff + 1;
        var throwCount = +getInput("die-throw-count").value;
        var throwMax = 0;
        for (var i = 0; i < throwCount; ++i) {
            throwMax *= base;
            throwMax += valDiff;
        }
        getSpan("die-throw-max-val").textContent = "" + throwMax;
    }
    function updateFinalResult() {
        var minValue = +getInput("die-min").value;
        var maxValue = +getInput("die-max").value;
        if (maxValue <= minValue) {
            getSpan("die-final-result").textContent = "unknown (max value must be greater than min value)";
            return;
        }
        var valDiff = maxValue - minValue;
        var base = valDiff + 1;
        var throws = [];
        var throwString = getInput("die-throw-results").value;
        if (throwString.length === 0) {
            getSpan("die-final-result").textContent = "to be determined";
            return;
        }
        var throwStrings = throwString.trim().split(/\s+/);
        for (var _i = 0, throwStrings_1 = throwStrings; _i < throwStrings_1.length; _i++) {
            var ts = throwStrings_1[_i];
            var t = +ts;
            if (t < minValue || t > maxValue) {
                getSpan("die-final-result").textContent = "unknown (" + t + " is not a valid throw for this die)";
                return;
            }
            var relativeThrow = (+ts) - minValue;
            throws.push(relativeThrow);
        }
        var finalVal = 0;
        for (var _a = 0, throws_1 = throws; _a < throws_1.length; _a++) {
            var throwVal = throws_1[_a];
            finalVal *= base;
            finalVal += throwVal;
        }
        getSpan("die-final-result").textContent = "" + finalVal;
    }
    function dieMinMaxChanged() {
        updateThrowMaxVal();
        updateFinalResult();
    }
    function dieThrowCountChanged() {
        updateThrowMaxVal();
    }
    function dieThrowResultsChanged() {
        updateFinalResult();
    }
    function docLoaded() {
        getInput("die-min").addEventListener("change", dieMinMaxChanged);
        getInput("die-max").addEventListener("change", dieMinMaxChanged);
        getInput("die-throw-count").addEventListener("change", dieThrowCountChanged);
        getInput("die-throw-results").addEventListener("change", dieThrowResultsChanged);
        updateThrowMaxVal();
        updateFinalResult();
    }
    function init() {
        document.addEventListener("DOMContentLoaded", docLoaded);
    }
    DiceHorner.init = init;
})(DiceHorner || (DiceHorner = {}));
