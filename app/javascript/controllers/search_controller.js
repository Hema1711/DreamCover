import { Controller } from "@hotwired/stimulus"
var search_text =""
var load_count = 0
var  $count = 0
// Connects to data-controller="search"
export default class extends Controller {

  static targets  =   ["search", "serachData","searchText","searchError"]
   
  connect() {
    // console.log("Search Controller")
    
  }



    search_dynamic_data() {
      // console.log("Serach Kulla Vanthuten 2")
      // console.log("load Count New arival   " + load_count)
    fetch("/products/all_product", {

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
      $count = data[1]

      load_count                                =   load_count +data[0].length




      data[0].forEach(element => {
      
            detail                                  =   detail + this.all_products_dynamic(element)
            });
            // detail = this.serachDataTarget.innerHTML
            this.serachDataTarget.insertAdjacentHTML("beforeend",detail)
    })

  }

  all_products_dynamic(element){ 
  return`
  <div class="row" data-search-target="serachData">
        <div class="image-container">
            <div class="small-image">
                <img src="${element.product_image2.url}" class="featured-image-1" alt="">
                <img src="${element.product_image3.url}" class="featured-image-1" alt="">
                <img src="${element.product_image4.url}" class="featured-image-1" alt="">
                <img src="${element.product_image5.url}" class="featured-image-1" alt="">
            </div>
            <div class="big-image">
                <img src="${element.product_image1.url}" class="big-image-1" alt="">
            </div>
        </div>
        <div class="content">
            <h3>${element.product_name}</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <p>${element.product_description}</p>
            <div class="price">$${element.product_price*29.8/100} <span> $ ${element.product_price}</span></div>
            <a href="#" class="btn">add to cart</a>
        </div>
       
    </div>
  `
  }

  search_box(){
    search_text = this.searchTextTarget.value
  
    if(search_text !=""){
    this.serachDataTarget.innerHTML            =   " "
    load_count                              =   0
 
    this.searchErrorTarget.style.display =    "none"
    this.search_dynamic_data()
    }
    else{
      this.searchErrorTarget.style.display =    "block"
    }
   
  }



}
