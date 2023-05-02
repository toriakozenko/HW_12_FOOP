// Task 'Person Constructor'

// function Person(name, surname){
//   this.name = name;
//   this.surname = surname;

//   this.getFullName = function() {
//     if (this.fatherName) return `${this.name} ${this.surname} ${this.fatherName}`;
//     return `${this.name} ${this.surname}`
//   }
// }

// const a = new Person("Вася", "Пупкін");
// const b = new Person("Ганна", "Іванова");
// const c = new Person("Єлизавета", "Петрова");

// console.log(a.getFullName());
// a.fatherName = 'Іванович';
// console.log(b.getFullName());


// Task 'Person Prototype'
// function Person(name, surname){
//   this.name = name;
//   this.surname = surname;
// }

// Person.prototype.getFullName = function() {
//   if (this.fatherName) return `${this.name} ${this.surname} ${this.fatherName}`;
//   return `${this.name} ${this.surname}`
// }

// const a = new Person("Вася", "Пупкін");
// const b = new Person("Ганна", "Іванова");
// const c = new Person("Єлизавета", "Петрова");

// console.log(a.getFullName());
// a.fatherName = 'Іванович';
// console.log(b.getFullName());



// Task 'Password'
function Password(parent, open) {
  let isOpen = open;

  const input = document.createElement('input');
  input.placeholder = 'Password';
  parent.appendChild(input);

  const toggleButton = document.createElement('button');
  toggleButton.innerText = isOpen ? 'Hide' : 'Show';
  input.type = isOpen ? 'text' : 'password';
  toggleButton.type = 'button';
  parent.appendChild(toggleButton);

  function togglePasswordVisibility() {
    isOpen = !isOpen;
    input.type = isOpen ? 'text' : 'password';
    toggleButton.innerText = isOpen ? 'Hide' : 'Show';

    if (typeof this.onOpenChange === 'function') {
      this.onOpenChange(isOpen);
    }
  }

  toggleButton.addEventListener('click', togglePasswordVisibility.bind(this));

  input.addEventListener('input', () => {
    if (typeof this.onChange === 'function') {
      this.onChange(input.value);
    }
    this.setValue(input.value);
  });

  this.setValue = function(value) {
    input.value = value;
  };

  this.getValue = function() {
    return input.value;
  };

  this.setOpen = function(open) {
    if (isOpen !== open) {
      togglePasswordVisibility.call(this);
    }
  };

  this.getOpen = function() {
    return isOpen;
  };

  this.setStyle = function(style) {
    input.setAttribute('style', style);
  };
}

// let p = new Password(document.body, true);
// p.onChange = (data) => console.log(data);
// p.onOpenChange = (open) => console.log(open);
// p.setValue("qwerty");
// console.log(p.getValue());
// p.setOpen(false);
// console.log(p.getOpen());

// Task 'LoginForm'
// const loginContainer = document.getElementById('login-container');

// const login = document.createElement('input');
// login.placeholder = 'Login';
// login.type = 'text';
// login.oninput = () => handleButtonVisibility();
// loginContainer.appendChild(login);

// const password = new Password(loginContainer, true);
// password.onChange = (value) => handleButtonVisibility(value);

// const button = document.createElement('button');
// button.type = 'submit';
// button.innerText = 'Click';
// button.setAttribute('style', 'display: block');
// button.disabled = true;
// loginContainer.appendChild(button);

// function handleButtonVisibility(){
//   const loginValue = login.value;
//   const passwordValue = password.getValue();
 
//   if(loginValue === '' || passwordValue === '') button.disabled = true;

//   if(loginValue && passwordValue) button.disabled = false;
// }

// button.addEventListener('click', function(e){
//   e.preventDefault();
//   console.log('Login data successfully sent!');
//   login.value = '';
//   password.setValue('');
//   button.disabled = true;
// })



// Task 'LoginForm Constructor'
function LoginForm(parent){
  const form = document.createElement('form');


  const loginInput = document.createElement('input');
  loginInput.type = 'text';
  loginInput.placeholder = 'Login';
  loginInput.oninput = () => {
    this.setLoginValue(loginInput.value);
    this.handleButtonVisibility();
  }
  form.appendChild(loginInput);

  const passwordInput = new Password(form, false);
  passwordInput.onChange = (value) => this.handleButtonVisibility(value);

  const button = document.createElement('button');
  button.disabled = true;
  button.innerText = 'Log In';
  button.setAttribute('style', 'display: block');
  form.appendChild(button);

  parent.appendChild(form);

  this.getLoginValue = () => loginInput.value;
  this.setLoginValue = (value) => loginInput.value = value;
  this.setStyle = function(style) {
    loginInput.setAttribute('style', style);
  };

  this.handleButtonVisibility = function(){
    const loginValue = loginInput.value;
    const passwordValue = passwordInput.getValue();
    
    if(loginValue === '' || passwordValue === '') button.disabled = true;
  
    if(loginValue && passwordValue) button.disabled = false;
  }

  button.addEventListener('click', function(e){
    e.preventDefault();
    console.log('Login data successfully sent!');
    loginInput.value = '';
    passwordInput.setValue('');
    button.disabled = true;
  })
}

// const container = document.getElementById('customForm');
// const customLoginForm = new LoginForm(container);




// Task 'Password Verify'
// const passwordsContainer = document.getElementById("pass-container");

// const password = new Password(passwordsContainer, false);
// const confirmPassword = new Password(passwordsContainer, false);

// const borderCorrectStyle = 'border: 1px solid black';
// const borderIncorrectStyle = 'border: 1px solid red';

// password.onChange = (value) => {
//   value !== confirmPassword.getValue() ? 
//   confirmPassword.setStyle(borderIncorrectStyle) :
//   confirmPassword.setStyle(borderCorrectStyle);
// };

// password.onOpenChange = (isOpen) => {
//   if (isOpen) {
//     return confirmPassword.getOpen() === true ? confirmPassword.setOpen(false) : null;
//   }
//   return confirmPassword.getOpen() === false ? confirmPassword.setOpen(true) : null;
// };

// confirmPassword.onChange = (value) => {
//   value !== password.getValue() ? 
//   confirmPassword.setStyle(borderIncorrectStyle) :
//   confirmPassword.setStyle(borderCorrectStyle);
// };

// confirmPassword.onOpenChange = (isOpen) => {
//   if (isOpen) {
//     return password.getOpen() === true ? password.setOpen(false) : null;
//   } 
//   return password.getOpen() === false ? password.setOpen(true) : null;
// };