let itemForm = document.getElementById('item-form');
let itemInput = document.getElementById('item-input');
let itemList = document.getElementById('item-list');

function addItem(e) {
    e.preventDefault();
    let newItem = itemInput.value
    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return;
    }

    //Create list item
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem))

    let button = createButton('remove-item btn-link text-red')
    li.appendChild(button)
    itemList.appendChild(li)

    itemInput.value = '';
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes;
    let icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes) {
    let icon = document.createElement('i')
    icon.className = classes
    return icon
}

//Add event listeners
itemForm.addEventListener('submit', addItem)