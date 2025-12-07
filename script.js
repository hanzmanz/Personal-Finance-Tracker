const budget = document.getElementById('budget');
const remainingBudget = document.getElementById('remaining-budget');

const expense = document.getElementById('expense-name');
const amount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');


function setBudget() {
    const userBudget = prompt("Enter your monthly budget:");
    if (userBudget !== null && userBudget.trim() !== '' && !isNaN(userBudget)) {
        budget.textContent = "Monthly Budget: $" + parseFloat(userBudget).toFixed(2);
        remainingBudget.textContent = "Remaining Budget: $" + parseFloat(userBudget).toFixed(2); // Initialize remaining budget
        localStorage.setItem('monthlyBudget', parseFloat(userBudget).toFixed(2)); // Store budget in local storage
    } else {
        alert("Please enter a valid number for the budget.");
        setBudget();
    }
}



function addExpense() {
    const expenseName = expense.value.trim();
    const expenseAmount = parseFloat(amount.value).toFixed(2);

    // Check if name or amount is blank => send alert if yes and end function
    if (expenseName === '' || expenseAmount === '') {
        alert('Please fill in both fields.');
        return;
    }

    // Get existing expenses from localStorage OR start with an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Generate a unique ID for the expense
    const expenseId = Date.now() + "-" + Math.random();
   
    // Add the new expense to the array
    expenses.push(
        {
            id: expenseId,
            name: expenseName,
            amount: expenseAmount
        }
    );

    // Save the updated array in localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    const expenseItem = document.createElement("div"); // create a new div container for the expense
    expenseItem.classList.add("expense") // add a class for styling
    expenseItem.dataset.id = expenseId; // set a data attribute for the expense ID 

    // create a span for the expense text (name and amount)
    const expenseText = document.createElement("span"); 
    expenseText.textContent = `${expenseName}: $${expenseAmount}`; 
    expenseText.classList.add("expense-text");

    // create edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "🔨";
    editBtn.classList.add("edit-btn");

    // create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    // append everything to the container in order (edit and delete in front for uniformity)
    expenseItem.appendChild(editBtn);
    expenseItem.appendChild(deleteBtn);
    expenseItem.appendChild(expenseText);

    expenseList.appendChild(expenseItem); // add the expense item to the expense list
    expense.value = ""; // clear the input field
    amount.value = ""; // clear the amount field

    // Update remaining budget
    const currentRemaining = parseFloat(remainingBudget.textContent.split('$')[1]);
    const newRemaining = currentRemaining - expenseAmount;
    remainingBudget.textContent = "Remaining Budget: $" + newRemaining.toFixed(2);
}

// Initialize budget on page load
if (localStorage.getItem('monthlyBudget') === null || localStorage .getItem('monthlyBudget') === undefined) {
setBudget();
} else {
    const storedBudget = localStorage.getItem('monthlyBudget');
    budget.textContent = "Monthly Budget: $" + parseFloat(storedBudget).toFixed(2);
    remainingBudget.textContent = "Remaining Budget: $" + parseFloat(storedBudget).toFixed(2);
}
