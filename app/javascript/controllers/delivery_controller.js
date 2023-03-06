import { Controller } from "@hotwired/stimulus"
var product_price = []
// Connects to data-controller="delivery"
export default class extends Controller {
  static targets  =   ["deliveryDetail"]
  connect() {
    this.delivery_detail()
    console.log("deliveryDetail", "deliveryTotal")
  }

delivery_detail(){
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
          this.deliveryDetailTarget.innerHTML = detail
        var delivery                                  =   this.delivery_binding( cart_tax , cart_total, cart_shipping)
        this.deliveryTotalTarget.innerHTML = delivery
  })
}


dynamic_data(element){
  return`
  <div class="">
                <div class="row">
                  <div class="col-md-2">
                    <img src="${element.product_image1}"
                      class="img-fluid" alt="Phone">
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0">${element.product_name}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">White</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">Qty: ${element.product_quantity}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">$${element.product_price}</p>
                  </div>
                </div>
                <hr class="mb-4" style="background-color: #e0e0e0; opacity: 1;">
                <div class="row d-flex align-items-center">
                  <div class="col-md-2">
                    <p class="text-muted mb-0 small">Track Order</p>
                  </div>
                  <div class="col-md-10">
                    <div class="progress" style="height: 6px; border-radius: 16px;">
                      <div class="progress-bar" role="progressbar"
                        style="width: 5%; border-radius: 16px; background-color: #a8729a;" aria-valuenow="65"
                        aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </div>
                    <div class="d-flex justify-content-around mb-1">
                      <p class="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                      <p class="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                    </div>
                  </div>
                </div>
                <hr class="mb-4" style="background-color: #e0e0e0; opacity: 1;">
              </div>
  `
}

delivery_binding( cart_tax , cart_total, cart_shipping){
  return`
  <div class="d-flex justify-content-between pt-2">
                <p class="fw-bold mb-0">Order Details</p>
                <p class="text-muted mb-0"><span class="fw-bold me-4">Total</span> $${cart_total}</p>
              </div>

              <div class="d-flex justify-content-between pt-2">
                <p class="text-muted mb-0">Invoice Number : 788152</p>
                <p class="text-muted mb-0"><span class="fw-bold me-4">Discount</span> $19.00</p>
              </div>

              <div class="d-flex justify-content-between">
                <p class="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                <p class="text-muted mb-0"><span class="fw-bold me-4">GST 18%</span> ${cart_tax}</p>
              </div>

              <div class="d-flex justify-content-between mb-5">
                <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                <p class="text-muted mb-0"><span class="fw-bold me-4">Delivery Charges</span>  $${cart_shipping}</p>
              </div>
         
              <div class="card-footer border-0 px-4 py-5"
                style="background-color: #a8729a; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                  paid: <span class="h2 mb-0 ms-2">$${cart_total}</span></h5>
              </div>
  `

}

}
