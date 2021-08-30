let myForm = document.getElementById('myForm');
let numInput = document.getElementById('number_input');
let errorDiv = document.getElementById('error');
let frmLabel = document.getElementById('formLabel');
ul = document.getElementById("results");


if (myForm) {
  myForm.addEventListener('submit', (event) => {
    number = parseInt(numInput.value)
    result = fib(numInput.value)
    isPrime = prime(result)
    let li = document.createElement('li');

    event.preventDefault();
        
    if (typeof number !== "number") {
      window.alert("Input Value of wrong type")
    }

    if (!number && number !== 0 ){
      window.alert("Undefined Input")
    }

    else if (number < 1 && number == !undefined){
      window.alert("Input less than 1")
      str = "The Fibonacci of " + numInput.value + " is 0."
      li.className="not-prime"
      li.setAttribute('id',numInput.value)
      li.appendChild(document.createTextNode(str))
      ul.appendChild(li)
    }

    else if(isPrime == true) {
      str = "The Fibonacci of " + numInput.value + " is " + result + "."
      li.className="is-prime"
      li.setAttribute('id',numInput.value)
      li.appendChild(document.createTextNode(str))
      ul.appendChild(li)
    }
    else{
      str = "The Fibonacci of " + numInput.value + " is " + result + "."
      li.className="not-prime"
      li.setAttribute('id',numInput.value)
      li.appendChild(document.createTextNode(str))
      ul.appendChild(li)
    }

  });
}

function fib(number) {

  fir = 0
  sec = 1
  temp = 1

  for( i = 2; i <= number; i++) {
      temp = fir + sec
      fir = sec
      sec = temp
  }
  return temp
}


function prime(number) {

  if (number == 0 || number === 1) {
    return false
  }
  else if(number === 2) {
    return true
  }
  else{
    for(i=2; i < number; i++){
      if(number % i === 0){
        return false
      }
    } return true
  }

}