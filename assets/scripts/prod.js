const prices = {'Prod1':10, 'Prod2':20}
let lsprod = JSON.parse(localStorage.getItem('product'))


var prods = []
if (lsprod != null){
    prods = localStorage.getItem('product')
    prods = JSON.parse(prods);
}

//escrever o produto no form
function get_prod() {
    let prod = document.getElementById('prods')
    let txt = ''
    let list_of_prods = JSON.parse(localStorage.getItem('product'))
    list_of_prods.forEach(item => {
        txt += `${item}, `
    })
    txt = txt.substring(0, txt.length - 2)
    prod.setAttribute('value', txt)
    prod.setAttribute('readonly', 'true')
    let checkout_price = document.getElementsByClassName('title')[0]
    checkout_price.innerText = 'Checkout: $' + localStorage.getItem('valor')
}

//selecionar o produto e defenir o localstorage
let btns = document.querySelectorAll('.add_cart');
Array.prototype.forEach.call(btns, (i) => {
    i.addEventListener('click', () => {
        prods.push(i.getAttribute('data-id'))
        localStorage.setItem("product", JSON.stringify(prods));
        alertify.success('Product Added to Cart');
    })
})

//verificar os campos
document.getElementsByClassName('submit')[0].addEventListener('click', () => {
    console.log('teste')
    var btns = document.querySelectorAll('.inputs_t');
    verify = []
    Array.prototype.forEach.call(btns, (i) => {
        console.log('values: ' + String(i.value))
        if(i.value != ''){
            verify.push(i.value)
        }
        
    })
    if (verify.length == 4){
        
        alertify.alert("Payment Status", 'We will contact you via discord when payment is confirmed. Click "OK" to go to Paypal.', function(){
            alertify.message('OK');
            document.getElementById('form').submit();
            location.replace('https://paypal.com')
            localStorage.clear()
        });
    }else{
        alertify.error('Please Fill All Fields');
    }
    //document.getElementById('form').submit();
    
})

//adicona os produtos no carrinho visualmente
function load_body(){
    if (localStorage.getItem('product') == null){
        /*
        alertify.error('Your Cart is Empty');
        function timeFunction() {
            setTimeout(function(){ document.location = 'index.html'; }, 3000);
        }
        timeFunction()
        */
        alertify.alert("Cart", "Your Cart is Empty.", function(){
            alertify.message('OK');
            document.location = 'index.html'
        });
    }
    let list_of_prods = JSON.parse(localStorage.getItem('product'))
    list_of_prods.forEach(item => {
        cart = document.getElementsByClassName('content')[0]

        let div = document.createElement('div')
        div.setAttribute('class', 'item flex align')

        let title = document.createElement('h1')
        title.setAttribute('class', 'item_title')
        title.innerText = item
        div.appendChild(title)

        let quant = document.createElement('p')
        quant.setAttribute('class', 'item_quant')
        quant.innerText = '1'
        div.appendChild(quant)
    
        cart.appendChild(div)
    });
    localStorage.removeItem('valor')
    let valor = 0
    list_of_prods.forEach(item => {
        valor += prices[item]
    })
    localStorage.setItem('valor', valor)

    let bottom = document.createElement('div')
    bottom.setAttribute('class', 'bottom flex align')
    
    let clear = document.createElement('div')
    clear.setAttribute('class', 'clear flex align justify')
    clear.setAttribute('onclick', 'clear_cart()')
    clear.innerText = 'Clear'
    let total = document.createElement('div')
    total.setAttribute('class', 'total flex align justify')
    total.setAttribute('onclick', 'redirect()')
    total.innerText = `Buy Now: $ ${valor}`
    bottom.appendChild(clear)
    bottom.appendChild(total)

    cart.appendChild(bottom)
}

function clear_cart(){
    
    alertify.alert("Cart", "Your Cart Has Been Cleaned.", function(){
        alertify.message('OK');
        document.location = 'index.html'
        localStorage.clear()
    });
}

function redirect(){
    document.location = 'payment.html'
}