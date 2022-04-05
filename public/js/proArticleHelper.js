window.onload = function start(){
   getUsers();
   getDocuments();
}

async function getUsers() {
   await axios.get('/user/getUsers').then(function (response) {
      var users = response.data;

      var select = document.getElementById("userPki");

      for (var i = 0; i < users.length; i++) {
         var option = document.createElement("option");
         option.value = users[i]['pki'];
         option.text = users[i]['nome'];
         option.selected = true;
         select.appendChild(option);
     }
   })
}

async function getDocuments() {
   await axios.get('/pro_article/getDocuments').then(function (response) {
      var documents = response.data;
      console.log(documents)
      
      var select = document.getElementById("documetName");

      for (var i = 0; i < documents.length; i++) {
         var option = document.createElement("option");
         option.value = documents[i]['name'];
         option.text = documents[i]['name'].replace("Base 64 - ", "");
         if(i === 0) option.selected = true;
         select.appendChild(option);
     }
   })
}