// Product data
const products = [
    {
        id: 1,
        name: "Classic Black Tee",
        category: "Men",
        price: 19.99,
        image: "classic.avif",
        rating: 4.8,
        badge: "Bestseller",
        description: "Premium cotton classic fit t-shirt in sleek black",
        inStock: true
    },
    {
        id: 2,
        name: "White Essential Tee",
        category: "Men",
        price: 17.99,
        image: "white.avif",
        rating: 4.5,
        description: "Soft-touch white t-shirt with relaxed fit",
        inStock: true
    },
    {
        id: 3,
        name: "V-Neck Gray Tee",
        category: "Women",
        price: 22.99,
        image: "vneck.webp",
        rating: 4.7,
        badge: "New",
        description: "Stylish v-neck design in heather gray",
        inStock: true
    },
    {
        id: 4,
        name: "Vintage Logo Tee",
        category: "Men",
        price: 24.99,
        image: "vintage.avif",
        rating: 4.3,
        description: "Retro design with vintage-inspired graphic",
        inStock: true
    },
    {
        id: 5,
        name: "Slim Fit Navy Tee",
        category: "Men",
        price: 21.99,
        image: "slim.avif",
        rating: 4.6,
        description: "Navy blue t-shirt with tailored slim fit",
        inStock: true
    },
    {
        id: 6,
        name: "Floral Print Tee",
        category: "Women",
        price: 27.99,
        image: "floral.jpeg",
        rating: 4.9,
        badge: "Top Rated",
        description: "Elegant floral pattern on soft fabric",
        inStock: true
    },
    {
        id: 7,
        name: "Kids dye tie Tee",
        category: "Kids",
        price: 15.99,
        image: "dyekids.jpg",
        rating: 4.7,
        description: "Colorful design perfect for active kids",
        inStock: true
    },
    {
        id: 8,
        name: "Striped Premium Tee",
        category: "Women",
        price: 25.99,
        image: "striped.webp",
        rating: 4.6,
        description: "Classic striped pattern with premium fabric",
        inStock: true
    },
    {
        id: 9,
        name: "Sunrise Misty Mountains T-Shirts",
        category: "Kids",
        price: 18.99,
        image: "kidsm.jpg",
        rating: 4.8,
        badge: "Sale",
        description: "Experience tranquility with our (Sunrise Misty Mountains T-Shirt), featuring a serene mountain sunrise graphic.",
        inStock: true
    },
    {
        id: 10,
        name: "Tropical Vibes Alaska T-Shirt",
        category: "Kids",
        price: 18.99,
        image: "kidsf.jpg",
        rating: 4.8,
        badge: "Sale",
        description: "Embrace a unique blend of Alaskan wilderness and tropical flair with our (Tropical Vibes Alaska) full-print women's t-shirt. Perfect for those who love combining adventure with island charm!",
        inStock: true
    }
];

// Global array to store shopping cart
let cart = [];

// DOM elements
const productsGrid = document.getElementById("products-grid");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const cancelBtn = document.getElementById("cancel-btn");
const exitBtn = document.getElementById("exit-btn");

// Load products when page loads
document.addEventListener("DOMContentLoaded", function() {
    displayProducts();
    setupEventListeners();
});

// Display products in the grid
function displayProducts() {
    productsGrid.innerHTML = "";
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    let badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${badgeHTML}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-category">${product.category}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating}</span>
                </div>
                <div class="cart-btn" data-id="${product.id}">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    productsGrid.addEventListener("click", function(e) {
        const cartBtn = e.target.closest(".cart-btn");
        if (cartBtn) {
            const productId = Number(cartBtn.getAttribute("data-id"));
            addToCart(productId);
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener("click", function() {
        if (cart.length > 0) {
            // Store cart data for invoice page
            localStorage.setItem("cartItems", JSON.stringify(cart));
            window.location.href = "invoice.html";
        } else {
            alert("Your cart is empty. Add some items first!");
        }
    });
    
    // Cancel button
    cancelBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to cancel your shopping?")) {
            cart = [];
            updateCartCount();
            alert("Your cart has been cleared.");
        }
    });
    
    // Exit button
    exitBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to exit the shop?")) {
            window.location.href = "index.html";
        }
    });
    
    // Filter options
    const filterOptions = document.querySelectorAll(".filter-option");
    filterOptions.forEach(option => {
        option.addEventListener("click", function() {
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove("active"));
            
            // Add active class to clicked option
            this.classList.add("active");
            
            // Filter products
            const filter = this.textContent;
            filterProducts(filter);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector(".search-container input");
    searchInput.addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase().trim();
        searchProducts(searchTerm);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            // Increase quantity
            existingItem.quantity += 1;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        showMessage(`Added ${product.name} to cart!`);
    }
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Filter products
function filterProducts(filter) {
    if (filter === "All") {
        displayProducts();
    } else if (filter === "Sale") {
        const saleProducts = products.filter(product => product.badge === "Sale");
        displayFilteredProducts(saleProducts);
    } else if (filter === "New Arrivals") {
        const newProducts = products.filter(product => product.badge === "New");
        displayFilteredProducts(newProducts);
    } else {
        // Filter by category
        const categoryProducts = products.filter(product => product.category === filter);
        displayFilteredProducts(categoryProducts);
    }
}

// Display filtered products
function displayFilteredProducts(filteredProducts) {
    productsGrid.innerHTML = "";
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = "<p class='no-products'>No products found.</p>";
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }
}

// Search products
function searchProducts(searchTerm) {
    if (searchTerm === "") {
        displayProducts();
    } else {
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        displayFilteredProducts(searchResults);
    }
}

// Show message popup
function showMessage(message) {
    const messageEl = document.createElement("div");
    messageEl.className = "message-popup";
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    // Add styles
    messageEl.style.position = "fixed";
    messageEl.style.bottom = "20px";
    messageEl.style.right = "20px";
    messageEl.style.backgroundColor = "var(--success-color)";
    messageEl.style.color = "white";
    messageEl.style.padding = "10px 20px";
    messageEl.style.borderRadius = "4px";
    messageEl.style.boxShadow = "0 3px 6px rgba(0,0,0,0.2)";
    messageEl.style.zIndex = "9999";
    messageEl.style.transition = "opacity 0.3s ease-in-out";
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}
