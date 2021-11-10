function agregarMessage() {
    if($("#messagetext").val().length == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Escribe un mensaje!',
        });
     }else{
        var datos={
            messageText:$("#messagetext").val(),
            client:{idClient: +$("#select1-client").val()},
            audience:{id: +$("#select1-audience").val()},
        }
        let datosPeticion=JSON.stringify(datos);
        $.ajax({
            url:"http://158.101.30.210:8080/api/Message/save",
            data:datosPeticion,
            type:"POST",
            contentType:"application/JSON; charset=utf-8",
            success:function (respuesta){
                console.log(respuesta);
                setTimeout('window.location.reload()',3500);
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado!',
                });
            },
            error:function(xhr, status){
                console.log(status);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                });
            }
        });
    }
}

function listarMessage() {
    // $("#btn-agregarMessage").hide();
    // $("#botonUpdateMessage").hide();

    $.ajax({
        url:"http://158.101.30.210:8080/api/Message/all",
        Type:"GET",
        dataType:"json",
        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaMessage(respuesta);
        },
        error:function (xhr, status) {
            console.log(status);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function listarRespuestaMessage(respuesta) {
    var tabla=`<table class="table table-striped table-bordered table-condensed">
                <tr>
                    <th>CLIENTE</th>
                    <th>AUDITORIO</th>
                    <th>MENSAJE</th>
                    <th colspan="2">ACCIONES</th>
                </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla+=`<tr>
                    <td>${respuesta[i].client.name} </td>   
                    <td>${respuesta[i].audience.name} </td>
                    <td>${respuesta[i].messageText} </td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="editarRegistroMessage(${respuesta[i].idMessage})">Editar</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="borrarRegistroMessage(${respuesta[i].idMessage})">Borrar</button></td>
                </tr>`;
                var actualizar=`<button type="button" class="btn btn-primary" class="btn btn-guardarEdicionMessage" onclick="actualizarRegistroMessage(${respuesta[i].idMessage})">actualizar</button>`
    }
    tabla+=`</table>`

    $("#listadoMessage").html(tabla);
    $("#botonUpdateMessage").html(actualizar);
}

function editarRegistroMessage(MessageID) {
    // $("#botonUpdateMessage").show();
    // $("#btn-agregarMessage").hide();
    // $("#btn-listarMessage").hide();
    $("#MMessageID").hide();
    $("#select1-Mclient").prop('disabled', true);
    $("#select1-Maudience").prop('disabled', true);
    // $("#MessageID").prop('disabled', true);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Message/"+MessageID,
        type:'GET',
        dataType:'json',
        success:function (respuesta) {
            var items=respuesta;
            $('#MMessageID').val(items.idMessage),
            $('#Mmessagetext').val(items.messageText);
            $("#select1-Mclient").val(items.client.idClient);
            $("#select1-Maudience").val(items.audience.id);
        },
        error:function(xhr, status){
            console.log(status);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function actualizarRegistroMessage() {
    var datos={
        idMessage:$("#MMessageID").val(),
        messageText:$("#Mmessagetext").val(),
        client:{idClient: +$("#select1-Mclient").val()},
        audience:{id: +$("#select1-Maudience").val()},
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Message/update",
        data:datosPeticion,
        type:'PUT',
        contentType:'application/JSON',
        success:function (respuesta) {
            console.log(respuesta);
            listarMessage();
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
            });
            //Limpiamos los campos
            // $("MessageID").val(""),
            // $("#messagetext").val("");
        },
        error:function(xhr, status){
            console.log(status);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function borrarRegistroMessage(MessageID) {
    var datos={
        idMessage:MessageID
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Message/"+MessageID,
        data:datosPeticion,
        type:"DELETE",
        contentType:"application/JSON",
        dataType:'JSON',
        success:function (respuesta) {
            listarMessage();
            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
            });
        },
        error:function(xhr, status){
            console.log(status);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}