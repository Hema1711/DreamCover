import { Controller } from "@hotwired/stimulus"
var detail = ""
// Connects to data-controller="location"
export default class extends Controller {
  connect() {
    console.log("Location JS")
    // detail = this.get_user_location()
    // this.currency_converter(detail)
  }

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



  // currency_converter(detail){
  //   console.log("Converter")
  //   // console.log(location.countryCode)
  //   var currency = "INR"
  //   fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
  //   .then(response => {
  //         return response.json();
  //   })

  //   .then(data => {
  //     console.log(data)
    
  //  });
  // }


   
}
