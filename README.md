# Curitiba Energia Solar

Site institucional com simulador de dimensionamento solar.
HTML, CSS e JavaScript estáticos. Sem build, sem backend, sem banco de dados.

## Rodar

Abrir `index.html` no navegador, ou servir a pasta:

```
npx serve .
```

## Publicar

Subir o conteúdo desta pasta na hospedagem. O `index.html` fica na raiz.
Funciona em Vercel, Netlify, GitHub Pages ou hospedagem compartilhada comum.

## Onde mexer

Quase tudo que muda com o tempo está em `assets/js/dados.js`:

| O quê | Onde |
|---|---|
| WhatsApp, e-mail, endereço, horário, redes | `CONFIG` |
| Tarifa da Copel, potência do painel, perdas | `PARAMS` |
| Cidades atendidas e irradiação (HSP) | `CIDADES` |
| Obras entregues (foto, bairro, ficha técnica) | `OBRAS` |
| Nota do Google e depoimentos | `AVALIACAO` e `DEPOIMENTOS` |

## Como o simulador calcula

```
consumo (kWh/mês) = valor da conta / tarifa
excedente         = consumo - taxa mínima (30 mono / 50 bi / 100 tri)
kWp necessário    = (excedente / 30) / (HSP x performance)
nº de painéis     = arredonda pra cima (kWp x 1000 / potência do painel)
economia/mês      = excedente x tarifa
área no telhado   = nº painéis x área do painel x folga de espaçamento
```

Roda inteiro no navegador. Não envia nem armazena dado nenhum do visitante.

## Pendências antes de publicar

- Depoimentos e nota do Google são exemplo de layout, trocar pelos reais
- E-mail, endereço e horário do rodapé são provisórios
- 3 dos 5 cards de obra estão com a ficha técnica incompleta
- Confirmar a tarifa Copel vigente para calibrar o simulador
