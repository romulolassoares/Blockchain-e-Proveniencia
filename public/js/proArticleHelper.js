
window.onload = function start(){
   getDocInfo();
   getUsers();
}

async function getDocInfo() {
   await axios.get('/pro_article/getDocInfo').then(function (response) {
		printerInfo = response.data;
      console.log(printerInfo);
      
      var title = document.getElementById("title");
      var format = document.getElementById("documentFormat");
      var base64 = document.getElementById("documentBase64");
      var author = document.getElementById("documentAuthor");
      // var printGUID = document.getElementById("printGUID");
      // var printDesity = document.getElementById("printDensity");
      // var printDiameter = document.getElementById("printDiameter");
      

      documentTitle.value = printerInfo['docTitle'];
      format.value = printerInfo['format'];
      base64.value = printerInfo['base64'];
      author.value = printerInfo['author'];
      // printLabel.value = printerInfo['name']['label'];
      // printGUID.value = printerInfo['GUID'];
      // printDesity.value = printerInfo['properties']['density'];
      // printDiameter.value = printerInfo['properties']['diameter'];

	}).catch(function (error) {
		errorToast();
		console.log(error);
	})
}

async function getUsers() {
   await axios.get('/user/getUsers').then(function (response) {
      var users = response.data;
      console.log(users);

      var select = document.getElementById("selectUsers");

      for (var i = 0; i < users.length; i++) {
         var option = document.createElement("option");
         option.value = users[i]['pki'];
         option.text = users[i]['nome'];
         select.appendChild(option);
     }
   })
}