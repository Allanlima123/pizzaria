const formatoReal = valor => 
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export { formatoReal };