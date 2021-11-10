function traerReporteStatus() {
    console.log("test");
    $.ajax({
        url: "http://158.101.30.210:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    var tabla = `<table class="table table-striped table-bordered table-condensed">
    <tr>
        <th>COMPLETADAS</th>
        <th>CANCELADAS</th>
    </tr>
    <tr>
        <td>${respuesta.completed} </td>   
        <td>${respuesta.cancelled} </td>
    </tr>
    </table>`
    $("#resultadoStatus").html(tabla);
}

function traerReporteDate() {
    if($("#RstarDate").val().length == 0 || $("#RdevolutionDate").val().length == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Todos los campos son necesarios!',
        });
     }else{
        var fechaInicio = document.getElementById("RstarDate").value;
        var fechaCierre = document.getElementById("RdevolutionDate").value;
        console.log(fechaInicio);
        console.log(fechaCierre);
        $.ajax({
            url: "http://158.101.30.210:8080/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
}

function pintarRespuestaDate(respuesta) {
    var tabla = `<table class="table table-striped table-bordered table-condensed">
        <tr>
            <th>FECHA FIN</th>
            <th>FECHA INICIO</th>
            <th>STATUS</th>
        </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla += `<tr>
            <td>${respuesta[i].devolutionDate} </td>   
            <td>${respuesta[i].startDate} </td>
            <td>${respuesta[i].status} </td>
        </tr>`;
    }
    tabla += `</table>`
    $("#resultadoDate").html(tabla);
}

function traerReporteClientes() {
    $.ajax({
        url: "http://158.101.30.210:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta) {

    var tabla = `<table class="table table-striped table-bordered table-condensed">
    <tr>
        <th>TOTAL RESERVAS</th>
        <th>NOMBRE CLIENTE</th>
        <th>EMAIL CLIENTE</th>
    </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla += `<tr>
        <td>${respuesta[i].total} </td>   
        <td>${respuesta[i].client.name} </td>
        <td>${respuesta[i].client.email} </td>

    </tr>`;
    }
    tabla += `</table>`
    $("#resultadoClientes").html(tabla);
}