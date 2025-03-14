document.getElementById("customize-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const shirtStyle = document.getElementById("shirt-style").value;
    const shirtColor = document.getElementById("shirt-color").value;
    const shirtText = document.getElementById("shirt-text").value;
    const shirtImageInput = document.getElementById("shirt-image");

    const fixedPrice = 250; // Fixed price for each custom T-shirt

    // Read the image file
    const reader = new FileReader();
    reader.onload = function(event) {
        const shirtImage = event.target.result;

        // Create customized shirt object
        const customizedShirt = {
            style: shirtStyle,
            color: shirtColor,
            text: shirtText,
            image: shirtImage,
            price: fixedPrice
        };

        // Store customized shirt in localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(customizedShirt);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Redirect to the invoice page
        window.location.href = "invoice.html";
    };

    // Read the image file as a data URL
    if (shirtImageInput.files.length > 0) {
        reader.readAsDataURL(shirtImageInput.files[0]);
    } else {
        // Handle case where no image is uploaded
        const customizedShirt = {
            style: shirtStyle,
            color: shirtColor,
            text: shirtText,
            image: null,
            price: fixedPrice
        };

        // Store customized shirt in localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(customizedShirt);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Redirect to the invoice page
        window.location.href = "invoice.html";
    }
});
