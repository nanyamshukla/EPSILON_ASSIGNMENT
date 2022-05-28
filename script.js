const part1 = document.getElementById('part-1');
const part2 = document.getElementById('part-2');
const part3 = document.getElementById('part-3');

const nameAscending = document.getElementById('name-ascending');
const nameDescending = document.getElementById('name-descending');
const priceAscending = document.getElementById('price-ascending');
const priceDescending = document.getElementById('price-descending');
const categoryAscending = document.getElementById('category-ascending');
const categoryDescending = document.getElementById('category-descending');

let apiData = []

// Show selected assignment
function showSelectedAssignment(e) {
    const assignmentType = e.target.value;
    const sections = document.getElementsByTagName('section');
    for(let section of sections) {
        section.style.display = 'none';
    }
    document.getElementById(assignmentType).style.display = 'block';
}

// Fetch table data for Assignment-3, update table html and then display assignment
function fetchTableDataAndShow(e) {
    fetch('https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        apiData = data.cookies;
        updateTable();
        updateSortIcons('reset');
        showSelectedAssignment(e);
    })
    .catch(err => {
        const tBody = document.getElementById('tbody');
        tBody.innerHTML = `
            <td colspan=3>Oops! Couldn't fetch it at the moment. Please try again later.</td>
        `;
    });
}

// Update table html with the updated apiData
function updateTable() {
    const tBody = document.getElementById('tbody');
    tBody.innerHTML = '';

        for(let val of apiData) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.category}</td>
            `;
    
            tBody.appendChild(tr);
        }
}

// Updating sort icons 
function updateSortIcons(key, type) {
    const icons = document.getElementsByTagName('i');
    for(icon of icons) {
        icon.classList.remove('icon-clicked');
        icon.style.display='block';
    };

    if(key==='reset') {
        return;
    }

    const clickedIcon = document.getElementById(key+'-'+type);
    clickedIcon.classList.add('icon-clicked');

    let hideIcon
    if(type==='ascending') 
        hideIcon = document.getElementById(key+'-descending');
    else
        hideIcon = document.getElementById(key+'-ascending');
    hideIcon.style.display = 'none';
}


// Handling sort requests
function sortTableAndDisplay(key, type) {
    if(apiData.length>0) {
        if(type==='ascending') {
            apiData.sort((a,b) => a[key]<b[key] ? -1 : 1);
        } else {
            apiData.sort((a,b) => a[key]<b[key] ? 1 : -1);
        }
    
        updateSortIcons(key, type);
        updateTable();
    }
}


// EVENT LISTENERS

// To show desired assignment
part1.addEventListener('click', showSelectedAssignment)
part2.addEventListener('click', showSelectedAssignment)
part3.addEventListener('click', fetchTableDataAndShow)


// To Sort required field in desired manner in Assignment-3
nameAscending.addEventListener('click', () => sortTableAndDisplay('name', 'ascending'));
nameDescending.addEventListener('click', () => sortTableAndDisplay('name', 'descending'));
priceAscending.addEventListener('click', () => sortTableAndDisplay('price', 'ascending'));
priceDescending.addEventListener('click', () => sortTableAndDisplay('price', 'descending'));
categoryAscending.addEventListener('click', () => sortTableAndDisplay('category', 'ascending'));
categoryDescending.addEventListener('click', () => sortTableAndDisplay('category', 'descending'));



// Initializer function
function init() {
    document.getElementById('assignment-1').style.display = 'block';
}

init();