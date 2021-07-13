//__________________________________________________GIVEN CODE________________________________________________
// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input 
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//_________________________________________________WRITTEN CODE________________________________________________
function generatePassword() {
  // Beginning prompts for password option selection with input error checking, these will be passed to another function to construct the new password
  alert ("To generate a new password, follow the prompts and choose your options. Click OK to continue.");

  passwordLength = prompt ("Choose a password length between 8 and 128 characters: ", 20);
  // Checking if entry is a number 
    while (isNaN(passwordLength)){
      passwordLength = prompt ("Please use a numerical value between 8 and 128: ", 20);
    } 
    // Round off any decimals
    passwordLength = Math.round(passwordLength);
    // Checking if entry has enough or too many characters
    while (passwordLength < 8 || passwordLength > 128) {
      passwordLength = prompt ("Please choose a password between 8 and 128 characters: ", 20);
    }
    alert ("The password length will be " + passwordLength);

  // Begin selecting password character options
  useLower = prompt("Should lower case letters be used in your new password? (Yes or No) ", "Yes");
    // Checking that entry is yes, Yes or no, No. Also that it is boolean
    useLower = verifyPrompt(useLower);
    if (useLower === true) {
      alert("Lower case letters will be included");
    } else if (useLower === false) {
      alert("Lower case letters will NOT be included");
    }

  useUpper = prompt("Should upper case letters be used in your new password? ", "Yes");
    useUpper = verifyPrompt(useUpper);
    if (useUpper === true) {
      alert("Upper case letters will be included");
    } else if (useUpper === false) {
      alert("Upper case letters will NOT be included");
    }

  useNumber = prompt("Should numbers be used in your new password? ", "Yes");
    useNumber = verifyPrompt(useNumber);
    if (useNumber === true) {
      alert("Numbers will be included");
    } else if (useNumber === false) {
      alert("Numbers will NOT be included");
    }

  useSymbol = prompt("Should symbols be used in your new password? \nThese include: ! @ # $ % ^ & * ( ) { } [ ] < > , . / ", "Yes");
    useSymbol = verifyPrompt(useSymbol);
    if (useSymbol === true) {
      alert("Symbols will be included");
    } else if (useSymbol === false) {
      alert("Symbols will NOT be included");
    }
  console.log("Lowers? " + useLower + " Uppers? " + useUpper + " Numbers? " + useNumber + " Symbols? " + useSymbol);

  const returnPassword = buildPassword(useLower, useUpper, useNumber, useSymbol, passwordLength);
  return returnPassword;
}
// Object for calling the random character generators when building the new password
const randomFunc = {
  lower: getRandomLowerLetter,
  upper: getRandomUpperLetter,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function buildPassword (lower, upper, number, symbol, length) {
  // Building password after password character options have been selected
  // Initialize password variable
  // Filter out un-requested character types
  // Loop over the password length that was selected
  // Add final password to the password variable and return

  let newPassword = '';

  const countTypes = lower + upper + number + symbol;

  console.log("Types counted: ", countTypes);
  //Making an array signaling each type of character to be used in the newpassword
  //Then filters through each item in the array to create a new array
  //That new filtered array is filled with items from the old array if they are true
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter //Brackets around each array item allow it's value to be returned
  (
    item => Object.values(item)[0] //Object.values loops over each of the previous array's items and enumerates it's value into a new array
  );

  console.log("Types array: ", typesArr);
  //If no character options are selected, return an empty newpassword
  if (countTypes === 0){
    return newPassword;
  }
  //Iterating through the chosen password length, each iteration moves through the typesArr of remaining character types
  //Each iteration also cycles through the character types that are available with "+= countTypes"
  for (let i = 0; i < length; i += countTypes) { 
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]; //Select a type of character for the iteration based on the typesArr's available options
      console.log("funcName: ", funcName); //Log the type of character selected to verify functionality
      newPassword += randomFunc[funcName](); //Concatenate the newly selected character to the newpassword string by using the randomFunc object and calling the selected property
    })
  }
  console.log(newPassword);
  return newPassword;
}

// Defining functions for getting randomly selected letters, numbers or symbols if selected in password generation prompts
// Each random number is multipled by the bredth of it's category then shifted with the addition to where that category sits in the charmap

function getRandomLowerLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  // Definied list of symbols that don't break the code
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//Function for verifying that answers to option prompts are yes or no, turning them into true or false
function verifyPrompt(promptInput) {
  verifiedPrompt = promptInput
  if (verifiedPrompt == "yes" || verifiedPrompt == "Yes") {
    verifiedPrompt = true;
  } else if (verifiedPrompt == "no" || verifiedPrompt == "No") {
    verifiedPrompt = false;
  }
  while (verifiedPrompt !== true && verifiedPrompt !== false) {
    verifiedPrompt = prompt('Please choose "Yes" or "No" ', "Yes");
    if (verifiedPrompt == "yes" || verifiedPrompt == "Yes") {
      verifiedPrompt = true;
    } else if (verifiedPrompt == "no" || verifiedPrompt == "No") {
      verifiedPrompt = false;
    }
  }
  return verifiedPrompt;
}