import { Controller } from "@hotwired/stimulus"
var $count        =   0
var load_count    =   0
var search_text   =   ""
var quantity = 1
var product_size = ""

export default class extends Controller {
  static targets  =   ["newArrival","featuredProduct","productGallery", "productQuantity", "king_size_product","queen_size_product", "kid_size_product"]

  connect() {
    this.get_user_location()
    this.new_arrival_products()
    this.featured_product()
    this.product_gallery()
    
  }

  
// ===================================New Arrival ========================================================
    new_arrival_products() {
            // // console.log("load Count New arival   " + load_count)
            // if(this.king_size_productTarget.value == "King"){
            //   product_size = "King"
            //   console.log(product_size)
            // }
            // else if(this.queen_size_productTarget.value == "Queen"){
            //   product_size = "Queen"
            //   console.log(product_size)
            // }
            // else if(this.kid_size_productTarget.value == "Kid"){
            //   product_size = "Kid"
            //    console.log(product_size)
            // }
            

          fetch("/products/new_arrival", {

            method:"POST",
            body: JSON.stringify({
                // "size": product_size,
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
                  detail                                  =   detail + this.new_arrival_products_dynamic(element)
                  });
                  this.newArrivalTarget.insertAdjacentHTML("beforeend",detail)
          })

          }




      new_arrival_products_dynamic(element){ 
      return`
      <div class="box" id="div${element.product_unique_id}">
            <div class="image ">
                <img src=${element.product_image1.url}  alt="" style=" vertical-align: middle; height: 175px; width: 400px;">
            </div>
            <div class="info">
                <div>
                <a class="index-anch-new-arrival" href="/products/single_product/${element.product_unique_id}">
                <h3>${element.product_name}</h3>
                </a>
                </div>
                <div class="subInfo">
                
                    <strong class="price">₹${element.product_price}/- <span>${element.product_price}/-</span> </strong>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half"></i>
                    </div>
                </div>

               
            </div>
            <div class="overlay">
                <a data-action="click->product#add_to_wishlist"  data-product-id-param ="${element.product_unique_id}" style="--i:1;" class="fas fa-heart index-anch"></a>
                <a data-action="click->product#add_to_cart" id="liveToastBtn" data-product-id-param ="${element.product_unique_id}"  style="--i:2;" class="fas fa-shopping-cart index-anch"></a>
            </div>
        </div>


          <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <img src="..." class="rounded me-2" alt="...">
                <strong class="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                Hello, world! This is a toast message.
              </div>
            </div>
          </div>
      `
    }
// ===================================New Arrival  Ends///////////////////////////////////////////////////


    product_quantity(){
      quantity = this.productQuantityTarget.value
      
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

    add_to_wishlist(data){
   
        var product_unique_id = data.params.id
        fetch("/carts/add_to_wishlist", {
  
          method:"POST",
          body: JSON.stringify({
              "product_unique_id"    :   product_unique_id,
              "quantity"   :   quantity
          }),
          headers: { "content-type": "application/json; charset=UTF-8" }
        })
      
    }

    // =====================Delete Product===============================================

    delete(data) {

      // console.log(data.params.id)

      if(confirm("Are You Sure You Want to delete the product")){ 
      
        fetch("/products/delete_product/"+data.params.id, {method: "delete"})
        .then(res => {
          if (res.ok == true){
            // console.log("Before Delete load count  " +load_count)
            load_count    =   load_count -1
            // console.log("After Delete load count  " +load_count)
            $count        =   $count-1
            // console.log("After Delete count  " +$count)
            document.getElementById("div"+data.params.id).remove()

            // if(load_count < 6){
            //   // console.log("Function kulla vanthuten")
            //   // console.log("Delete Load Count: " +load_count)
            //   this.new_arrival_products(load_count)
            // } 

          }  
        })
      }

    }

    // ==================================================Featured Product========================================

    featured_product(){
      fetch("/products/featured_product", {
        headers: { "content-type": "application/json; charset=UTF-8" }
  
      })
  
      .then(result=> result.json())
      .then(data=> {
        var detail                                =   ''
               detail                                  =  this.featured_product_dynamic(data)
               this.featuredProductTarget.insertAdjacentHTML("beforeend",detail) 
      })
    }

    featured_product_dynamic(data){
      return`
      <div class="image-container">
        <div class="big-image">
            <img src="${data.product_image2.url}" alt="">
        </div>

        <div class="small-image">
            <img class="image-active" src="${data.product_image3.url}" alt="">
            <img src="${data.product_image1.url}" alt="">
            <img src="${data.product_image3.url}" alt="">
            <img src="${data.product_image5.url}" alt="">
        </div>

      </div>

    <div class="content">
    <a class="index-anch-new-arrival" href="/products/single_product/${data.product_unique_id}">
      <h3> ${data.product_name}</h3></a>
      <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <span>(500+) reviews</span>
      </div>
      <p>!${data.product_description}</p>
      <strong class="price">₹ ${data.product_price}<span>₹1500</span> </strong>
      <a data-action="click->product#add_to_cart" class="btn-index index-anch" href="#">Add to Cart</a>

    </div>
      `
    }


    // =========================================Product Gallery====================================================

    product_gallery(){
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
      // console.log(data[0])
        data[0].forEach(element => {
         
               detail                                  =   detail + this.product_gallery_dynamic(element)
              });
              this.productGalleryTarget.innerHTML = detail
      })
    }

    product_gallery_dynamic(element){
      return`
      <div class="row"  data-product-owner-target="productGallery">
      <div class="image-container">
          <div class="small-image">
              <img src="${element.product_image2.url}" style="width: 100px; height: 100px;" class="featured-image-1" alt="">
              <img src="${element.product_image3.url}" style="width: 100px; height: 100px;" class="featured-image-1" alt="">
              <img src="${element.product_image4.url}" style="width: 100px; height: 100px;" class="featured-image-1" alt="">
              <img src="${element.product_image5.url}" style="width: 100px; height: 100px;" class="featured-image-1" alt="">
          </div>
          <div class="big-image">
              <img src="${element.product_image1.url}" style="width: 400px; height: 400px;"class="big-image-1" alt="">
          </div>
      </div>
      <div class="content">
          <a class="index-anch-new-arrival" href="/products/single_product/${element.product_unique_id}">
          <h3>${element.product_name}</h3>
          </a>
          <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
          </div>
          <p>${element.product_description}</p>
          <div class="price">$${element.product_price*29.8/100} <span> $ ${element.product_price}</span></div>
          <div class="product-card-buttons">
          <a data-action="click->product#add_to_wishlist"  data-product-id-param ="${element.product_unique_id}" class="fas fa-heart product-gallery-anch ">Add To Wishlish</a>
          <a  data-action="click->product#add_to_cart" id="liveToastBtn" data-product-id-param ="${element.product_unique_id}"   class="fas fa-shopping-cart product-gallery-anch " >Add To Cart</a>
          </div>
      </div>
     
    </div>
      `
    }


// =======================Location=========================================================
get_user_location(){
  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
    // this.detail_code(data)
  } else { 
    document.getElementById("demo").innerHTML =
    "Geolocation is not supported by this browser.";
  }
  
  function showPosition(position) {

    // console.log(position.coords.latitude)

    const lat = position.coords.latitude;
    const lon = position.coords.logitude;
  
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude-${lat}&longitude-${lon}& localityLanguage-en`
  
    fetch (geoApiUrl)
    .then(res => res.json())
    .then(data => { 
    
    })
  } 
}
detail_code(){
  console.log("Detail")
}

    

}
