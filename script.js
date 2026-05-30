
let array = [];

function getSpeed() {
    return 310 - document.getElementById("speedSlider").value;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {

    array = [];

    const container = document.getElementById("array");

    container.innerHTML = "";

    let size = document.getElementById("sizeSlider").value;

    for (let i = 0; i < size; i++) {

        let value = Math.floor(Math.random() * 350) + 20;

        array.push(value);

        let bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value + "px";

        bar.style.width = `${Math.max(5, 800 / size)}px`;

        container.appendChild(bar);
    }
}

async function bubbleSort() {

    document.getElementById("info").innerText =
        "Bubble Sort | Time: O(n²) | Space: O(1)";

    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await sleep(getSpeed());

            if (array[j] > array[j + 1]) {

                [array[j], array[j + 1]] =
                    [array[j + 1], array[j]];

                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }

            bars[j].style.background = "cyan";
            bars[j + 1].style.background = "cyan";
        }
    }

    for (let bar of bars) {
        bar.style.background = "lime";
    }
}

async function selectionSort() {

    document.getElementById("info").innerText =
        "Selection Sort | Time: O(n²) | Space: O(1)";

    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {

        let min = i;

        for (let j = i + 1; j < array.length; j++) {

            bars[j].style.background = "red";

            await sleep(getSpeed());

            if (array[j] < array[min]) {
                min = j;
            }

            bars[j].style.background = "cyan";
        }

        [array[i], array[min]] =
            [array[min], array[i]];

        bars[i].style.height = array[i] + "px";
        bars[min].style.height = array[min] + "px";
    }

    for (let bar of bars) {
        bar.style.background = "lime";
    }
}

async function insertionSort() {

    document.getElementById("info").innerText =
        "Insertion Sort | Time: O(n²) | Space: O(1)";

    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {

        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {

            array[j + 1] = array[j];

            bars[j + 1].style.height =
                array[j + 1] + "px";

            j--;

            await sleep(getSpeed());
        }

        array[j + 1] = key;

        bars[j + 1].style.height = key + "px";
    }

    for (let bar of bars) {
        bar.style.background = "lime";
    }
}

document
    .getElementById("sizeSlider")
    .addEventListener("input", generateArray);

generateArray();

async function partition(low, high) {

    let bars = document.getElementsByClassName("bar");

    let pivot = array[high];

    let i = low - 1;

    bars[high].style.background = "yellow";

    for (let j = low; j < high; j++) {

        bars[j].style.background = "red";

        await sleep(getSpeed());

        if (array[j] < pivot) {

            i++;

            [array[i], array[j]] =
                [array[j], array[i]];

            bars[i].style.height = array[i] + "px";
            bars[j].style.height = array[j] + "px";
        }

        bars[j].style.background = "cyan";
    }

    [array[i + 1], array[high]] =
        [array[high], array[i + 1]];

    bars[i + 1].style.height =
        array[i + 1] + "px";

    bars[high].style.height =
        array[high] + "px";

    bars[high].style.background = "cyan";

    return i + 1;
}

async function quickSort(low = 0, high = array.length - 1) {

    document.getElementById("info").innerText =
        "Quick Sort | Time: O(n log n) | Space: O(log n)";

    if (low < high) {

        let pi = await partition(low, high);

        await quickSort(low, pi - 1);

        await quickSort(pi + 1, high);
    }

    if (low === 0 && high === array.length - 1) {

        let bars = document.getElementsByClassName("bar");

        for (let bar of bars) {
            bar.style.background = "lime";
        }
    }
}

async function merge(low, mid, high) {

    let bars = document.getElementsByClassName("bar");

    let left = array.slice(low, mid + 1);
    let right = array.slice(mid + 1, high + 1);

    let i = 0;
    let j = 0;
    let k = low;

    while (i < left.length && j < right.length) {

        bars[k].style.background = "red";

        await sleep(getSpeed());

        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }

        bars[k].style.height = array[k] + "px";
        bars[k].style.background = "cyan";

        k++;
    }

    while (i < left.length) {

        bars[k].style.background = "red";

        await sleep(getSpeed());

        array[k] = left[i];

        bars[k].style.height = array[k] + "px";
        bars[k].style.background = "cyan";

        i++;
        k++;
    }

    while (j < right.length) {

        bars[k].style.background = "red";

        await sleep(getSpeed());

        array[k] = right[j];

        bars[k].style.height = array[k] + "px";
        bars[k].style.background = "cyan";

        j++;
        k++;
    }
}

async function mergeSort(low, high) {

    if (low >= high) return;

    let mid = Math.floor((low + high) / 2);

    await mergeSort(low, mid);
    await mergeSort(mid + 1, high);

    await merge(low, mid, high);
}

async function startMergeSort() {

    document.getElementById("info").innerText =
        "Merge Sort | Time: O(n log n) | Space: O(n)";

    await mergeSort(0, array.length - 1);

    let bars = document.getElementsByClassName("bar");

    for (let bar of bars) {
        bar.style.background = "lime";
    }
}





