function agregarReservation() {
    if($("#startdate").val().length == 0 || $("#devolutiondate").val().length == 0 || $("#status").val().length == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Todos los campos son necesarios!',
        });
     }else{
        var datos={
            startDate:$("#startdate").val(),
            devolutionDate:$("#devolutiondate").val(),
            status:$("#status").val(),
            client:{idClient: +$("#select2-client").val()},
            audience:{id: +$("#select2-audience").val()},
        }
        let datosPeticion=JSON.stringify(datos);
        $.ajax({
            url:"http://158.101.30.210:8080/api/Reservation/save",
            data:datosPeticion,
            type:"POST",
            contentType:"application/JSON",
            success:function (respuesta){
                console.log(respuesta);
                setTimeout('window.location.reload()',3500);
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado!',
                });
            },
            error:function(xhr, status){
                console.log(status)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                });
            }
        });
    }
}

function listarReservation() {
    $.ajax({
        url:"http://158.101.30.210:8080/api/Reservation/all",
        Type:"GET",
        dataType:"json",
        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaReservation(respuesta);
        },
        error:function (xhr, status) {
            console.log(status)
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function listarRespuestaReservation(respuesta) {
    var tabla=`<table class="table table-striped table-bordered table-condensed">
                <tr>
                    <th>CLIENTE</th>
                    <th>AUDITORIO</th>
                    <th>FECHA INICIO</th>
                    <th>FECHA FIN</th>
                    <th>STATUS</th>
                    <th colspan="2">ACCIONES</th>
                </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla+=`<tr>
                    <td>${respuesta[i].client.name} </td>   
                    <td>${respuesta[i].audience.name} </td>
                    <td>${respuesta[i].startDate} </td>
                    <td>${respuesta[i].devolutionDate} </td>
                    <td>${respuesta[i].status} </td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="editarRegistroReservation(${respuesta[i].idReservation})">Editar</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="borrarRegistroReservation(${respuesta[i].idReservation})">Borrar</button></td>
                </tr>`;
                var actualizar=`<button type="button" class="btn btn-primary" class="btn btn-guardarEdicionReservation" onclick="actualizarRegistroReservation(${respuesta[i].idReservation})">actualizar</button>`
    }
    tabla+=`</table>`
    $("#listadoReservation").html(tabla)
    $("#botonUpdateReservation").html(actualizar);
}

function editarRegistroReservation(ReservationID) {
    // $("#botonUpdateReservation").show();
    // $("#btn-agregarReservation").hide();
    // $("#btn-listarReservation").hide();
    $('#RreservationID').hide();
    $("#select2-Rclient").prop('disabled', true);
    $("#select2-Raudience").prop('disabled', true);
    // $("#reservationID").prop('disabled', true);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Reservation/"+ReservationID,
        type:'GET',
        dataType:'json',
        success:function (respuesta) {
            var items=respuesta;
            $('#RreservationID').val(items.idReservation),
            $('#Rstartdate').val(items.startDate),
            $('#Rdevolutiondate').val(items.devolutionDate),
            $("#Rstatus").val(items.status),
            $("#select2-Rclient").val(items.client.idClient),
            $("#select2-Raudience").val(items.audience.id);
        },
        error:function(xhr, status){
            console.log(status)
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function actualizarRegistroReservation() {
    var datos={
        idReservation:$("#RreservationID").val(),
        startDate:$("#Rstartdate").val(),
        devolutionDate:$("#Rdevolutiondate").val(),
        status:$("#Rstatus").val(),
        client:{idClient: +$("#select2-Rclient").val()},
        audience:{id: +$("#select2-Raudience").val()},
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Reservation/update",
        data:datosPeticion,
        type:'PUT',
        contentType:'application/JSON',
        success:function (respuesta) {
            listarReservation();
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
            });
        },
        error:function(xhr, status){
            console.log(status)
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function borrarRegistroReservation(reservationID) {
    var datos={
        id:reservationID
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Reservation/"+reservationID,
        data:datosPeticion,
        type:"DELETE",
        contentType:"application/JSON",
        success:function (respuesta) {
            listarReservation();
            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
            });
        },
        error:function(xhr, status){
            console.log(status)
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}