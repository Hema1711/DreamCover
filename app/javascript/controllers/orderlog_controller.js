import { Controller } from "@hotwired/stimulus"
var search_text =""
// Connects to data-controller="orderlog"
export default class extends Controller {

  static targets  =   ["orderDetail" ,"order_is_empty"]


  connect() {
    console.log("Order Log")
    this.order_binding()
  }


  order_binding(){
    fetch("/order/get_order_logs", {

      method:"POST",
      body: JSON.stringify({
          
          "search_text"   :   search_text
      }),

      headers: { "content-type": "application/json; charset=UTF-8" }

    })

    .then(result=> result.json())
    .then(data=> {
      var detail                                =   ''

      if(data == null){
        console.log("Success")
        this.order_is_emptyTarget.style.display =   "block"
      }
      else{
      data.forEach(element => {
        console.log(element)
        this.order_is_emptyTarget.style.display =   "none"
             detail                                  =  detail + this.dynamic_data(element)
             
            });
            this.orderDetailTarget.innerHTML = detail
          }

    })
  }


  dynamic_data(element){ 
    console.log(element)
    return`
    <div class="row justify-content-center mb-3"  >
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div class="">
            <div class="row">

              <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src="${element.user_profile}" class="w-100" style="width:200px; height:200px"/>
                  <a href="#!">
                    <div class="hover-overlay">
                      <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-6">
                <h5>${element.customer_name}</h5>
                <div class="d-flex flex-row">
                  <div class="text-danger mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <span>310</span>
                </div>
                <div class="mt-1 mb-0 text-muted small">
                  <span>100% cotton</span>
                  <span class="text-primary"> • </span>
                  <span>Light weight</span>
                  <span class="text-primary"> • </span>
                  <span>Best finish<br /></span>
                </div>
                <div class="mb-2 text-muted small">
                  <span>Unique design</span>
                  <span class="text-primary"> • </span>
                  <span>For men</span>
                  <span class="text-primary"> • </span>
                  <span>Casual<br /></span>
                </div>
                <p class="text-truncate mb-4 mb-md-0">
                ${element.customer_address}
                </p>
              </div>

              <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div class="d-flex flex-row align-items-center mb-1">
                  <h2 class="mb-1 me-1 danger" style=" font-weight: bolder;">${element.delivery_status}   </h2>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }

}
