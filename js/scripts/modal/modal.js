import { seleciona } from "../../index.js";
import { formatoReal } from "../formato-real/formatoreal.js";

const preencheDadosModal = ({ img, name, description, price }) => {
    seleciona('.pizzaBig img').src = img
    seleciona('.pizzaInfo h1').innerHTML = name
    seleciona('.pizzaInfo--desc').innerHTML = description
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(price[2])
}

const abrirModal = seleciona => {
    seleciona('.pizzaWindowArea').style.opacity = 0 
    seleciona('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150);
}

const fecharModal = seleciona => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = selecionaTodos => {
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton')
        .forEach(item => item.addEventListener('click', () => fecharModal(seleciona)))
}

export { abrirModal, fecharModal, botoesFechar };
export {  preencheDadosModal };