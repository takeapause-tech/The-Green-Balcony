// Curated list of mindfulness, nature, and present-moment reflections
const mindfulQuotes = [
  { text: "Nature does not hurry, yet everything is accomplished.", author: "— Lao Tzu" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "— Albert Einstein" },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "— Thich Nhat Hanh" },
  { text: "Adopt the pace of nature: her secret is patience.", author: "— Ralph Waldo Emerson" },
  { text: "Be here now. Be into some place else later. Is that so difficult?", author: "— Ram Dass" },
  { text: "To walk in nature is to witness a thousand miracles.", author: "— Mary Davis" }
];

// Global virtual array tracking current cart contents
let customerCart = [];

// Automatic, Date-Based Quote Engine
function displayDailyQuote() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const quoteIndex = dayOfYear % mindfulQuotes.length;
  const todaysQuote = mindfulQuotes[quoteIndex];
  
  document.getElementById("daily-quote").textContent = `"${todaysQuote.text}"`;
  document.getElementById("quote-author").textContent = todaysQuote.author;
}

// Master Interaction Loop Function
function setupMenuInteractions() {
  const menuButtons = document.querySelectorAll('.add-to-cart-btn');
  const summaryBar = document.getElementById('cart-summary-bar');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');

  // Modal Dom Objects
  const reviewModal = document.getElementById('review-modal');
  const checkoutBtn = document.getElementById('checkout-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const receiptListEl = document.getElementById('modal-receipt-list');
  const modalGrandTotalEl = document.getElementById('modal-grand-total');
  const placeOrderBtn = document.getElementById('place-order-btn');

  // Handle Item Selections
  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      const menuCard = button.closest('.menu-card');
      const itemName = menuCard.querySelector('h3').textContent;
      const itemPrice = parseInt(menuCard.querySelector('.price').textContent.replace(/[^0-9]/g, ''));

      button.classList.toggle('selected');

      if (button.classList.contains('selected')) {
        button.textContent = 'Added ✓';
        customerCart.push({ name: itemName, price: itemPrice });
      } else {
        button.textContent = 'Add to Cart';
        customerCart = customerCart.filter(item => item.name !== itemName);
      }

      updateCartSummary(summaryBar, cartCountEl, cartTotalEl);
    });
  });

  // Open Modal & Generate Receipt Output
  checkoutBtn.addEventListener('click', () => {
    receiptListEl.innerHTML = '';
    
    customerCart.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'receipt-item';
      itemRow.innerHTML = `<span>${item.name}</span><span>₹${item.price}</span>`;
      receiptListEl.appendChild(itemRow);
    });

    const grandTotal = customerCart.reduce((sum, item) => sum + item.price, 0);
    modalGrandTotalEl.textContent = `₹${grandTotal}`;
    reviewModal.className = 'modal-visible';
  });

  // Close Modal View Layout
  closeModalBtn.addEventListener('click', () => {
    reviewModal.className = 'modal-hidden';
  });

  // Process Mock Payment Loop
  placeOrderBtn.addEventListener('click', () => {
    alert('✨ Order Placed Successfully! Your items are printing in the kitchen. Sit tight, we will text you when it’s ready.');
    
    customerCart = [];
    menuButtons.forEach(button => {
      button.classList.remove('selected');
      button.textContent = 'Add to Cart';
    });

    reviewModal.className = 'modal-hidden';
    summaryBar.className = 'cart-summary-hidden';
  });
}

// Global Dynamic Count and Drawer Monitor Update
function updateCartSummary(bar, countEl, totalEl) {
  const totalItems = customerCart.length;
  
  if (totalItems > 0) {
    const totalPrice = customerCart.reduce((sum, item) => sum + item.price, 0);
    countEl.textContent = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`;
    totalEl.textContent = `₹${totalPrice}`;
    bar.className = 'cart-summary-visible';
  } else {
    bar.className = 'cart-summary-hidden';
  }
}

// Master Synchronization Engine Start on Load completion
document.addEventListener("DOMContentLoaded", () => {
  displayDailyQuote();
  setupMenuInteractions();
});


