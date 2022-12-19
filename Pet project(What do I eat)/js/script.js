window.onload = documentReady;


function documentReady() {


  //main 1. Refrigerator


  var button = document.getElementById("enter");
  var input = document.getElementById("input");
  var ul = document.querySelector("ul");
  var reset = document.getElementById("empty");
  var stock = document.getElementById("stock");
  var recipe = document.querySelectorAll(".r");
  var main3 = document.getElementById("ma3");
  var main4 = document.getElementById("ma4");
  var shoppinglist_ul = document.getElementById("shoppinglist_ul");
  var ma1_hidden = document.getElementById("ma1_hidden");
  var cookitem = document.getElementById("cookitem");
  var needitem = document.getElementById("needitem");
  var lackfood = document.getElementById("lackfood");




  var RefrigeArray = localStorage.getItem('food');

  if (RefrigeArray == null) {

    RefrigeArray = [];

  } else {

    RefrigeArray = JSON.parse(RefrigeArray);

  }
  //bring saved data from local storage
  //if refrigearray is null set it to empty array
  //else bring it as object.




  function removeParentNode(e) {
    var target = e.target;
    target.removeEventListener("click", removeParentNode);
    target.parentNode.remove();
    //delete targeted ingredient from the list when it clicked by deleting parent node.
    //This is for the delete button next to ingredient in the list.

    console.log(target.parentNode.innerText) // this shows inner text of the targeted parent node. will be shown as the ingredient + 'x' 

    for (var i = 0; i < RefrigeArray.length; i++) {
      if (RefrigeArray[i] === target.parentNode.innerText.slice(0, -1)) {
        RefrigeArray.splice(i, 1);
      }
    }
    //when delete button is clicked, find the text next to delete button from the refrige array and delete it from the array.
    //This is for the calculation for main 3,4

    console.log(RefrigeArray);
    var makeitstring = JSON.stringify(RefrigeArray);
    window.localStorage.setItem('food', makeitstring);
    stock.innerText = localStorage.getItem("food");
    //refreshing RefrigeArray when the delete function called
  }


  // for button key click
  button.addEventListener("click", function () {

    if (input.value.length > 0) //prevent 0 value input
    {
      var li = document.createElement("li"); // create li
      li.appendChild(document.createTextNode(input.value));// input value
      RefrigeArray.push(input.value);//for the calculation for main 3,4
      console.log(RefrigeArray);
      ul.appendChild(li);//add li under ul

      var deleteBtn = document.createElement("button");
      deleteBtn.appendChild(document.createTextNode("X"));
      li.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", removeParentNode);
      input.value = ""; //reset

      console.log(RefrigeArray)
      var makeitstring = JSON.stringify(RefrigeArray);
      localStorage.setItem('food', makeitstring);
      //save to local storage
      stock.innerText = localStorage.getItem("food");
      //get local storage
    }
  })

  // for enter key press
  input.addEventListener("keypress", function () {
    if (input.value.length > 0 && event.keyCode === 13) //prevent 0 value input and enter key function added
    {
      var li = document.createElement("li"); // create li
      li.appendChild(document.createTextNode(input.value));// input value
      RefrigeArray.push(input.value);//for the calculation main 3,4
      ul.appendChild(li);//add li under ul

      var deleteBtn = document.createElement("button");
      deleteBtn.appendChild(document.createTextNode("X"));
      li.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", removeParentNode);
      input.value = ""; //reset

      console.log(RefrigeArray)
      makeitstring = JSON.stringify(RefrigeArray);
      window.localStorage.setItem('food', makeitstring);
      //save to local storage
      stock.innerText = localStorage.getItem("food");

    }
  })

  stock.innerText = localStorage.getItem("food");
  //printing lists of food in local storage


  reset.addEventListener("click", function () {
    //for empty button 

    if (RefrigeArray === !null) {
      stock.innerText = localStorage.removeItem("food")
      RefrigeArray = [];
    }
    else {
      stock.innerText = "Nothing"
      RefrigeArray = [];
      ul.innerHTML = "";
    }


  });
  //  console.log(RefrigeArray);




  //main 2. Recipe


  for (var i = 0; i < recipe.length; i++) {
    window['r' + i] = [];
  }
  //create empty arrays for recipes and save those to variables



  for (var i = 0; i < recipe.length; i++) {
    for (var j = 0; j < recipe[i].children.length; j++) {
      window['r' + i].push(recipe[i].children[j].innerText);
    }
  }
  // save ingredients to each recipe array 
  //
  // console.log(recipe[0].children[0]);




  //main 3. what do I eat today?

  for (var i = 0; i < recipe.length; i++) {
    window['c' + i] = 0;
  }
  //create empty arrays for compared recipes and save those to variables


  // for main3 button key click
  main3.addEventListener("click", function () {

    // this function compares every ingredients in the refigearray with all ingredients in each recipes 
    //if those two are matching, count up in the each c array.


    for (var i = 0; i < RefrigeArray.length; i++) {
      for (var r = 0; r < recipe.length; r++) {
        for (var j = 0; j < recipe[r].children.length; j++) {
          //console.log(RefrigeArray[i].toLowerCase())
          // console.log(recipe[r].children[j].innerText.toLowerCase())

          if (RefrigeArray[i].toLowerCase() === recipe[r].children[j].innerText.toLowerCase()) {

            window['c' + r]++;

          };

        };
      };
    };

    //Show mostly matching recipe

    var temp2 = 0
    var temp = []
    for (var r = 0; r < recipe.length; r++) {

      temp.push(window['c' + r])
    }
    console.log(Math.max(...temp))

    for (var a = 0; a < recipe.length; a++) {
      if (window['c' + a] === Math.max(...temp)) {


        wditid.appendChild(recipe[a].parentNode)
        cookitem.innerText = recipe[a].previousElementSibling.innerText

        temp2 = a;
      }
    }

    console.log(temp2)


    //splice the ingredient from recipe if the ingredient exists in the RefrigeArray
    for (var i = 0; i < RefrigeArray.length; i++) {
      for (var j = 0; j < recipe[temp2].children.length; j++) {
        if (recipe[temp2].children[j].innerText.toLowerCase() === RefrigeArray[i].toLowerCase()) {
          delete window['r' + temp2][j];
          console.log(window['r' + temp2])
        }
      }
    }

    //Show lacking ingredients for the chosen recipe

    if (window['r' + temp2].join('').split('').length !== 0) {
      lackfood.style.display = "block"

      needitem.innerText = window['r' + temp2].join('').split(/(?=[A-Z])/);
    }



    wditid.classList.remove('hide');
    refrigeID.classList.add('hide');
    main3.classList.add('hide');
    main4.classList.add('hide');
    ma1_hidden.classList.remove('hide');
    sholiid.classList.add('hide');


  })



  //main 4. Get a shopping list


  var recipeall = [];

  ma1_hidden.addEventListener("click", function () {
    location.reload();
  })

  // for get the list button key click
  main4.addEventListener("click", function () {

    //Get all ingredients from all recipes and put it in the recipeall array

    for (var r = 0; r < recipe.length; r++) {
      for (var j = 0; j < recipe[r].children.length; j++) {

        recipeall.push(recipe[r].children[j].innerText.toLowerCase())
      }
    }

    //and splice the ingredient from recipeall if the ingredient exists in the RefrigeArray
    for (var i = 0; i < RefrigeArray.length; i++) {
      for (var j = 0; j < recipeall.length; j++) {
        if (recipeall[j].toLowerCase() === RefrigeArray[i].toLowerCase()) {
          recipeall.splice(j, 1);
          recipeall = [... new Set(recipeall)]
        }
      }
    }

    //print shopping lists to the shoppinglist_ul
    for (var j = 0; j < recipeall.length; j++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(recipeall[j].toLowerCase()));
      shoppinglist_ul.appendChild(li);
    }

    sholiid.classList.remove('hide');
    refrigeID.classList.add('hide');
    wditid.classList.add('hide');
    main3.classList.add('hide');
    main4.classList.add('hide');
    ma1_hidden.classList.remove('hide');

  })


}