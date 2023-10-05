// obtener elementos del DOM //
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutButton = document.querySelector('.checkout');

// iniciar el carrito como un array vacío //
const cart = [];

// función para agregar un producto al carrito //
function addToCart(name, price, imageSrc) {
  cart.push({ name, price, imageSrc });
  updateCartDisplay();
}

// función para actualizar la visualización del carrito //
function updateCartDisplay() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('div');
    listItem.innerHTML = `
            <div class="cart-product-card">
                <img src="${item.imageSrc}" alt="${item.name}">
                <div class="cart-product-info">
                    <h2>${item.name}</h2>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    cartItems.appendChild(listItem);
    total += item.price;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Agregar evento click a los botones Agregar al carrito //
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.parentElement;
    const productName = productCard.querySelector('h2').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.slice(1));
    const productImageSrc = productCard.querySelector('img').getAttribute('src');
    addToCart(productName, productPrice, productImageSrc);
  });
});

// Agregar evento click al botón Finalizar Compra //
checkoutButton.addEventListener('click', () => {
  if (cart.length > 0) {
    alert('Compra finalizada. Gracias por su compra!');
    cart.length = 0; // Limpiar el carrito después de la compra
    updateCartDisplay();
  } else {
    alert('El carrito está vacío. Agregue productos antes de finalizar la compra.');
  }
});
