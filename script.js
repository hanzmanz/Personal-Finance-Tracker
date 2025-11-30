const budget = document.getElementById('budget');
const remainingBudget = document.getElementById('remaining-budget');

const expense = document.getElementById('expense-name');
const amount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');

function setBudget() {
    const userBudget = prompt("Enter your monthly budget:");
    if (userBudget !== null && userBudget.trim() !== '' && !isNaN(userBudget)) {
        budget.textContent = "Monthly Budget: $" + parseFloat(userBudget).toFixed(2);
        remainingBudget.textContent = "Remaining Budget: $" + parseFloat(userBudget).toFixed(2);
    } else {
        alert("Please enter a valid number for the budget.");
        setBudget();
    }
}



function addExpense() {
    const expenseName = expense.value.trim();
    const expenseAmount = parseFloat(amount.value).toFixed(2);

    if (expenseName === '' || expenseAmount === '') {
        alert('Please fill in both fields.');
        return;
    }
    const expenseItem = document.createElement("li"); // create a new list item
    expenseItem.textContent = expenseName + ": $" + expenseAmount; // set the text content
    expenseItem.classList.add("expense") // add a class for styling

    expenseItem.addEventListener("click", function() {
        expenseList.removeChild(expenseItem); // remove the item when clicked
    })

    expenseList.appendChild(expenseItem); // add the item to the list
    expense.value = ""; // clear the input field
    amount.value = ""; // clear the amount field

    // Update remaining budget
    const currentRemaining = parseFloat(remainingBudget.textContent.split('$')[1]);
    const newRemaining = currentRemaining - expenseAmount;
    remainingBudget.textContent = "Remaining Budget: $" + newRemaining.toFixed(2);
}
setBudget();

