// DOM elements
const invoiceId = document.getElementById("invoice-id");
const invoiceDate = document.getElementById("invoice-date");
const invoiceItemsBody = document.getElementById("invoice-items-body");
const invoiceTotals = document.getElementById("invoice-totals");
const cancelBtn = document.getElementById("cancel-btn");
const exitBtn = document.getElementById("exit-btn");
const printBtn = document.getElementById("print-btn");

// Tax rate and discount
const TAX_RATE = 0.15; // 15% tax
const DISCOUNT_THRESHOLD = 100; // Orders over $100 get a discount
const DISCOUNT_RATE = 0.10; // 10% discount

// Load invoice when page loads
document.addEventListener("DOMContentLoaded", function() {
// Get customer and cart items from localStorage
const customer = JSON.parse(localStorage.getItem("customer")) || {};
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log("Retrieved customer details:", customer); // Add this line to verify

    // Generate random invoice number
    const invoiceNumber = generateInvoiceNumber();
    invoiceId.textContent = `Invoice #${invoiceNumber}`;
    
    // Set current date
    const currentDate = new Date();
    invoiceDate.textContent = `Date: ${formatDate(currentDate)}`;
    
    // Display customer information
    displayCustomerInfo(customer);

    // Display invoice items
    displayInvoiceItems(cartItems);
    
    // Calculate and display totals
    calculateTotals(cartItems);
    
    // Setup event listeners
    setupEventListeners();
});

// Generate a random invoice number
function generateInvoiceNumber() {
    const prefix = "INV-2025-";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
}

// Format date as MM/DD/YYYY
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Display customer information
function displayCustomerInfo(customer) {
    const customerInfoBlock = document.querySelector(".invoice-addresses .address-block:nth-child(2)");
    customerInfoBlock.innerHTML = `
        <h3>To:</h3>
        <p>${customer.name || "Customer Name"}</p>
        <p>${customer.address || "Address"}</p>
        <p>${customer.email || "Email"}</p>
        <p>${customer.phone || "Phone"}</p>
    `;
}

// Display invoice items
function displayInvoiceItems(items) {
    invoiceItemsBody.innerHTML = "";
    
    if (items.length === 0) {
        invoiceItemsBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">No items in cart</td>
            </tr>
        `;
        return;
    }
    
    items.forEach(item => {
        const row = document.createElement("tr");
        const itemTotal = item.price * item.quantity;
        
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="item-image"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        
        invoiceItemsBody.appendChild(row);
    });
}

// Calculate and display totals
function calculateTotals(items) {
    // Calculate subtotal
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate discount if applicable
    let discount = 0;
    if (subtotal >= DISCOUNT_THRESHOLD) {
        discount = subtotal * DISCOUNT_RATE;
    }
    
    // Calculate tax
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * TAX_RATE;
    
    // Calculate total
    const total = taxableAmount + tax;
    
    // Display totals
    invoiceTotals.innerHTML = `
        <div class="total-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        ${discount > 0 ? `
            <div class="total-row">
                <span>Discount (10%):</span>
                <span>-$${discount.toFixed(2)}</span>
            </div>
        ` : ''}
        <div class="total-row">
            <span>Tax (15%):</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="total-row final">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
    
    // Store calculated values for potential use
    window.invoiceData = {
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        total: total
    };
}

// Setup event listeners
function setupEventListeners() {
    // Cancel button
    cancelBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to cancel this invoice?")) {
            localStorage.removeItem("cartItems");
            window.location.href = "products.html";
        }
    });
    
    // Exit button
    exitBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to exit without completing your purchase?")) {
            localStorage.removeItem("cartItems");
            window.location.href = "index.html";
        }
    });
    
    // Print button
    printBtn.addEventListener("click", function() {
        window.print();
    });
}

