import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="invoice"
export default class extends Controller {
  static targets  =   ["invoiceDetail", "invoiceTotal"]

  connect() {
    this.invoice_reports()
    console.log("DEV")
  }

  invoice_reports(){
    console.log("SUrya")
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
            this.invoiceDetailTarget.innerHTML = detail
          var order                                  =   this.order_binding( cart_tax , cart_total, cart_shipping)
          this.invoiceTotalTarget.innerHTML = order
    })
  }



dynamic_data(element){
  return`
  <tr>
                <td class="center"></td>
                <td class="left strong">${element.product_name}</td>
                <td class="left">${element.product_description}</td>
                <td class="right">$${element.product_price}</td>
                <td class="center">${element.product_quantity}</td>
                <td class="right">$${element.product_price}*${element.product_quantity}</td>
  </tr>
  `
}

order_binding( cart_tax , cart_total, cart_shipping){
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
        <td class="right">$${cart_total}*(20/100)</td>
        </tr>
        <tr>
          <td class="left">
              <strong class="text-dark">VAT (10%)</strong>
              </td>
          <td class="right">$${cart_total}*(10/100)</td>
        </tr>
        <tr>
          <td class="left">
          <strong class="text-dark">Total</strong>
        </td>
          <td class="right">
          <strong class="text-dark">$(${cart_total} - (${cart_total}*(10/100)) - (${cart_total}*(20/100)))</strong>
      </td>
    </tr>
  `

}


}
