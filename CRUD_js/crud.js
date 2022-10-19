$(function () {
  var operation = "C"; //"C"=Crear
  var selected_index = -1; // Indice do elemento seleccionado na lista
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar aos dados armazenados
  tblPersons = JSON.parse(tblPersons); //Converter String em Object
  if (tblPersons === null) // Se não ha dados, inicializar un array vazio
    tblPersons = [];

  function Create() {
    //Obter os valores da forma HTML e transforma-los em String.
    var person = JSON.stringify({
      ID: $("#txtID").val(),
      Name: $("#txtName").val(),
      Phone: $("#txtPhone").val(),
      Email: $("#txtEmail").val()
    });

    //adicionar o objeto a  tabela
    tblPersons.push(person);
    //Armazenar os dados no Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram armazenados"); //Mensagem de alerta
    return true;
  }

  function Edit() {
    // Editar o item seleccionado na tabela
    tblPersons[selected_index] = JSON.stringify({
      ID: $("#txtID").val(),
      Name: $("#txtName").val(),
      Phone: $("#txtPhone").val(),
      Email: $("#txtEmail").val()
    });

    //Armazenar os dados no Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram armazenados"); //Mensagem de alerta
    return true;
  }

  function Delete() {
    //Eliminar o elemento seleccionado na tabela
    tblPersons.splice(selected_index, 1);
    //Atualizar os dados do Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Pessoa Eliminada"); //Mensagem de alerta
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
      "<thead>" +
      "<tr>" +
      "<th>ID</th>" +
      "<th>Nome</th>" +
      "<th>Telefone</th>" +
      "<th>Email</th>" +
      "<th>Ações</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    ); //Adicione a tabela à estrutura HTML
    for (var i in tblPersons) {
      var per = JSON.parse(tblPersons[i]);
      $("#tblList tbody").append("<tr>" +
        "<td>" + per.ID + "</td>" +
        "<td>" + per.Name + "</td>" +
        "<td>" + per.Phone + "</td>" +
        "<td>" + per.Email + "</td>" +
        "<td><img src='./assets/image/edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='./assets/image/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" + "</tr>"
      );
    } //Percorra e adicione os itens à tabela HTML
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
      return Create();
    else
      return Edit();
  }); //Função para decidir se você está adicionando ou editando um item

  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    //Obter o identificador do item a ser editado
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Converter de JSON no formato apropriado para editar dados
    var per = JSON.parse(tblPersons[selected_index]);
    $("#txtID").val(per.ID);
    $("#txtName").val(per.Name);
    $("#txtPhone").val(per.Phone);
    $("#txtEmail").val(per.Email);
    $("#txtID").attr("readonly", "readonly");
    $("#txtName").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obter o identificador do item a ser excluído
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete(); //Eliminar o item
    List(); //Listar novamente os itens na tabela
  });
});
