
function createFormListener(){
 const form = document.querySelector('form')//1. find the form
 //if mutiple forms, need id or specificality to grab the right position
 //2. bind the form to an eventlistener (submit)
      //form.addEventListener('type of event', what to do)
  form.addEventListener('submit', function(event){//3. once submitted:
    event.preventDefault()//prevent default behavior of the form
    // console.log(event)//点击submit按钮时，console会出现submitEvent
    // //点击submit按钮时，console会出现target里要求的attribute
    // console.log(event.target['title'].value)
    // console.log(event.target['author'].value)
    const newBook = { // grabbing the input value and scrape the form data
      title: event.target['title'].value,
      author: event.target['author'].value
    }

    const reqObj={ 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    }

    fetch('http://localhost:3000/books', reqObj)
    .then(response=>response.json())
    .then(book=>{
      renderBook(book)
  })
})
}
  /* 
  1. find the form
   2. bind the form to an eventlistener (submit)
    3. once submitted:
        prevent default behavior of the form
        scrape the form data
        update the backend
        update the frontend
  */


function fetchBooks(){
  // fetch('http://localhost:3000/books')//make a fetch request, which it returns promise
  // .then(function(response){//whenever the response, it goes to this call back function
  //  // console.log(response) //we will see reponse when we look at inspect
  //   return response.json()
  // })
  // .then(function(booksJson){
  //   测试console.log(booksJson)
  // })

  //ES6 function
  fetch('http://localhost:3000/books')//make a fetch request, which it returns promise
  .then(response=>response.json())//whenever the response happens to came back, THEN execute this call back function
  .then(booksJson=>{//this bookJson will have access to the actual json data
      //测试console.log('BookJsonData',booksJson)

//2. iterator over the book array,for each book: 
  // booksJson.forEach(callback function)>booksJson.forEach(function(){...}
  
  booksJson.forEach(renderBook)//此时是单数book了因为forEach
          //测试 console.log('each book', book)
          

    // 1. find the booklist div
    // 2. iterate over the book array，for each book: 
    // 3. assign each book a pTag and place it in the bookList div
  })
}

function renderBook(book){
//1. find the booklist div，选择对的位置
const bookList=document.getElementById('book-list')
//3. assign each book a pTag and place it in the bookList div
const pTag = document.createElement('p')//create a pTag
pTag.innerText= book.title + '---' + book.author // Assign what text should be print in the pTag
            //`${book.title} - ${book.author}`
bookList.append(pTag)
}
//Invoke
fetchBooks()
createFormListener()