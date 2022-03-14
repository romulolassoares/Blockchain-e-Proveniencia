
window.onload = function start(){
   getDocInfo();
   getUsers();
   getDocuments();

}

async function onUpdateDocument() {

   getDocInfo();

   var select = document.getElementById("documentBase64").innerHTML="...";   

}

async function getDocInfo() {
   var selectedValue = document.getElementById("selectdocument").value;  

   await axios.get('/pro_article/getDocInfo', { params: { value: selectedValue } }).then(function (response) {
		printerInfo = response.data;
      
      var title = document.getElementById("title");
      var format = document.getElementById("documentFormat");
      var author = document.getElementById("documentAuthor");
      

      documentTitle.value = printerInfo['title'];
      format.value = printerInfo['data']['format'];

      author.value = printerInfo['data']['author'];

	}).catch(function (error) {
		console.log(error);
	})
}

async function getUsers() {
   await axios.get('/user/getUsers').then(function (response) {
      var users = response.data;

      var select = document.getElementById("userPki");

      for (var i = 0; i < users.length; i++) {
         var option = document.createElement("option");
         option.value = users[i]['pki'];
         option.text = users[i]['nome'];
         select.appendChild(option);
     }
   })
}

async function getDocuments() {
   await axios.get('/pro_article/getDocs').then(function (response) {
		docs = response.data;
      
      var select = document.getElementById("selectdocument");   

      for (var i = 0; i < docs.length; i++) {
         var option = document.createElement("option");
         option.value = docs[i][0];
         option.text = docs[i][0];
         select.appendChild(option);
      }

      getDocInfo()

	}).catch(function (error) {
		console.log(error);
	})
}

async function convertToBase() {
   var selectedValue = document.getElementById("selectdocument").value;  
   console.log(selectedValue);
   await axios.get('/pro_article/convertBase', { params: { value: selectedValue } }).then(function (response) {
		docs = response.data;

      var select = document.getElementById("documentBase64").innerHTML=docs.base;   

	}).catch(function (error) {
		console.log(error);
	})
}