const puzzleboard = document.querySelector('#puzzle');
const solveButton = document.getElementById('solve-button');
const submission = [];

const squares = 81;

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', 1);
    inputElement.setAttribute('max', 9);
    inputElement.setAttribute('oninput', 'validateInput(this)');
    inputElement.setAttribute('name', 'inputdata');
    puzzleboard.appendChild(inputElement);
}

function validateInput(inputElement) {
    const inputValue = inputElement.value;
    if (/^[1-9]$/.test(inputValue)) {
    } else {
        inputElement.value = '';
    }
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input');
    submission.length = 0;
    inputs.forEach((input,index) => {
        if (input.value !== "") {
            submission[index] = parseInt(input.value, 10);
        } else {
            submission[index] = 0;
        }
    });
}

const populateValues = (response) => {
        const inputs = document.querySelectorAll('input');
        console.log(response);
        inputs.forEach((input,i) => {
            input.value = response[i];
        });
}

async function solve() {
    joinValues();
    const data = submission
    console.log(data);

    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7138c6501bmsh694344ae06f7280p1095afjsn3e985893e328',
            'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
        },
        data: {
            input: data
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        populateValues(response.data.answer);
    } catch (error) {
        console.error(error);
    }
}

solveButton.addEventListener('click', solve);
