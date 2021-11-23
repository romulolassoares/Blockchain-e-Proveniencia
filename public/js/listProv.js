// Carrega as informações na tela
window.onload = function start(){
   axios.get('/prov/getTransactions').then(function (response) {
		transactions = response.data
		console.log(response.data)
		let conteudo = "";
		for (let i = 0; i < transactions.length; i++) {
			conteudo += "<tr>";              
			conteudo += "<td >" + transactions[i].agent + "</td>";
			conteudo += "<td >" + transactions[i].activity + "</td>";
			conteudo += "<td >" + transactions[i].entity + "</td>";
			conteudo += "<td >" + transactions[i].timestamp + "</td>";
			conteudo += "<td>";
			conteudo += "<a class='infoProv' title = 'Info Rede' href='javascript:void(0)' data-_idrede='" + transactions[i]._id + "'><i class='color-info ti-info-alt' style='font-size: 20px;'></i></a>";
			conteudo += "</td>"; 
			conteudo += "</tr>";
			document.getElementById('tableBody').innerHTML = conteudo;
		}
	}).catch(function (error) {
		errorToast();
		console.log(error);
	})
 }

// Executa ao clica o botão de mais informações
 $(document).on('click', '.infoProv', function () { 
   var _idNetwork = $(this).data('_idrede')

   axios.get('/prov/routeGetProvById/'+_idNetwork).then(function (response) {
		prov = response.data
		conteudo = "";
		conteudo += "<tr>";
		conteudo += "<td>" + prov.relationship.wasGeneratedBy + "</td>";
		conteudo += "<td>" + prov.relationship.used + "</td>";
		conteudo += "<td>" + prov.relationship.wasAssociatedWith + "</td>";
		conteudo += "<td>" + prov.relationship.wasAttribuitedWith + "</td>";
		conteudo += "<td><a class='closeInfoNetwork' title='Voltar' href='javascript:void(0)'> <i class='ti-arrow-circle-left' style='font-size: 20px;'></i></a></td>";
		conteudo += "</tr>";
      document.getElementById("redeInfo").innerHTML = conteudo;
   }).catch(function (error) {
		errorToast();
      console.log(error);
   })

  document.getElementById('tableRedeInfo').hidden = false
  document.getElementById('divRedeInfo').hidden = false
  document.getElementById('tableListRedes').hidden = true
});


$(document).on('click', '.closeInfoNetwork', function () { 
    document.getElementById('tableRedeInfo').hidden = true
    document.getElementById('divRedeInfo').hidden = true
    document.getElementById('tableListRedes').hidden = false
});

const errorToast = () => {
	toastr.clear()
	toastr.error('Ocorreu um erro ao realizar a operação!', 'Erro!')

	document.getElementById('title').innerHTML = "Ocorreu um erro"
	document.getElementById('resultado').innerHTML = "Os dados não foram salvos, tente novamente"+
	"<div class='row'>"+
		"<div class='col-lg-5'></div>"+
		"<div class='col-lg-2'>"+
			"<a href='/cadastrarRede' class='btn btn-light'>Retornar</a>"    +
		"</div>"+    
		"<div class='col-lg-5'></div>"+   
	"</div>";
}