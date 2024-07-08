let itemForm = document.getElementById('item-form');
let itemInput = document.getElementById('item-input');
let itemList = document.getElementById('item-list');
let clearButton = document.getElementById('clear')
let itemFilter = document.getElementById('filter')
let formBtn = itemForm.querySelector('button')
let isEditMode = false

//Display items saved in the local storage
function displayItems() {
    let itemsFromStorage = getItemsFromStorage()

    itemsFromStorage.forEach(item => addItemToDOM(item))

    //Add check UI to see changes when page is reloaded
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value
    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return;
    }

    //Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    }
    else {
        if (checkIfItemExists(newItem)) {
            alert('That item already exists!')
            return;
        }
    }
    
    //Create item DOM element
    addItemToDOM(newItem)
    
    //Add item to localStorage
    addItemToStorage(newItem)

    

    checkUI()

    itemInput.value = ''; //To clear the search bar
}

function addItemToDOM(item) {
    //Create list item
       let li = document.createElement('li');
       li.appendChild(document.createTextNode(item))
   
       let button = createButton('remove-item btn-link text-red')
       li.appendChild(button)
       
       //Add li to the DOM
       itemList.appendChild(li)    
   }
   
   function addItemToStorage(item) {
       let itemsFromStorage = getItemsFromStorage();
   
       // Add new item to array
       itemsFromStorage.push(item);
   
       // Convert to JSON string and set to localStorage
       localStorage.setItem('items', JSON.stringify(itemsFromStorage));
   }
   
   function getItemsFromStorage() {
       let itemsFromStorage; // array of items from the localStorage
   
       // Check if 'items' is in localStorage and is not null
       if (localStorage.getItem('items') === null) {
           itemsFromStorage = [];
       } 
       else {
           itemsFromStorage = JSON.parse(localStorage.getItem('items')); 
       }
   
       return itemsFromStorage
   }

function removeItem(e) {
    //If click on the button with class name
    if (e.target.classList.contains('fa-xmark')) { //if (e.target.className === 'fa..... fa...')
        if (confirm('Are you sure you want to delete this item?')) {
        //Use closest to identify the parent 'li' element and remove it
        e.target.closest('li').remove(); // Or e.target.parentElement.parentElement.remove()
        }

        removeItemFromStorage(e.target.closest('li').textContent)
    }
    else {
        setItemToEdit(e.target.closest('li'))
    }
    //checkUI();

}

function checkIfItemExists(item) {
    let itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true; //Get into editmode

    //remove the edit mode for previous item when new item is clicked
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))

    //add edit mode to item when clicked
    item.classList.add('edit-mode')
    //Change the button form
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
}

//Remove item from local storage
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //Filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    //re-set local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearAll(e) {
    let listItems = document.querySelectorAll('li')
    listItems.forEach(item => {
        item.remove()
    })

    //Clear from local storage
    localStorage.clear()

    checkUI();
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
function filterItems(e) {
    let text = e.target.value.toLowerCase()
    let items = itemList.querySelectorAll('li')
    items.forEach(item => {
        let itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) !== -1)  { // see if the input is a substring of itemName
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    })

}

//Display of the clear button and the filter search
function checkUI(e) {
    //Clear item input bar
    itemInput.value = ''

    let items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none'
    }
    else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block'
    }

    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = '#333'

    isEditMode = false
    
}

//Initialize the ap
function init() {
    //Add event listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', removeItem)
    clearButton.addEventListener('click', clearAll)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI();
}

init()

// localStorage.clear()
