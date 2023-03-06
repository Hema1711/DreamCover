import { Controller } from "@hotwired/stimulus"
var product_price = []
// Connects to data-controller="order"
export default class extends Controller {


  static targets  =   ["orderDetail", "orderTotal","invoice_detail", "invoiceTotal"]

  connect() {
console.log("Entered") 
this.order_reports()
 }

 order_reports(){
  fetch("/carts/cart_details/", {
    method:"POST",
    body: JSON.stringify({
        
    }),
    headers: { "content-type": "application/json; charset=UTF-8" }

  })

  .then(result=> result.json())
  .then(data=> {
    var detail                                =   ''
    var cart_tax = 25
    let cart_total = data[1]  
    var cart_shipping = 20
   
    data[0].forEach(element => {
          //  this.cart_is_emptyTarget.style.display =   "none"
           product_price.push(element.product_price)
           detail                                  =  detail + this.dynamic_data(element)
          });
          this.orderDetailTarget.innerHTML = detail
        var order                                  =   this.order_binding( cart_tax , cart_total, cart_shipping)
        this.orderTotalTarget.innerHTML = order
  })
}


dynamic_data(element){
  return`
  <tr style="border-top:2px solid #E1F1D5;">
    <td><img src="${element.product_image1}" width="70"></td>
    <td>${element.product_name}</td>
    <td>${element.product_description}</td>
    <td>$${element.product_price}</td>
    <td>${element.product_quantity}</td>
    <td>$${element.product_price * element.product_quantity}</td>
  </tr>
  
  `
}

order_binding( cart_tax , cart_total, cart_shipping){
  return`
  <tbody class="totals">
    <tr>
        <td>
            <div class="text-left">
                <span class="text-muted">Subtotal</span>
            </div>
        </td>
        <td>
            <div class="text-right">
                <span>$${cart_total}</span>
            </div>
        </td>
    </tr>

    <tr>
        <td>
            <div class="text-left">
                <span class="text-muted">Shipping Fee</span>
            </div>
        </td>
        <td>
            <div class="text-right">
                <span>$${cart_shipping}</span>
            </div>
        </td>
    </tr>


    <tr>
        <td>
            <div class="text-left">
                <span class="text-muted">Tax Fee</span>
                
            </div>
        </td>
        <td>
            <div class="text-right">
                <span>$${cart_tax}</span>
            </div>
        </td>
    </tr>


    <tr>
        <td>
            <div class="text-left">
                <span class="text-muted">Discount</span>
            </div>
        </td>
        <td>
            <div class="text-right">
                <span class="text-success">$168.50</span>
            </div>
        </td>
    </tr>


    <tr class="border-top border-bottom">
        <td>
            <div class="text-left">
                <span class="font-weight-bold">Subtotal</span>
            </div>
        </td>
        <td>
            <div class="text-right">
                <span class="font-weight-bold">$${cart_total + cart_shipping  + cart_tax}</span>
            </div>
        </td>
    </tr>
    
</tbody>
  `

}
// ---------------------Invoice Detail-------------------------------------------------
invoice_pdf(){
  console.log("invoice_pdf" )
  fetch("/invoice_download", {
    headers: { "content-type": "application/json; charset=UTF-8" }

  })
}

invoice_generate(){
  console.log("invoice_generate" )
  fetch("/invoice_generate", {
    headers: { "content-type": "application/json; charset=UTF-8" }
  })
  .then(result=> result.json())
  .then(data=> {
    var detail                                =   ''
    var cart_tax = 25
    let cart_total = data[1]  
    var cart_shipping = 20
   
    data[0].forEach(element => {
          //  this.cart_is_emptyTarget.style.display =   "none"
           product_price.push(element.product_price)
           detail                                  =  detail + this.invoice_data(element)
          });
          this.invoice_detailTarget.innerHTML = detail
        var order                                  =   this.invoice_binding( cart_tax , cart_total, cart_shipping)
        this.invoiceTotalTarget.innerHTML = order
  })
  this.invoice_pdf
}



// invoice_detail(){
//     console.log("invoice_detail" )
//     fetch("/carts/cart_details/ ", {
//       method:"POST",
//       body: JSON.stringify({
          
//       }),
//       headers: { "content-type": "application/json; charset=UTF-8" }
  
//     })
  
//     .then(result=> result.json())
//     .then(data=> {
//       var detail                                =   ''
//       var cart_tax = 25
//       let cart_total = data[1]  
//       var cart_shipping = 20
     
//       data[0].forEach(element => {
//             //  this.cart_is_emptyTarget.style.display =   "none"
//              product_price.push(element.product_price)
//              detail                                  =  detail + this.invoice_data(element)
//             });
//             this.invoice_detailTarget.innerHTML = detail
//           var order                                  =   this.invoice_binding( cart_tax , cart_total, cart_shipping)
//           this.invoiceTotalTarget.innerHTML = order
//     })
//   }



  invoice_data(element){
    return`
    <tr>
                  <td class="center">1++</td>
                  <td class="left strong">${element.product_name}</td>
                  <td class="left">${element.product_description}</td>
                  <td class="right">$${element.product_price}</td>
                  <td class="center">${element.product_quantity}</td>
                  <td class="right">$${element.product_price * element.product_quantity}</td>
    </tr>
    `
  }
  
  invoice_binding( cart_tax , cart_total, cart_shipping){
    return`
        <tr>
          <td class="left">
            <strong class="text-dark">Subtotal</strong>
            </td>
            <td class="right">$${cart_total}</td>
           </tr>
            <tr>
                <td class="left">
                <strong class="text-dark">Discount (20%)</strong>
            </td>
          <td class="right">$${cart_total*(20/100)}</td>
          </tr>
          <tr>
            <td class="left">
                <strong class="text-dark">VAT (10%)</strong>
                </td>
            <td class="right">$${cart_total*(10/100)}</td>
          </tr>
          <tr>
            <td class="left">
            <strong class="text-dark">Total</strong>
          </td>
            <td class="right">
            <strong class="text-dark">$${cart_total - (cart_total *(10/100)) - (cart_total *(20/100))}</strong>
        </td>
      </tr>
    `
  }



}
