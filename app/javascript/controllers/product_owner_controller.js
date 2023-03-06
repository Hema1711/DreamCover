import { Controller } from "@hotwired/stimulus"
var search_text =""
var load_count = 0
var  $count = 0
// Connects to data-controller="product-owner"
export default class extends Controller {
  static targets  =   ["productGallery","search", "searchData","searchText","searchError"]
  connect() {
    console.log("Product Owner")
    this.product_gallery()
  }
  product_gallery(){
    // console.log("Product Owner 22")
    fetch("/products/products_for_owner", {

      method:"POST",
      body: JSON.stringify({
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
                <img src="${element.product_image2.url}" style="width: 120px; height: 130px;" class="featured-image-1" alt="">
                <img src="${element.product_image3.url}" style="width: 120px; height: 130px;" class="featured-image-1" alt="">
                <img src="${element.product_image4.url}" style="width: 120px; height: 130px;" class="featured-image-1" alt="">
                <img src="${element.product_image5.url}" style="width: 120px; height: 130px;" class="featured-image-1" alt="">
            </div>
            <div class="big-image">
                <img src="${element.product_image1.url}" style="width: 400px; height: 520px;"class="big-image-1" alt="">
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
            <div class="product-card-buttons">
            <a class="product-anch btn-info btn" href="/products/edit_product/${element.product_unique_id}">Edit</a>
            <a class="product-anch btn-danger btn" data-action="click->product-owner#delete" data-product-owner-id-param=${element.product_unique_id} >Delete</a>
            </div>
        </div>
       
    </div>
    `
  }


  search_box() {
    console.log("Serach Kulla Vanthuten 2")
    // console.log("load Count New arival   " + load_count)
    search_text = this.searchTextTarget.value
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

    console.log(data[0])


    data[0].forEach(element => {
    
          detail                                  =   detail + this.all_products_dynamic(element)
          });
          // detail = this.serachDataTarget.innerHTML
          this.searchDataTarget.insertAdjacentHTML("beforeend",detail)
  })

}

// all_products_dynamic(element){ 
// return`
//   <div class="row" data-search-target="serachData">
//       <div class="image-container">
//           <div class="small-image">
//               <img src="${element.product_image2.url}" class="featured-image-1" alt="">
//               <img src="${element.product_image3.url}" class="featured-image-1" alt="">
//               <img src="${element.product_image4.url}" class="featured-image-1" alt="">
//               <img src="${element.product_image5.url}" class="featured-image-1" alt="">
//           </div>
//           <div class="big-image">
//               <img src="${element.product_image1.url}" class="big-image-1" alt="">
//           </div>
//       </div>
//       <div class="content">
//           <h3>${element.product_name}</h3>
//           <div class="stars">
//               <i class="fas fa-star"></i>
//               <i class="fas fa-star"></i>
//               <i class="fas fa-star"></i>
//               <i class="fas fa-star"></i>
//               <i class="far fa-star"></i>
//           </div>
//           <p>${element.product_description}</p>
//           <div class="price">$${element.product_price*29.8/100} <span> $ ${element.product_price}</span></div>
//           <a href="#" class="btn">add to cart</a>
//           <div class="product-card-buttons">
//           <a class="product-anch btn-info btn" href="/products/edit_product/${element.product_unique_id}">Edit</a>
//           <a class="product-anch btn-danger btn" data-action="click->product-owner#delete" data-product-owner-id-param=${element.product_unique_id} >Delete</a>
//           </div>
//       </div>
     
//   </div>
// `
// }

// search_box(){
//   search_text = this.searchTextTarget.value

//   if(search_text !=""){
//   this.serachDataTarget.innerHTML            =   " "
//   load_count                              =   0

//   this.searchErrorTarget.style.display =    "none"
//   this.product_gallery()
//   }
//   else{
//     this.searchErrorTarget.style.display =    "block"
//   }
 

search_box(){
      
  search_text = this.searchTextTarget.value

  // this.contentTarget.innerHTML          =   ""
  this.product_gallery(search_text)

}

delete(data) {

  console.log(data.params.id)

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


}
