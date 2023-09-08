$(document).ready(function () {
  $.ajaxSetup({ cache: false });

  //PREPARA BUSCA QUANDO SOLTAR ALGUMA TECLA PRESSIONADA
  $("#searchFirstName").keyup(function () {
    $("#resultFirstName").html("");
    var searchField = $("#searchFirstName").val();
    var expression = new RegExp(searchField, "i");

    //REALIZA A BUSCA NO JSON
    $.getJSON("users.json", function (data) {
      $.each(data.users, function (key, value) {
        if (value.firstName.search(expression) != -1) {
          $("#resultFirstName").append(
            //ADICIONA O ELEMENTO NO ID
            '<li class="list-group-item link-class"><img src="' +
              value.image +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              value.firstName +
              '<span style="color: rgba(0, 0, 0, 0);">|</span>' +
              '<span class="text-muted">' +
              value.lastName +
              " | " +
              value.email +
              " | " +
              value.company.name +
              " | " +
              value.company.title +
              "</span></li>"
          );
        }
      });
    });
  });

  $("#searchLastName").keyup(function () {
    $("#resultLastName").html("");
    var searchField = $("#searchLastName").val();
    var expression = new RegExp(searchField, "i");

    $.getJSON("users.json", function (data) {
      $.each(data.users, function (key, value) {
        if (value.lastName.search(expression) != -1) {
          $("#resultLastName").append(
            '<li class="list-group-item link-class"><img src="' +
              value.image +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              '<span class="text-muted">' +
              value.firstName +
              "</span>" +
              '<span style="color: rgba(0, 0, 0, 0);">|</span>' +
              value.lastName +
              '<span class="text-muted"> | ' +
              value.email +
              " | " +
              value.company.name +
              " | " +
              value.company.title +
              "</span></li>"
          );
        }
      });
    });
  });

  $("#searchEmail").keyup(function () {
    $("#resultEmail").html("");
    var searchField = $("#searchEmail").val();
    var expression = new RegExp(searchField, "i");

    $.getJSON("users.json", function (data) {
      $.each(data.users, function (key, value) {
        if (value.email.search(expression) != -1) {
          $("#resultEmail").append(
            '<li class="list-group-item link-class"><img src="' +
              value.image +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              '<span class="text-muted">' +
              value.firstName +
              '<span style="color: rgba(0, 0, 0, 0);">|</span>' +
              value.lastName +
              " | " +
              "</span>" +
              value.email +
              '<span class="text-muted"> | ' +
              value.company.name +
              " | " +
              value.company.title +
              "</span></li>"
          );
        }
      });
    });
  });

  $("#searchCompany").keyup(function () {
    $("#resultCompany").html("");
    var searchField = $("#searchCompany").val();
    var expression = new RegExp(searchField, "i");

    $.getJSON("users.json", function (data) {
      $.each(data.users, function (key, value) {
        if (value.company.name.search(expression) != -1) {
          $("#resultCompany").append(
            '<li class="list-group-item link-class"><img src="' +
              value.image +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              '<span class="text-muted">' +
              value.firstName +
              '<span style="color: rgba(0, 0, 0, 0);">|</span>' +
              value.lastName +
              " | " +
              value.email +
              " | " +
              "</span>" +
              value.company.name +
              '<span class="text-muted"> | ' +
              value.company.title +
              "</span></li>"
          );
        }
      });
    });
  });

  $("#searchTitle").keyup(function () {
    $("#resultTitle").html("");
    var searchField = $("#searchTitle").val();
    var expression = new RegExp(searchField, "i");

    $.getJSON("users.json", function (data) {
      $.each(data.users, function (key, value) {
        if (value.company.title.search(expression) != -1) {
          $("#resultTitle").append(
            '<li class="list-group-item link-class"><img src="' +
              value.image +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              '<span class="text-muted">' +
              value.firstName +
              '<span style="color: rgba(0, 0, 0, 0);">|</span>' +
              value.lastName +
              " | " +
              value.email +
              " | " +
              value.company.name +
              " | </span>" +
              value.company.title +
              "</li>"
          );
        }
      });
    });
  });

  $("html").on("click", function () {
    $(".result").html("");
  });

  $(".result").on("click", "li", function () {
    //AO CLICAR NO RESULTADO, COMPARA O VALOR DO firstName COM O VALOR DO JSON
    const click_text = $(this).text().split("|")[0].trim();
    $.getJSON("users.json", function (data) {
      const value = data.users.find((v) => v.firstName === click_text);
      if (value) {
        //SUBSTITUI NA BARRA DE BUSCA
        $("#searchFirstName").val(value.firstName);
        $("#searchLastName").val(value.lastName);
        $("#searchEmail").val(value.email);
        $("#searchCompany").val(value.company.name);
        $("#searchTitle").val(value.company.title);
        $(".result").html("");

        //TROCA NO VALOR NO ID
        $("#photo").html('<img src="' + value.image + '" class="photo"/>');
        $("#firstName").text(value.firstName);
        $("#lastName").text(value.lastName);
        $("#email").text(value.email);
        $("#companyName").text(value.company.name);
        $("#companyTitle").text(value.company.title);
        $("#birthdate").text(value.birthDate);
      }
      $("div.container-card").removeClass("hidden");
    });
  });
});
