let ingridientsBar = document.getElementsByClassName('ingredients')[0];
const orderBtn = document.getElementsByClassName('order')[0]; 
ingridientsBar.addEventListener('click', addToAnotherUl) 
let price = 0; 


function addToAnotherUl(e) {
  if (e.target.tagName !== 'LI') return;
  let addedIngridientList = document.getElementsByClassName('addingIngridients')[0];
  const targetLi = e.target;
  const dataCount = targetLi.getAttribute('data-count'); 
  const cloneLi = addedIngridientList.getElementsByClassName(targetLi.classList[0]);
  const similarCount = cloneLi.length;

  if ((dataCount === 'single' && similarCount < 1) || (dataCount === 'double' && similarCount < 2)) {
    const li = e.target;
    const priceToAdd = parseInt(li.getAttribute('data-price'));
    let clonedLi = li.cloneNode(true);
    li.classList.add('selected'); 
    addedIngridientList.append(clonedLi);
    price += priceToAdd;
    updatePrice();
    updatePizzaView();
    let listsWithSelectedItems = new Set();
    document.querySelectorAll('.ingredients ul').forEach((ul) => {
    
      if (ul.querySelectorAll('li.selected').length > 0) {
        listsWithSelectedItems.add(ul);
      }
    });

    if (listsWithSelectedItems.size === 4) {
      orderBtn.hidden = false;
    }
  } else {
    alert('Maximum ingredients reached');
  }
}

function removeLi(e) {
  if (e.target.tagName === 'LI') {
    const selectedLi = e.target;
    ingridientsBar.querySelectorAll('.selected.'+selectedLi.className).forEach((el) => {
      if (el.textContent === selectedLi.textContent) {
        el.classList.remove('selected')
      }
    });
      
    selectedLi.parentNode.removeChild(selectedLi); 
    const priceToRemove = parseInt(selectedLi.getAttribute('data-price')); 
    price -= priceToRemove;
    updatePrice();
    updatePizzaView();
  }
}

function updatePrice() {
  const priceDisplay = document.getElementById('price-display');
  priceDisplay.textContent = `Total Price: $${price.toFixed(2)}`; 
}

function updatePizzaView() {
  const ingredientsLists = document.querySelectorAll('.ingredients ul'); 
  const quarters = document.querySelectorAll('.picture .quarter');
  let totalItems = 0; 
  let selectedColumns = 0; 
  ingredientsLists.forEach((list) => {
    const selectedItemCount = list.querySelectorAll('li.selected').length; 
    
    if (selectedItemCount > 0) {
      selectedColumns++
    }
    totalItems += selectedItemCount;
  });

  quarters.forEach((quarter, index) => {
    quarter.hidden = index >= selectedColumns;
  });

  orderBtn.hidden = selectedColumns !== 4; 
}

function createOrder(event) {
  event.preventDefault(); 
  const selectedIngredients = document.querySelectorAll('.addingIngridients li');
  const order = {
    ingredients: [],
    totalPrice: price.toFixed(2)
  };

  selectedIngredients.forEach((ingredient) => {
    const ingredientName = ingredient.textContent.trim(); 
    const ingredientPrice = parseFloat(ingredient.getAttribute('data-price'));
    order.ingredients.push({ name: ingredientName, price: ingredientPrice });
  });

  console.log('Order:', order);
}

orderBtn.addEventListener('click', createOrder);

