const menuItems = {
    pizzas: [{
            id: 1,
            name: "Pepperoni",
            price: 42.99
        },
        {
            id: 2,
            name: "Queijo",
            price: 25.99
        },
        {
            id: 3,
            name: "Bacon",
            price: 37.99
        },
        {
            id: 4,
            name: "A moda da casa",
            price: 37.99
        },
        {
            id: 5,
            name: "Vegetariana",
            price: 35.99
        },
        {
            id: 6,
            name: "Marguerita",
            price: 33.99
        },
        {
            id: 7,
            name: "Calabresa",
            price: 25.99
        },
        {
            id: 8,
            name: "Frango",
            price: 40.99
        },
        {
            id: 9,
            name: "4-Queijos",
            price: 42.99
        }
    ],
    bebidas: [{
            id: 10,
            name: "Refrigerante Lata",
            price: 5.90
        },
        {
            id: 11,
            name: "Refrigerante 1.5L",
            price: 10.90
        },
        {
            id: 12,
            name: "Refrigerante 2 Litros",
            price: 15.90
        },
        {
            id: 13,
            name: "Suco em lata",
            price: 5.90
        },
        {
            id: 14,
            name: "Heineken",
            price: 10.90
        },
        {
            id: 15,
            name: "Agua",
            price: 4.00
        }
    ]
};

let cartItems = [];

// Chamar a função initCart ao carregar a página para inicializar o carrinho
window.addEventListener('load', function () {
    initCart();
    // Outras inicializações ou código que você precise executar ao carregar a página podem vir aqui
});

// Função para inicializar o carrinho ao carregar a página
function initCart() {
    // Verificar se há dados do carrinho no localStorage ao carregar a página
    if (localStorage.getItem('cartItems')) {
        // Obter os itens do carrinho do localStorage e convertê-los de volta para um objeto JavaScript
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

        // Inicializar propriedades ausentes (se necessário)
        cartItems.forEach(item => {
            item.quantity = item.quantity || 1; // Inicializar quantidade para 1 se estiver ausente
        });

        updateCartPopup();
    }
}



let totalPrice = 0;

function saveCartData() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}

function addItemToCart(itemId, type) {
    const selectedItem = menuItems[type].find(item => item.id === itemId);

    if (selectedItem) {
        const existingItem = cartItems.find(item => item.id === selectedItem.id);

        if (existingItem) {
            // Se o item já existe no carrinho, aumente a quantidade
            existingItem.quantity += 1;
        } else {
            // Se o item não está no carrinho, adicione-o com quantidade 1
            cartItems.push({
                id: selectedItem.id || generateUniqueID(), // Use a função generateUniqueID para gerar um ID único se o item não for do cardápio
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: 1
            });
        }

        // Atualizar o preço total
        totalPrice += selectedItem.price;

        // Atualizar o pop-up da sacola
        updateCartPopup();
        // Salvar o carrinho atualizado no localStorage após adicionar um item
        saveCartData();
    }
}





// Função para atualizar o pop-up da sacola
function updateCartPopup() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    // Se a sacola estiver vazia, exiba a mensagem "Sacola Vazia" e oculte os itens e o total
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = "block";
        cartItemsContainer.style.display = "none";
        totalPriceElement.style.display = "none";
    } else {
        // Se a sacola não estiver vazia, oculte a mensagem e exiba os itens e o total
        emptyCartMessage.style.display = "none";
        cartItemsContainer.style.display = "block";
        totalPriceElement.style.display = "block";

        // Limpar o conteúdo anterior
        cartItemsContainer.innerHTML = "";

        // Atualizar os itens e o total na sacola
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
            <span>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
        `;
            cartItemsContainer.appendChild(itemDiv);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

/*

                ADICIONAR ITENS NO CARRINHO - INICIO

*/


// PIZZAS
const addButtonElements = document.querySelectorAll("#cardapio .btn");
addButtonElements.forEach(button => {
    button.addEventListener("click", function (event) {
        // Obter o ID da pizza a partir do atributo data-id
        const itemIdPizza = parseInt(event.target.getAttribute("data-id-pizza"));
        // Adicionar o item ao carrinho passando o ID e o tipo (pizzas neste caso)
        addItemToCart(itemIdPizza, "pizzas");
        // Atualizar o pop-up da sacola
        updateCartPopup();
    });
});

// BEBIDAS
const addButtonElementsBebidas = document.querySelectorAll("#bebidas .btn");
addButtonElementsBebidas.forEach(button => {
    button.addEventListener("click", function (event) {
        // Obter o ID da bebida a partir do atributo data-id
        const itemIdBebida = parseInt(event.target.getAttribute("data-id-bebida"));
        // Adicionar o item ao carrinho passando o ID e o tipo (bebidas neste caso)
        addItemToCart(itemIdBebida, "bebidas");
        // Atualizar o pop-up da sacola
        updateCartPopup();
    });
});


/*

                ADICIONAR ITENS NO CARRINHO - FIM

*/

// Adicionar evento de clique ao ícone da sacola para abrir o pop-up
const cartIcon = document.querySelector(".fa-shopping-bag");
const sacola = document.getElementById("sacola");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");
let isPopupOpen = false; // Variável para rastrear se o pop-up está aberto ou fechado

sacola.addEventListener("click", function (event) {
    // Impedir o comportamento padrão do link (navegação)
    event.preventDefault();

    // Se o pop-up estiver aberto, feche-o. Se estiver fechado, abra-o.
    if (isPopupOpen) {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }

    // Atualize o estado do pop-up (aberto ou fechado)
    isPopupOpen = !isPopupOpen;
});

cartIcon.addEventListener("click", function () {
    popup.style.display = "block";
});

// Adicionar evento de clique ao botão de fechar pop-up
closePopupButton.addEventListener("click", function () {
    popup.style.display = "none";
    isPopupOpen = false; // Quando o pop-up é fechado pelo botão, marque-o como fechado
});


function clearCart() {
    // Limpar o array de itens do carrinho
    cartItems = [];
    // Resetar o preço total para 0
    totalPrice = 0;
    // Atualizar o pop-up da sacola para refletir as mudanças
    updateCartPopup();
    // Remover os itens do carrinho do localStorage
    localStorage.removeItem('cartItems');
}

// Chamando a função clearCart() quando necessário
// Exemplo: Quando um botão "Limpar Carrinho" é clicado
// Suponha que você tenha um botão com o id "cancelar-pedido"
const clearCartButton = document.getElementById('cancelar-pedido');
clearCartButton.addEventListener('click', function () {
    clearCart();
});

