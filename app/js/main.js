// Example starter JavaScript for disabling form submissions if there are invalid fields

$(document).ready(function() {   

    // loads the basic info
    //$( "#main-content" ).load( "your-info.html" );

    let isVisibleComplements = false;

    // initializing elements 
    $('#first-step-li').addClass('active');
    $('#your-order-container').hide();
    $('#billing-info-container').hide();
    $('#payment-method-container').hide();        
    $('#pizza-size-cost').hide();
    $('#select-sause-div').hide();   
    $('#select-cheese-div').hide();       
    $('#topping-options-first-group').hide();
    $('#topping-options-second-group').hide();
    $('#add-to-cart-btn').hide();    
    $('#order-done-modal').hide();      
    $('#wrong-code-modal').hide();    
    $('#cart-empty-modal').hide();      
            
    function showPizzaSelections() {
      if (!isVisibleComplements) {
        $('#pizza-size-cost').show();
        $('#select-sause-div').show();   
        $('#select-cheese-div').show();       
        $('#topping-options-first-group').show();
        $('#topping-options-second-group').show();
        $('#add-to-cart-btn').show();
      }

      isVisibleComplements = true;
    }
    
    $('#bt-redeem').on('click', function(){                  
      
      if ($('#promo-code').val() !== "SDCCD" ) {
        $('#wrong-code-modal').modal('show');
        return;
      }

      $('#myList li:nth-last-child(2)').after(`<li class="list-group-item d-flex justify-content-between bg-light" id="promo-code">
                                                  <div class="text-success">
                                                    <h6 class="my-0">Promo code</h6>
                                                    <small>SDCCD</small>
                                                  </div>
                                                  <span class="text-success">-$5</span>
                                                  </li>`);

      totalPrice = totalPrice - 5;
      $('#total').text(totalPrice.toFixed(2));
      $('#redeem-form').hide();
    })

    var totalPrice = 0.0;
    var products = [];
    
    $('#add-to-cart-btn').on('click', function(){      
            
      if (!orderValidation()) return;
      
      const doughOption = $("input[name='groupOfSizeCostRadios']:checked").val();
      let productName;

      switch (doughOption) {
        case "hand-tossed":            
          productName = 'Hand Tossed Pizza'; 
          //$('#product-name').text('Hand Tossed Pizza');
          break;
        case "thin-crust":                          
          productName = 'Thin Crust Pizza';
          //$('#product-name').text('Thin Crust Pizza');
          break;
        case "new-york":                
          productName = 'New York Pizza';
          //$('#product-name').text('New York Pizza');
          break;
        case "gluten-free":                
          productName = 'Gluten Free Pizza';
          //$('#product-name').text('Gluten Free Pizza');
      }            
      
      const pizzaSizeCost = $( "#select-pizza-size-cost option:selected").text();
      const pizzaSize = pizzaSizeCost.split(':')[0];
      const pizzaCost = pizzaSizeCost.split(':')[1];
        
      const cheese = $('#select-cheese option:selected').text();
      const cheeseType = cheese.split(':')[0];
      const cheesePrice = cheese.split(':')[1];

      const sause = $('#select-sause option:selected').text();      
      const sauseType = sause.split(':')[0];
      const sausePrice = sause.split(':')[1];
      
      var toppings = [];
      $.each($("input[name='toppingsRadioGroup']:checked"), function(){
        toppings.push($(this).val());                
      });
      
      products.push(productName);

      let priceValue = parseFloat(pizzaCost.replace('$', ''));
      totalPrice = totalPrice + priceValue;
      
      $('#badge').text(products.length);
      $('#toast').toast('show');      
      $('#total').text(totalPrice.toFixed(2));

      if (products.length === 1) {                        
        $('#product-name').text(productName);
        $('#product-description').html('<b>Size:</b> ' + pizzaSize);
        $('#cheese-option').html('<b>Cheese: </b>' + cheeseType);
        $('#sause-option').html('<b>Sause: </b>' + sauseType);
        $('#product-price').text(pizzaCost);

        if (toppings.length > 0 ) {
          $('#topping-option').html('<b>Toppings:</b> ' + toppings.join(", "));
        } else {
          $('#topping-option').html('');
        }

        return;
      }
                  
      $('#myList').prepend(`<li class="list-group-item d-flex justify-content-between lh-condensed">
                              <div>
                                <h6 class="my-0" id="product-name">${productName}</h6>
                                <small class="text-muted" id="product-description">${pizzaSize}</small><br />
                                <small class="text-muted" id="cheese-option">${cheeseType}</small><br />
                                <small class="text-muted" id="sause-option">${sauseType}</small><br />
                                <small class="text-muted" id="topping-option">${toppings.join(", ")}</small><br />
                              </div>
                                <span class="text-muted" id="product-price">${pizzaCost}</span>
                            </li>`);

      
      
    });

    $('#full-name-billing-info').on('blur', function () {
      fullNameValidation('#full-name-billing-info');
    });

    $('#address-type-billing-info').on('blur', function () {
      addressTypeValidation("#address-type-billing-info");
    });

    $('#address-billing-info').on('blur', function () {
      addressValidation("#address-billing-info");
    });

    $('#state-billing-info').on('blur', function () {
      stateValidation('#state-billing-info');
    });

    $('#city-billing-info').on('blur', function () {
      cityValidation('#city-billing-info');
    });

    $('#zip-billing-info').on('blur', function () {
      zipValidation('#zip-billing-info');
    });


    // Zip lengh block, only 5 characters allowed
    $('#zip-billing-info').on('keypress', function(e) {
      let tval = $('#zip-billing-info').val();
      let tlength = tval.length;
      let maxLength = 5;      
      let remain = parseInt(maxLength - tlength);
      
      if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#zip-billing-info').val((tval).substring(0, tlength - 1))
      }
    });
    
    // State lengh block, only 2 characters allowed
    $('#state-billing-info').on('keypress', function(e) {
      let tval = $('#state-billing-info').val();
      let tlength = tval.length;
      let maxLength = 2;      
      let remain = parseInt(maxLength - tlength);
      
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        e.preventDefault();
      }

      if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#state-billing-info').val((tval).substring(0, tlength - 1))
      }
    })
    
    function orderValidation() {
      const doughOption = $("input[name='groupOfSizeCostRadios']:checked").val();      
      const pizzaSizeCost = $( "#select-pizza-size-cost option:selected").val();
      const cheese = $('#select-cheese option:selected').val();
      const sause = $('#select-sause option:selected').val()

      let isValid = true;

      if (!doughOption) {
        $('#invalid-dough').show();
        $('#invalid-dough').addClass('is-invalid');
        return false;        
      }

      if (pizzaSizeCost === "Choose") {
        $('#select-pizza-size-cost').next().show();
        $('#select-pizza-size-cost').addClass('is-invalid');
        isValid = false;
      }

      if (cheese  === "Choose") {
        $('#select-cheese').next().show();
        $('#select-cheese').addClass('is-invalid');
        isValid = false;
      }    

      if (sause  === "Choose") {
        $('#select-sause').next().show();
        $('#select-sause').addClass('is-invalid');
        isValid = false;
      }      

      return isValid ? true : false;      
    }

    $('#select-pizza-size-cost').on('change', function() {
      if ($('#select-pizza-size-cost').val() !== "Choose") {        
        $('#select-pizza-size-cost').removeClass('is-invalid');
        $('#select-pizza-size-cost').addClass('is-valid');
        $('#select-pizza-size-cost').next().hide();
        return;
      } 
      
      $('#select-pizza-size-cost').removeClass('is-valid');
      $('#select-pizza-size-cost').addClass('is-invalid');
      $('#select-pizza-size-cost').next().show();      
    });

    $('#select-cheese').on('change', function() {            
      if ($('#select-cheese').val() !== "Choose") {        
        $('#select-cheese').removeClass('is-invalid');
        $('#select-cheese').addClass('is-valid');
        $('#select-cheese').next().hide();
        return;
      } 
      
      $('#select-cheese').removeClass('is-valid');
      $('#select-cheese').addClass('is-invalid');
      $('#select-cheese').next().show();      
    });

    $('#select-sause').on('change', function() {            
      if ($('#select-sause').val() !== "Choose") {        
        $('#select-sause').removeClass('is-invalid');
        $('#select-sause').addClass('is-valid');
        $('#select-sause').next().hide();
        return;
      } 
      
      $('#select-sause').removeClass('is-valid');
      $('#select-sause').addClass('is-invalid');
      $('#select-sause').next().show();      
    });

    let pizzaSizeAndCost = {
      'hand-tossed': [{
        'size': 'Small', 
        'price': 9.99
      },{
        'size': 'Medium', 
        'price': 12.99
      },{
        'size': 'Large', 
        'price': 14.99        
      }],        
      'thin-crust': [{
        'size': 'Medium', 
        'price': 11.99
      },{
        'size': 'Large', 
        'price': 13.99
      }],
      'new-york': [{
        'size': 'Large', 
        'price': 16.99
      },{
        'size': 'Extra Large', 
        'price': 19.99
      }],
      'gluten-free': [{
        'size': 'Small', 
        'price': 10.99
      }]
    }

    $("input[name='groupOfSizeCostRadios']").click(function(){
       
      showPizzaSelections();

      $('#invalid-dough').hide();
      $('#invalid-dough').removeClass('is-invalid');

      const doughOption = $("input[name='groupOfSizeCostRadios']:checked").val();      
      $('#select-pizza-size-cost').children('option:not(:first)').remove();

      switch (doughOption) {
        case "hand-tossed":            
          for (let index = 0; index < pizzaSizeAndCost['hand-tossed'].length; index++) {            
            $("#select-pizza-size-cost").append("<option>"+ pizzaSizeAndCost['hand-tossed'][index].size + ': $' + pizzaSizeAndCost['hand-tossed'][index].price +"</option>"); 
          }            
          break;
        case "thin-crust":                          
          for (let index = 0; index < pizzaSizeAndCost['thin-crust'].length; index++) {            
            $("#select-pizza-size-cost").append("<option>"+ pizzaSizeAndCost['thin-crust'][index].size + ': $' + pizzaSizeAndCost['thin-crust'][index].price +"</option>"); 
          }            
          break;
        case "new-york":                
          for (let index = 0; index < pizzaSizeAndCost['new-york'].length; index++) {            
            $("#select-pizza-size-cost").append("<option>"+ pizzaSizeAndCost['new-york'][index].size + ': $' + pizzaSizeAndCost['new-york'][index].price +"</option>"); 
          }            
          break;
        case "gluten-free":                
          for (let index = 0; index < pizzaSizeAndCost['gluten-free'].length; index++) {            
            $("#select-pizza-size-cost").append("<option>"+ pizzaSizeAndCost['gluten-free'][index].size + ': $' + pizzaSizeAndCost['gluten-free'][index].price +"</option>"); 
          }            
        }
                  
    });
  
    $('#same-address').click(function() {      
      $('#full-name-billing-info').val('');
      $('#zip-billing-info').val('');
      $('#city-billing-info').val('');
      $('#state-billing-info').val('');
      $('#address2-billing-info').val('');
      $('#address-type-billing-info').val('');
      $('#address-billing-info').val('');        

      if($("#same-address").is(':checked')) {        
        $('#full-name-billing-info').val($('#name').val());
        $('#zip-billing-info').val($('#zip').val());
        $('#city-billing-info').val($('#city').val());
        $('#state-billing-info').val($('#state').val());
        $('#address2-billing-info').val($('#address2').val());
        $('#address-type-billing-info').val($('#address-type').val());
        $('#address-billing-info').val($('#address').val());        
      }            
    });    
    
    $('#next-btn-payment-method').on('click', function() {

      fullNameValidation('#cc-name');
      ccNumberValidation();
      ccvvValidation()

      if (fullNameValidation('#cc-name') &&          
          ccNumberValidation() &&
          ccvvValidation()) {       
            if (products.length === 0) {
              $('#cart-empty-modal').modal('show');
              return;
            }
            
            $('#order-done-modal').modal('show');         
      }   

    });
    
    $('#order-done-modal-ok').on('click', function() {      
      window.location.reload();
    });

    $('#wrong-code-modal-ok').on('click', function() {      
      $('#wrong-code-modal').modal('hide');
    });

    $('#cart-empty-modal-ok').on('click', function() {      
      $('#cart-empty-modal').modal('hide');
    });
    

    $('#next-btn-your-info').on('click', function() {
      
      // making sure the user can move forward to the next step      
      emailValidation();
      phoneValidation();
      fullNameValidation('#name');
      addressTypeValidation("#address-type");
      addressValidation('#address');
      cityValidation('#city');
      zipValidation('#zip');
      stateValidation('#state');

      if (fullNameValidation('#name') &&
          emailValidation() &&
          phoneValidation() &&
          addressTypeValidation("#address-type") &&
          addressValidation('#address') &&
          cityValidation('#city') &&
          zipValidation('#zip') &&
          stateValidation('#state')) {
            activateStep2();
            $('#your-info-container').hide();
            $('#your-order-container').show();            
      }            
    });

    $('#next-btn-billing-info').on('click', function() {            
      
      fullNameValidation('#full-name-billing-info');
      addressTypeValidation('#address-type-billing-info');
      addressValidation('#address-billing-info');      
      cityValidation('#city-billing-info');
      zipValidation('#zip-billing-info'); 
      stateValidation('#state-billing-info'); 

      if (fullNameValidation('#full-name-billing-info') &&
          addressTypeValidation('#address-type-billing-info') &&
          addressValidation('#address-billing-info') &&
          cityValidation('#city-billing-info') &&
          zipValidation('#zip-billing-info') &&
          stateValidation('#state-billing-info')) {
            activateStep4();
            $('#billing-info-container').hide();
            $('#payment-method-container').show();      
      }           

    });

    function inactivateAllSteps() {
      $('#first-step-li').removeClass('active');
      $('#second-step-li').removeClass('active');
      $('#third-step-li').removeClass('active');
      $('#fourth-step-li').removeClass('active');
    }

    function activateStep1() {
      inactivateAllSteps();
      $('#first-step-li').addClass('active');      
    }

    function activateStep2() {
      inactivateAllSteps();
      $('#second-step-li').addClass('active');      
    }

    function activateStep3() {
      inactivateAllSteps();
      $('#third-step-li').addClass('active');            
    }

    function activateStep4() {
      inactivateAllSteps();
      $('#fourth-step-li').addClass('active');      
    }

    $('#next-btn-your-order').on('click', function() {            
      if (!orderValidation()) return;
                  
      activateStep3();            
      $('#your-order-container').hide();
      $('#billing-info-container').show();      
    });

    function GetCardType(number) {
      // visa
      var re = new RegExp("^4");
      if (number.match(re) != null) {
          return "Visa";
      }
      
      // Mastercard       
      // Updated for Mastercard 2017 BINs expansion
      if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
        return "Mastercard";
      }

      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null) {
        return "AMEX";
      }

      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null) {
        return "Discover";
      }

      // Diners
      re = new RegExp("^36");
      if (number.match(re) != null) {
        return "Diners";
      }

      // Diners - Carte Blanche
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null) {
        return "Diners - Carte Blanche";
      }

      // JCB
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null){
        return "JCB";
      }

      // Visa Electron
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null) {
        return "Visa Electron";
      }

      return "";
    }
    
    $('#back-btn-your-order').on('click', function(){ 
      activateStep1();
      $('#your-info-container').show();
      $('#your-order-container').hide();
    });

    $('#back-btn-billing-info').on('click', function(){       
      activateStep2();
      $('#your-order-container').show();
      $('#billing-info-container').hide();
    });

    $('#back-btn-payment-method').on('click', function(){       
      activateStep3();
      $('#billing-info-container').show();
      $('#payment-method-container').hide();
    });    

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')
    
    // Full name validation
    function fullNameValidation(selector) {            
      $(selector).next().hide();
      $(selector).removeClass('is-valid');
      $(selector).removeClass('is-invalid');
            
      const name = $(selector);      
      const regex = /^[A-Za-z]([-']?[A-Za-z]+)*( [A-Za-z]([-']?[A-Za-z]+)*)+$/;      
      const match = regex.test(name.val());
                        
      if (!match) {
         $(selector).next().show();
         $(selector).addClass('is-invalid');
         return false;
      } 
            
      $(selector).addClass('is-valid');
      return true;
    }
    
    $('#cc-name').on('blur', function() {
      fullNameValidation('#cc-name');
    });

    $('#cc-cvv').on('blur', function(){
      ccvvValidation();
    });

    function ccvvValidation() {
      $('#cc-cvv').next().hide();
      $('#cc-cvv').removeClass('is-valid');
      $('#cc-cvv').removeClass('is-invalid');
                              
      if (!$('#cc-cvv').val()) {
         $('#cc-cvv').next().show();
         $('#cc-cvv').addClass('is-invalid');
         return false;
      } 
            
      $('#cc-cvv').addClass('is-valid');
      return true;
    }

    function ccNumberValidation() {
      $('#cc-number').next().hide();
      $('#cc-number').removeClass('is-valid');
      $('#cc-number').removeClass('is-invalid');
                                    
      if (!$('#cc-number').val() || !GetCardType($('#cc-number').val())) {
         $('#cc-number').next().show();
         $('#cc-number').addClass('is-invalid');
         $('#cc-brand').text('');
         return false;
      } 
            
      $('#cc-number').addClass('is-valid');
      $('#cc-brand').text(GetCardType($('#cc-number').val()));
      
      return true;
    }

    $('#cc-number').on('blur', function() {
      ccNumberValidation();      
    });

    $('#name').on('blur', function () {
      fullNameValidation('#name');
    });
        
    // Email validation
    function emailValidation() {
      $('#email').next().hide();
      $('#email').removeClass('is-valid');
      $('#email').removeClass('is-invalid');
      
      const email = $('#email');      
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;      
      const match = regex.test(email.val());
                  
      
      if (!match) {
        $('#email').next().show();
        $('#email').addClass('is-invalid');
        return false;
      }         

      $('#email').addClass('is-valid');
      return true;
    }

    $('#email').on('blur', function () {
      emailValidation();
    });
        
    // Zip code validation
    function zipValidation(selector) {
      $(selector).next().hide();
      $(selector).removeClass('is-valid');
      $(selector).removeClass('is-invalid');
      
      const zip = $(selector);
      const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;      
      const match = regex.test(zip.val());
                        
      if (!match) {
        $(selector).next().show();
        $(selector).addClass('is-invalid');
        return false;
      }               

      $(selector).addClass('is-valid');
      return true;
    }

    $('#zip').on('blur', function () {
      zipValidation('#zip');
    });

    // City validation
    function cityValidation(selector) {
      $(selector).next().hide();
      $(selector).removeClass('is-valid');
      $(selector).removeClass('is-invalid');

      const address = $(selector);
      const regex = /^[a-zA-Z\s,.'-]{5,}$/; // number, letters and min length of 5 
      const match = regex.test(address.val());
                  
      if (!match) {
        $(selector).next().show();
        $(selector).addClass('is-invalid');
        return false;
      } 

      $(selector).addClass('is-valid');
      return true;
    }

    $('#city').on('blur', function () {
      cityValidation('#city');
    });

    // Zip lengh block, only 5 characters allowed
    $('#zip').on('keypress', function(e) {
      let tval = $('#zip').val();
      let tlength = tval.length;
      let maxLength = 5;      
      let remain = parseInt(maxLength - tlength);
      
      if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#zip').val((tval).substring(0, tlength - 1))
      }
    });

    // Phone number validation
    function phoneValidation() {
      $('#phone').next().hide();
      $('#phone').removeClass('is-valid');
      $('#phone').removeClass('is-invalid');
      
      const phone = $('#phone');
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const match = regex.test(phone.val());
                      
      if (!match) {
        $('#phone').next().show();
        $('#phone').addClass('is-invalid');
        return false;
      } 

      $('#phone').addClass('is-valid');
      return true;
    }

    $('#phone').on('blur', function () {
      phoneValidation();
    });

    // Phone lengh block, only 13 characters allowed
    $('#phone').on('keypress', function(e) {
      let tval = $('#phone').val();
      let tlength = tval.length;
      let maxLength = 14;      
      let remain = parseInt(maxLength - tlength);
      
      if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#phone').val((tval).substring(0, tlength - 1))
      }
    });

    // State validation
    function stateValidation(selector) {
      $(selector).next().hide();
      $(selector).removeClass('is-valid');
      $(selector).removeClass('is-invalid');
      
      const state = $(selector);
      const regex = /^[A-Za-z]{2}$/; // only letters and max length of 2
      const match = regex.test(state.val());
                  
      if (!match) {
        $(selector).next().show();
        $(selector).addClass('is-invalid');
        return false;
      } 

      $(selector).addClass('is-valid');
      return true;
    }

    $('#state').on('blur', function () {
      stateValidation('#state');
    });
    
    // State lengh block, only 2 characters allowed
    $('#state').on('keypress', function(e) {
      let tval = $('#state').val();
      let tlength = tval.length;
      let maxLength = 2;      
      let remain = parseInt(maxLength - tlength);
      
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        e.preventDefault();
      }

      if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#state').val((tval).substring(0, tlength - 1))
      }
    })
    
    // Loop over them and prevent submission
    /*
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        console.log("submit");
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
    */
    
    // Show 'Other' input if the user selects 'Other' or hide otherwise
    $('#address-type').on('change', function() {            
      $('#address-type').removeClass('is-valid');
      $('#address-type').removeClass('is-invalid');

      if ($('#address-type').val() === "Other") {
        $('#address-type-text').show();        
      } else {
        $('#address-type-text').hide();
      }

      if ($('#address-type').val() !== "Choose") {        
        $('#address-type').addClass('is-valid');
      }      
    });

    // Making sure the user selected a valid address type
    function addressTypeValidation(selector) {
      $(selector).next().hide();
      $(selector).removeClass('is-valid');
      $(selector).removeClass('is-invalid');
      
      if ($(selector).val() === "Choose") {
        $(selector).addClass('is-invalid');
        $(selector).next().show();
        return false;
      } 
      
      $(selector).addClass('is-valid');
      return true;     
    }

    $('#address-type').on('blur', function () {
      addressTypeValidation("#address-type");
    });

    // Address validation
    function addressValidation(selector) {
      $(selector).next().hide();
      $(selector).removeClass('is-valid');
      $(selector).removeClass('is-invalid');

      const address = $(selector);
      const regex = /^[a-zA-Z0-9\s,.'-]{10,}$/; // number, letters and min length of 10
      const match = regex.test(address.val());
                  
      if (!match) {
        $(selector).next().show();
        $(selector).addClass('is-invalid');
        return false;
      } 

      $(selector).addClass('is-valid');
      return true;
    }

    $('#address').on('blur', function () {
      addressValidation('#address');
    });

    // Handling step clicks
    $('ul > li > a').on('click', function (event) {     
      
      $('#your-info-container').hide();
      $('#your-order-container').hide();
      $('#billing-info-container').hide();
      $('#payment-method-container').hide();

      $('#first-step-li').removeClass('active');
      $('#second-step-li').removeClass('active');
      $('#third-step-li').removeClass('active');
      $('#fourth-step-li').removeClass('active');
            
      switch (event.currentTarget.id) {
        case "first-step":            
            $( '#your-info-container' ).show();
            $('#first-step-li').addClass('active');
            break;
        case "second-step":              
            $( '#your-order-container' ).show();
            $('#second-step-li').addClass('active');
            break;
        case "third-step":                
        $( '#billing-info-container' ).show();
            $('#third-step-li').addClass('active');
            break;
        case "fourth-step":                
            $( '#payment-method-container' ).show();
            $('#fourth-step-li').addClass('active');
        }
    })
   
});