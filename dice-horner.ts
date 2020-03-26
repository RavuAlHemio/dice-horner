module DiceHorner {
    function getElement<T extends HTMLElement>(id: string): T|null {
        return <T|null>document.getElementById(id);
    }

    function getInput(id: string): HTMLInputElement|null {
        return getElement<HTMLInputElement>(id);
    }

    function getSpan(id: string): HTMLSpanElement|null {
        return getElement<HTMLSpanElement>(id);
    }

    function updateThrowMaxVal(): void {
        let minValue: number = +getInput("die-min").value;
        let maxValue: number = +getInput("die-max").value;
        if (maxValue <= minValue) {
            getSpan("die-throw-max-val").textContent = "? (max value must be greater than min value)";
            return;
        }

        let valDiff: number = maxValue - minValue;
        let base: number = valDiff + 1;
        let throwCount: number = +getInput("die-throw-count").value;

        let throwMax: number = 0;
        for (let i: number = 0; i < throwCount; ++i) {
            throwMax *= base;
            throwMax += valDiff;
        }

        getSpan("die-throw-max-val").textContent = `${throwMax}`;
    }

    function updateFinalResult(): void {
        let minValue: number = +getInput("die-min").value;
        let maxValue: number = +getInput("die-max").value;
        if (maxValue <= minValue) {
            getSpan("die-final-result").textContent = "unknown (max value must be greater than min value)";
            return;
        }

        let valDiff: number = maxValue - minValue;
        let base: number = valDiff + 1;

        let throws: number[] = [];
        let throwString: string = getInput("die-throw-results").value;
        if (throwString.length === 0) {
            getSpan("die-final-result").textContent = "to be determined";
            return;
        }
        let throwStrings: string[] = throwString.trim().split(/\s+/);
        for (let ts of throwStrings) {
            let t: number = +ts;
            if (t < minValue || t > maxValue) {
                getSpan("die-final-result").textContent = `unknown (${t} is not a valid throw for this die)`;
                return;
            }

            let relativeThrow: number = (+ts) - minValue;
            throws.push(relativeThrow);
        }

        let finalVal: number = 0;
        for (let throwVal of throws) {
            finalVal *= base;
            finalVal += throwVal;
        }

        getSpan("die-final-result").textContent = `${finalVal}`;
    }

    function dieMinMaxChanged(): void {
        updateThrowMaxVal();
        updateFinalResult();
    }

    function dieThrowCountChanged(): void {
        updateThrowMaxVal();
    }

    function dieThrowResultsChanged(): void {
        updateFinalResult();
    }

    function docLoaded(): void {
        getInput("die-min").addEventListener("change", dieMinMaxChanged);
        getInput("die-max").addEventListener("change", dieMinMaxChanged);
        getInput("die-throw-count").addEventListener("change", dieThrowCountChanged);
        getInput("die-throw-results").addEventListener("change", dieThrowResultsChanged);

        updateThrowMaxVal();
        updateFinalResult();
    }

    export function init(): void {
        document.addEventListener("DOMContentLoaded", docLoaded);
    }
}
