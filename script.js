$(document).ready(function () {
  $.ajaxSetup({ cache: false });

  //PREPARA BUSCA QUANDO SOLTAR ALGUMA TECLA PRESSIONADA
  $("#search").keyup(function () {
    $("#result").html("");
    var searchField = $("#search").val();
    var expression = new RegExp(searchField, "i");

    //REALIZA A BUSCA NO JSON
    $.getJSON("users.json", function (data) {
      $.each(data.users, function (key, value) {
        if (
          value.firstName.search(expression) != -1 ||
          value.email.search(expression) != -1
        ) {
          $("#result").append(
            //ADICIONA O ELEMENTO NO ID
            '<li class="list-group-item link-class"><img src="' +
              value.image +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              value.firstName +
              ' | <span class="text-muted">' +
              value.email +
              ' | <span class="text-muted">' +
              value.company.name +
              ' | <span class="text-muted">' +
              value.company.title +
              "</span></li>"
          );
        }
      });
    });
  });

  //AO CLICAR NO RESULTADO, SUBSTITUI NA BARRA DE BUSCA
  $("#result").on("click", "li", function () {
    let click_text = $(this).text().split("|");
    $("#search").val($.trim(click_text[1]));
    $("#result").html("");

    //BUSCA E SUBSTITUI O VALOR DO JSON
    click_text = $(this).text().split("|")[0].trim();
    $.getJSON("users.json", function (data) {
      const value = data.users.find((v) => v.firstName === click_text);
      if (value) {
        //TROCA NO VALOR NO ID
        $("#photo").html('<img src="' + value.image + '" class="photo"/>');
        $("#name").text(value.firstName);
        $("#lastName").text(value.lastName);
        $("#birthdate").text(value.birthDate);
        $("#email").text(value.email);
        $("#companyName").text(value.company.name);
        $("#companyTitle").text(value.company.title);
      }
      $("div.container-card").removeClass("hidden");
    });
  });
});
