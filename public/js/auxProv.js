window.onload = function start(){
   console.log('hello world')
}

function getAllActivity() {
   axios.get('/api_prov/get_all_activities')
   .then(function (response) {
      const data = response.data;
      const span = document.getElementById('dataPrint')
      span.innerHTML =""
      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         span.innerText += JSON.stringify(element) + '\n';
      }
   })
   .catch(function (error) {
       // handle error
       console.log(error);
   })
   .finally(function () {
       // always executed
   });
}

function getAllAgent() {
   axios.get('/api_prov/get_all_agents')
   .then(function (response) {
      const data = response.data;
      const span = document.getElementById('dataPrint')
      span.innerHTML =""
      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         span.innerText += JSON.stringify(element) + '\n';
      }
   })
   .catch(function (error) {
       // handle error
       console.log(error);
   })
   .finally(function () {
       // always executed
   });
}

function getAllEntity() {
   axios.get('/api_prov/get_all_entities')
   .then(function (response) {
      const data = response.data;
      const span = document.getElementById('dataPrint')
      span.innerHTML =""
      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         span.innerText += JSON.stringify(element) + '\n';
      }
   })
   .catch(function (error) {
       // handle error
       console.log(error);
   })
   .finally(function () {
       // always executed
   });
}

function getProvData() {
   axios.get('/api_prov/get_all_prov_data')
   .then(function (response) {
      const data = response.data;
      const span = document.getElementById('dataPrint')
      span.innerHTML =""
      const json = JSON.stringify(data)
      span.innerHTML = json
      
   })
   .catch(function (error) {
       // handle error
       console.log(error);
   })
   .finally(function () {
       // always executed
   });
}