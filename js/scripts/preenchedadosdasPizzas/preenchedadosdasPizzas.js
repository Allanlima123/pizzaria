import { formatoReal } from "../../scripts/formato-real/formatoreal.js";

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
    const { img, price, name, description } = item;

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = img
    pizzaItem.querySelector('.pizza-item--price').textContent = formatoReal(price[2])
    pizzaItem.querySelector('.pizza-item--name').textContent = name
    pizzaItem.querySelector('.pizza-item--desc').textContent = description
}

export { preencheDadosDasPizzas };