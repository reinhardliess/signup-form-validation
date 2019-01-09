# JavaScript Techdegree Project #3: Interactive Form

A live version of this project can be found [here](https://rliess.github.io/js-techdegree-project3/).

The goal of this project was to enhance to enhance an interactive registration form for a fictional conference called "FullStack Conference".

## Basic Project requirements

* Utilize the popular JavaScript library [jQuery](http://http://jquery.com/) for coding this project
* Validate user input and provide helpful error messages when the user enters invalid information into the form fields. 
* When the form loads the focus should be set on the first form field("Name").

### Job Role Section

* Add a text input field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu. This input field must be also added to the HTML in case JavaScript is switched off or unavailable
 
### T-Shirt Info Section

* For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu. 
* If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold." 
* If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey." 
* When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.

### ”Register for Activities” section

* Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available. 
* When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled. 
* As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.

### "Payment Info" section

* The credit card payment option is selected by default.
* Display payment sections based on the payment option chosen in the select menu. 
The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
* When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden. 
* When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.

## Form Validation

If any of the following validation errors exist, prevent the user from submitting the form:

* Name field can't be blank.
* Email field must be a validly formatted e-mail address.
* User must select at least one checkbox under the "Register for Activities" section of the form.
* If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a three-digit CVV value before the form can be submitted.
    * Credit Card field should only accept a number between 13 and 16 digits.
    * The Zip Code field should accept a 5-digit number.
    * The CVV should only accept a number that is exactly 3 digits long.

The following fields should have some obvious form of an error indication:

* Name field
* Email field
* Register for Activities checkboxes (at least one must be selected)
* Credit Card number (Only if Credit Card payment method is selected)
* Zip Code (Only if Credit Card payment method is selected)
* CVV (Only if Credit Card payment method is selected)

### Form Validation without JavaScript - Use progressive enhancement

* The user should still have access to all form fields and payment information if JS is switched off or unavailable. 
* The “Other” text field under the "Job Role" section should be visible. All information for Bitcoin, PayPal or Credit Card payments should be visible.


## Exceeds Grade Project Requirements

* Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu in the T-Shirt section of the form.
* Program at least one of your error messages so that more information is provided depending on the error.
* Program your form so that it provides a real-time validation error message for at least one text input field.


### Some Additional remarks

* style.css: additional styles are marked with ´(RL)´
* 
* 
* 
* 
    
    
### Some additional coding conventions

* Constants are all uppercase, spaced out with underscores for readability
* In for-loop conditions, the length of DOM collections is cached in a variable.
* Additional spaces around nested function calls.
