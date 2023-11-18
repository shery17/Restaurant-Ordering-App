import { menuArray } from "./data.js"


let orderArray = []
let isPayment = false
const currentOrder = document.getElementById('current-order')

document.addEventListener('click', function(e){
    if(e.target.dataset.order === '0'){
        orderArray.push(0)
    }
    else if(e.target.dataset.order === '1'){
        orderArray.push(1)
    }
    else if(e.target.dataset.order === '2'){
        orderArray.push(2)
    }
    
    else if(e.target.dataset.remove) {
        orderArray.splice(e.target.dataset.remove, 1)
    }
    else if(e.target.id === 'order-btn'){
        document.getElementById('modal').classList.remove('hidden')
    }
    else if(e.target.id === 'pay-btn'){
        e.preventDefault()
        handlePayBtn()
    }

    if(!isPayment){
        if(orderArray.length > 0) {
            document.getElementById('order-section').classList.remove('hidden')
        }
        else {
            document.getElementById('order-section').classList.add('hidden')
        }
    }
    else {
        document.getElementById('modal').classList.add('hidden')
        document.getElementById('order-section').classList.add('hidden')
    }
    
    updateOrder()
})

function getHtmlString() {
    let htmlString = ''
    menuArray.forEach(function(item){
        htmlString += `
        <div class='item-container' id='${item.id}'>
           <p class='emoji'>${item.emoji}</p>
            <div class='item'>
                <h2>${item.name}</h2>
                <p>${item.ingredients}</p>
                <h4>$${item.price}</h4>
            </div>
            <button class='addBtn' data-order='${item.id}'>+</button>
        </div>
        `
    })
    return htmlString
}

function renderMenu(){
    document.getElementById('menu-div').innerHTML = getHtmlString()
}

function updateOrder(){

    let count = 0
    let htmlString = ``
    for (let index of orderArray){
        htmlString += `<div class='item-order'>
                            <p>${menuArray[index].name}</p>
                            <p class='remove' data-remove='${count}'>remove</p>
                            <p class='price'>$${menuArray[index].price}</p>
                        </div>`
        count++
    }

    let totalPrice = 0
    orderArray.forEach(function(itemIndex){
        totalPrice += menuArray[itemIndex].price
    })

    htmlString += `<div class='total-order'>
                        <p>Total price: </p>
                        <p class='price'>$${totalPrice}</p>
                    </div>`

    currentOrder.innerHTML = htmlString
}

function handlePayBtn(){
    paymentConfirmation()
}

function paymentConfirmation(){
    isPayment = true
    const htmlString = `<p class='paymentConfirm'>Thanks, ${document.getElementById('name').value}!<br>Your order is on its way!</p>`
    document.getElementById('payment-confirmation').innerHTML = htmlString
}

renderMenu()