// script.js

// --- CONFIGURATION ---
// The phone number guests should pay to via GPay/Paytm. 
// This is used for display purposes only.
const paymentNumberDisplay = "8209552156"; 

// The WhatsApp phone number that will receive the final order messages.
// This must be in full international format without the "+" sign.
// For example, if the number is in India, it should start with "91".
const orderWhatsAppNumber = "917710901717"; 


// --- GLOBAL VARIABLES ---
const cart = [];
let total = 0;


// --- FUNCTION DEFINITIONS ---

function addToCart(event) {
    const name = event.target.getAttribute('data-name');
    const price = parseInt(event.target.getAttribute('data-price'));

    cart.push({ name, price });
    updateCartUI();
    toggleCartSidebar(true); // Open the cart
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsList.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotalElement.textContent = `₹${total}`;
}

function toggleCartSidebar(show) {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (show) {
        cartSidebar.classList.remove('hidden');
    } else {
        cartSidebar.classList.add('hidden');
    }
}

function proceedToPayment() {
    const checkoutModal = document.getElementById('checkout-modal');
    const paymentTotalElement = document.getElementById('payment-total');
    
    // Ensure total is correct from last update
    total = cart.reduce((sum, item) => sum + item.price, 0);

    paymentTotalElement.textContent = `₹${total}`;
    
    toggleCartSidebar(false); // Close the cart
    checkoutModal.classList.remove('hidden'); // Open payment modal
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('hidden');
}

function handleFinalPlaceOrder() {
    // Generate the pre-formatted WhatsApp message link
    const whatsappLink = generateWhatsAppLink();
    
    // Redirect the guest to WhatsApp with the message
    window.location.href = whatsappLink;
}

function generateWhatsAppLink() {
    // Step 1: Create a well-formatted order details string
    let orderDetailsText = "*New Order for The Green Balcony*\n\n*Guest Details:*\n[Please provide Table # or Name]\n\n*Your Order:*";
    cart.forEach(item => {
        orderDetailsText += `\n- ${item.name} (₹${item.price})`;
    });
    
    // Recalculate total again to be super-safe
    const finalTotal = cart.reduce((sum, item) => sum + item.price, 0);

    orderDetailsText += `\n\n*Total to Pay:* ₹${finalTotal}`;
    orderDetailsText += `\n*Payment Made to:* ${paymentNumberDisplay}`;
    
    // Add the critical verification status note
    orderDetailsText += "\n\n*Status:* [PAYMENT CONFIRMED BY GUEST]";
    
    // Step 2: Encode the message for the URL
    const encodedMessage = encodeURIComponent(orderDetailsText);
    
    // Step 3: Build the final WhatsApp API link
    const link = `https://wa.me/${orderWhatsAppNumber}?text=${encodedMessage}`;
    
    return link;
}


// --- EVENT LISTENERS ---

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

document.getElementById('close-cart').addEventListener('click', () => toggleCartSidebar(false));
document.getElementById('checkout-btn').addEventListener('click', proceedToPayment);
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the add-to-cart class
    const buttons = document.querySelectorAll('.add-to-cart');

    // Loop through each button and add the interaction
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Toggle the 'selected' class
            button.classList.toggle('selected');
            
            // Optional: Provide visual feedback or sound trigger placeholder
            console.log("Button clicked and state toggled.");
        });
    });
});
document.getElementById('close-checkout').addEventListener('click', closeCheckoutModal);
document.getElementById('final-place-order-btn').addEventListener('click', handleFinalPlaceOrder);
// A curated array of mindfulness, nature, and present-moment quotes
const mindfulQuotes = [
  {
    text: "Nature does not hurry, yet everything is accomplished.",
    author: "— Lao Tzu"
  },
  {
    text: "Look deep into nature, and then you will understand everything better.",
    author: "— Albert Einstein"
  },
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "— Thich Nhat Hanh"
  },
  {
    text: "Adopt the pace of nature: her secret is patience.",
    author: "— Ralph Waldo Emerson"
  },
  {
    text: "Be here now. Be into some place else later. Is that so difficult?",
    author: "— Ram Dass"
  },
  {
    text: "To walk in nature is to witness a thousand miracles.",
    author: "— Mary Davis"
  },
  {
    text: "Life is available only in the present. That is why we should walk in such a way that every step brings us to the here and now.",
    author: "— Thich Nhat Hanh"
  }
];

function displayDailyQuote() {
  const now = new Date();
  
  // Calculate a reliable index based on the day of the year
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Use modulus to cycle through quotes evenly regardless of how many you add
  const quoteIndex = dayOfYear % mindfulQuotes.length;
  const todaysQuote = mindfulQuotes[quoteIndex];
  
  // Inject into the HTML elements safely
  document.getElementById("daily-quote").textContent = `"${todaysQuote.text}"`;
  document.getElementById("quote-author").textContent = todaysQuote.author;
}

// Run the script when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
  displayDailyQuote();
});
