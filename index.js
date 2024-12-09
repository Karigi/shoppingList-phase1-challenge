// Load list from local storage on page load
document.addEventListener("DOMContentLoaded", loadList);

// Get references to input, list, and buttons
const itemInput = document.getElementById("enterItems");
const shoppingList = document.getElementById("shoppingList");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearListButton");

// Initialize the list from localStorage
let items = JSON.parse(localStorage.getItem("shoppingList")) || []

// Add button event listener
addButton.addEventListener("click", () => {
    const itemName = itemInput.value.trim(); // Get trimmed input value
    if (itemName) {
        const item = { name: itemName, purchased: false }; // Create new item
        items.push(item);  // Add item to the list
        saveAndRenderList();  // Save and display updated list
        itemInput.value = "";  // Clear input field
    }
});

// Handle list actions (mark as purchased or edit)
shoppingList.addEventListener("click", (list) => {
    // Handle mark/unmark action
    if (list.target.classList.contains("mark-btn")) {
        const index = list.target.dataset.index;  // Get item index
        items[index].purchased = !items[index].purchased;  // Toggle purchased state
        saveAndRenderList();  // Save and update list
    }
    // Handle edit action
    else if (list.target.classList.contains("edit-btn")) {
        editItem(list.target.dataset.index);  // Call edit function
    }
});

// Clear list button event listener
clearButton.addEventListener("click", () => {
    items = [];  // Reset list
    saveAndRenderList();  // Save and update display
});

// Save list to local storage and render it
function saveAndRenderList() {
    localStorage.setItem("shoppingList", JSON.stringify(items));  // Save to storage
    renderList();  // Update list display
}

// Render the list in the HTML
function renderList() {
    shoppingList.innerHTML = "";  // Clear current list display

    // Loop through each item
    items.forEach((item, index) => {
        const li = document.createElement("li");  // Create list item element
        li.className = `list-item ${item.purchased ? "purchased" : ""}`;  // Add class if purchased

        // Set inner HTML for list item
        li.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="btn mark-btn" data-index="${index}">
                    <i class="fa fa-check"></i>
                    ${item.purchased ? "Unmark" : "Mark as Purchased"}
                </button>
                <button class="btn edit-btn" data-index="${index}">Edit</button>
            </div>
        `;
        shoppingList.appendChild(li);  // Add item to list container
    });
}

// Edit item function
function editItem(index) {
    const newName = prompt("Edit item:", items[index].name);  // Prompt for new name
    if (newName) {
        items[index].name = newName.trim();  // Update item name
        saveAndRenderList();  // Save and update list
    }
}

// Load list from local storage on page load
function loadList() {
    renderList();  // Display items from storage
}
