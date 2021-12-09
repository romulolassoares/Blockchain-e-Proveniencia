window.onload = function start(){
   axios.get('/transaction/getPrinterInfo').then(function (response) {
		printerInfo = response.data;
      console.log(printerInfo);
      
      var printBrand = document.getElementById("printBrand");
      var printMaterial = document.getElementById("printMaterial");
      var printColor = document.getElementById("printColor");
      var printLabel = document.getElementById("printLabel");
      var printGUID = document.getElementById("printGUID");
      var printDestiny = document.getElementById("printDensity");
      var printDiameter = document.getElementById("printDiameter");

      printBrand.value = printerInfo['name']['brand'];
      printMaterial.value = printerInfo['name']['material'];
      printColor.value = printerInfo['name']['color'];
      printLabel.value = printerInfo['name']['label'];
      printGUID.value = printerInfo['GUID'];
      printDestiny.value = printerInfo['properties']['density'];
      printDiameter.value = printerInfo['properties']['diameter'];

	}).catch(function (error) {
		errorToast();
		console.log(error);
	})
 }