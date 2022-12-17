import { abrirModal, fecharModal, botoesFechar } from "./scripts/modal/modal.js";
import { atualizarCarrinho } from "./scripts/atualizarcarrinho/atualizarcarrinho.js";
import { preencheDadosDasPizzas } from "./scripts/preenchedadosdasPizzas/preenchedadosdasPizzas.js";
import { formatoReal } from "./scripts/formato-real/formatoreal.js";
import { preencheDadosModal } from "./scripts/modal/modal.js";
import { abrirCarrinho, fecharCarrinho } from "./scripts/abrirefecharcarrinho/abrirefecharcarrinho.js";

let modalKey = 0;

let quantPizzas = 1;

let cart = [];

const seleciona = elemento => document.querySelector(elemento);
const selecionaTodos = elemento => document.querySelectorAll(elemento);

const formatoMonetario = valor => {
    if (valor) return valor.toFixed(2);
};

const pegarKey = e => {
    let key = e.target.closest('.pizza-item').getAttribute('data-key');

    quantPizzas = 1

    modalKey = key

    return key
}

const preencherTamanhos = key => {
    seleciona('.pizzaInfo--size.selected').classList.remove('selected')

    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = key => {
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', e => {
            seleciona('.pizzaInfo--size.selected').classList.remove('selected')
            size.classList.add('selected')

            seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    })

    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if (quantPizzas > 1) {
            quantPizzas--
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
        let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')

        let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

        let identificador = `${pizzaJson[modalKey].id} t ${size}`; 

        let key = cart.findIndex(item => item.identificador === identificador)

        if (key > -1) {
            cart[key].qt += quantPizzas
        } else {
            let pizza = {
                identificador,
                id: pizzaJson[modalKey].id,
                size,
                qt: quantPizzas,
                price: parseFloat(price)
            }
            cart.push(pizza)
        }

        fecharModal(seleciona)
        abrirCarrinho(seleciona, cart)
        atualizarCarrinho(seleciona, cart)
    })
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    seleciona('.pizza-area').append(pizzaItem)

    preencheDadosDasPizzas(pizzaItem, item, index)

    pizzaItem.querySelector('.pizza-item a').addEventListener('click', e => {
        e.preventDefault()

        let chave = pegarKey(e)

        abrirModal(seleciona)
        preencheDadosModal(item)
        preencherTamanhos(chave)
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
        escolherTamanhoPreco(chave)
    })

    botoesFechar(selecionaTodos)
})

mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho(seleciona, cart)
fecharCarrinho(seleciona)
finalizarCompra()

export { seleciona };

