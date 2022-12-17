import { formatoReal } from "../../scripts/formato-real/formatoreal.js";


const atualizarCarrinho = (seleciona, cart) => {
    seleciona('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0) {
        seleciona('aside').classList.add('show')

        seleciona('.cart').innerHTML = '';

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {
            let pizzaItem = pizzaJson.find(({ id }) => id === cart[i].id)

            subtotal += cart[i].price * cart[i].qt

            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let pizzaSizeName = cart[i].size

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                atualizarCarrinho(seleciona,cart)
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                }

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

                atualizarCarrinho(seleciona,cart)
            })

            seleciona('.cart').append(cartItem)
        }

        desconto = subtotal * .1
        total = subtotal - desconto

        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)
    } else {
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw';
    }
}

export { atualizarCarrinho };