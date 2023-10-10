fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const productos = data;

    // Obtener elementos del DOM //
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutButton = document.querySelector('.checkout');
    const clearCartButton = document.querySelector('.clear-cart');
    const messageContainer = document.getElementById('message-container');


    // Inicializar el carrito como un array vacío //
    let cart = [];

    // Funcion para guardar el carrito en local storage //
    function updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart = JSON.parse(storedCart);
      updateCartDisplay();
    }

    // Función para agregar un producto al carrito //
    function addToCart(product) {
      cart.push(product);
      updateCartDisplay();
      updateLocalStorage();
    }

    // Función para actualizar la visualización del carrito //
    function updateCartDisplay() {
      cartItems.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <div class="cart-product-card">
                    <img src="${item.imagenSrc}" alt="${item.nombre}">
                    <div class="cart-product-info">
                        <h2>${item.nombre}</h2>
                        <p class="price">$${item.precio.toFixed(2)}</p>
                    </div>
                </div>
            `;
        listItem.classList.add('cart-item');
        cartItems.appendChild(listItem);
        total += item.precio;
      });

      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Agregar evento click al boton agregar al carrito //
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const product = productos[index];
        addToCart(product);
      });
    });

    // Agregar evento click al boton finalizar compra //
    checkoutButton.addEventListener('click', () => {
      if (cart.length > 0) {
        showMessage('Compra finalizada. Gracias por su compra.');
        cart.length = 0;
        updateCartDisplay();
        updateLocalStorage();
      } else {
        showMessage('El carrito está vacío. Agregue productos antes de finalizar la compra.', true);
      }
    });
    // Agregar un controlador de eventos al botón vaciar carrito //
    clearCartButton.addEventListener('click', () => {
      cart = [];
      updateCartDisplay();
      updateLocalStorage();
    });

    function showMessage(message, isError = false) {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.classList.add(isError ? 'error-message' : 'success-message');
      messageContainer.appendChild(messageDiv);
    }
  });
