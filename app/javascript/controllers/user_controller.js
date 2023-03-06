import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="user"
export default class extends Controller {

  static targets=[ "first_name","email","last_name","phone_number",
                  "state","city","country","zipcode", "username_sign_in", "password_sign_in", 
                "username_sign_up" , "password_sign_up", "phonenumber_sign_up","notice_message"]

  connect() {
    console.log("Connected! User")
    this.get_user_location()
    var notice = this.notice_messageTarget
    setTimeout(function(){notice.remove()},3000)
  }

  create_user(){

    var email = this.username_sign_upTarget.value
    var password = this.password_sign_upTarget.value
    var phone_number = this.phonenumber_sign_upTarget.value
    console.log("create_user Detail")
    console.log("email" + email)
    console.log("password" + password)
    console.log("phone_number" + phone_number)

    fetch("/users/create_user", {
      method:"POST",
      body: JSON.stringify({
          "email_id"    :   email,
          "password"    :  password,
          "phone_number" : phone_number 
      }),

      headers: { "content-type": "application/json; charset=UTF-8" }
    })


  }

  verify_user(){
    var email = this.username_sign_inTarget.value
    var password = this.password_sign_inTarget.value
    console.log("verify_user")
    console.log("email" + email)
    console.log("password" + password)

    fetch("/users/verify_user", {
      method:"POST",
      body: JSON.stringify({
        "email_id"    :   email,
        "password"    :  password
      }),

      headers: { "content-type": "application/json; charset=UTF-8" }
    })

  }

  update_user(){

    email_id = document.getElementById("email")
    console.log(email_id)
    fetch("/users/update_user", {
      method:"PUT",
      body: JSON.stringify({
          "email_id"    :   email_id
      }),

      headers: { "content-type": "application/json; charset=UTF-8" }
    })
  }


  get_user_location(){
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      document.getElementById("demo").innerHTML =
      "Geolocation is not supported by this browser.";
    }
    
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.logitude;
    
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude-${lat}&longitude-${lon}& localityLanguage-en`
    
      fetch (geoApiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // this.detail_code(data) 
        return data
      
      })
    } 
  }
  
  country_validation(){
    console.log("Country Validation")
    console.log(this.countryTarget.value)
    fetch("/get_states/" + this.countryTarget.value)
        .then(result=> result.json())
        .then(data => {
          console.log("data")
          console.log(data)

          // data = json.parse(data)

          // console.log("data 2")
          // console.log(data)
            var html ='<option>---Select a state---</option>'

            // html = html + this.get_states(state)

            data.forEach(state => {

              html = html + this.get_states(state)

            });
  
          this.stateTarget.innerHTML                           =     html
        })
  }


  get_states(state){

    return `
      <option >${state}</option>
    `
  }



  state_validation(){
    console.log("State Validation")
    if((this.stateTarget.value == "")||(this.stateTarget.value =="---Select a State---")){

      this.state_errorTarget.style.display                    =     'block'
      return false
    }

    else{

      this.state_errorTarget.style.display                    =     'none'
      fetch('/get_cities/' + this.stateTarget.value)
      .then(result=> result.json())
      .then(data => {
        var html='<option>---Select a City---</option>'

        data.forEach(city => {
          html = html + this.get_cities(city)
        });
        this.cityTarget.innerHTML                             =     html
      })
      return true

    }

  }

  get_cities(city){
    console.log("City")

    return `
      <option value=${city.id}>${city.city_name}</option>
    `

  }

   city_validation(){
    console.log("city_validation")
    if((this.cityTarget.value == "")||(this.cityTarget.value =="---Select a City---")){

      this.city_errorTarget.style.display                     =     'block'
      return false
    }

    else{
      console.log(this.cityTarget.value)
      this.city_errorTarget.style.display                     =     'none'
      return true
    }

  }

  first_name_validation(){
    console.log("First Name")
  }


  last_name_validation(){
    console.log("Last Name")
  }

  phone_validation(){
    console.log("Phone")
  }


  email_validation(){
    console.log("Email")
  }

  zipcode_validation(){
    console.log("Zipcode")
  }

}
