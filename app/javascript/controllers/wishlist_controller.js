import { Controller } from "@hotwired/stimulus"
var load_count    =   0
var search_text   =   ""
// Connects to data-controller="wishlist"
var quantity = 1
export default class extends Controller {

  static targets  =   ["wishlistDetail","wishlist_is_empty"]

  connect() {
    // console.log("WIshlist")
    this.wishlist_binding()
}
  
  wishlist_binding(){
    fetch("/carts/wishlist_details/", {

      method:"POST",
      body: JSON.stringify({
          "load_count"    :   load_count,
          "search_text"   :   search_text
      }),

      headers: { "content-type": "application/json; charset=UTF-8" }

    })

    .then(result=> result.json())
    .then(data=> {
      var detail                                =   ''

      if(data == null){
        console.log("Success")
        this.wishlist_is_emptyTarget.style.display =   "block"
      }
      else{
      data.forEach(element => {
        this.wishlist_is_emptyTarget.style.display =   "none"
             detail                                  =  detail + this.dynamic_data(element)
             
            });
            this.wishlistDetailTarget.innerHTML = detail
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
                  <img src="${element.product_image2.url}" class="w-100" style="width:200px; height:200px"/>
                  <a href="#!">
                    <div class="hover-overlay">
                      <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-6">
                <h5>${element.product_name}</h5>
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
                ${element.product_description}
                </p>
              </div>

              <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div class="d-flex flex-row align-items-center mb-1">
                  <h4 class="mb-1 me-1">$${element.product_price}   </h4>
                  <span class="text-danger"><s>$20.99</s></span>
                </div>
                <h6 class="text-success">Free shipping</h6>
                <div class="d-flex flex-column mt-4">
                  <a class="btn-wish" href="/carts/delete_wishlist/${element.product_unique_id}" type="button">Delete</a>
                  <a data-action="click->wishlist#add_to_cart" data-wishlist-id-param ="${element.product_unique_id}" class="btn-wish" type="button">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }


  add_to_cart(data){
    console.log("add_to_cart")
    var product_unique_id = data.params.id
   
    fetch("/carts/add_to_cart", {

      method:"POST",
      body: JSON.stringify({
          "product_unique_id"    :   product_unique_id,
          "quantity"   :   quantity
      }),
      headers: { "content-type": "application/json; charset=UTF-8" }
    })
  }

  // dynamic_data(element){ 
  //   console.log(element)
  //   return`
  //   <tr >
  //     <th scope="row">
  //       <div class="d-flex align-items-center">
  //         <img src="${element.product_image1.url}" class="img-fluid rounded-3"
  //           style="width: 120px;" alt="Book">
  //         <div class="flex-column ms-4">
  //           <p class="mb-2">${element.product_name}</p>
  //           <p class="mb-0">Daniel Kahneman</p>
  //         </div>
  //       </div>
  //     </th>
  //     <td class="align-middle">
  //       <p>Bedsheet</p>
  //     </td>

  //     <td>
  //     <div class="d-flex flex-column mt-4">
  //     <a class="btn-wish" href="/carts/delete_wishlist/${element.product_unique_id}" type="button">Delete</a>
  //     <a href="/carts/create_cart/${element.product_unique_id}" class="btn-wish" type="button">
  //       Add to Cart
  //     </a>
  //     </div>
  //     </td>
  //   </tr>
  //   `
  // }
}
