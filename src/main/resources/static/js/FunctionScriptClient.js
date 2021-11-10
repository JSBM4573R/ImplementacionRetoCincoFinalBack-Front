function agregarClient() {
    if($("#email").val().length == 0 || $("#password").val().length == 0 || $("#Clientname").val().length == 0 || $("#age").val().length == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Todos los campos son necesarios!',
        });
     }else{
        var datos={
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#Clientname").val(),
            age:$("#age").val(),
        }
        let datosPeticion=JSON.stringify(datos);
        $.ajax({
            url:"http://158.101.30.210:8080/api/Client/save",
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

function listarClient() {
    // $("#btn-agregarClient").hide();
    // $("#botonUpdateClient").hide();

    $.ajax({
        url:"http://158.101.30.210:8080/api/Client/all",
        Type:"GET",
        dataType:"json",
        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaClient(respuesta);
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

function listarRespuestaClient(respuesta) {
    var tabla=`<table class="table table-striped table-bordered table-condensed">
                <tr>
                    <th>NOMBRE</th>
                    <th>CORREO</th>
                    <th>EDAD</th>
                    <th colspan="2">ACCIONES</th>
                </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla+=`<tr>
                    <td>${respuesta[i].name} </td>
                    <td>${respuesta[i].email} </td>
                    <td>${respuesta[i].age} </td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="editarRegistroClient(${respuesta[i].idClient})">Editar</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="borrarRegistroClient(${respuesta[i].idClient})">Borrar</button></td>
                </tr>`;
                var retorno=`<button type="button" class="btn btn-primary" class="btn btn-guardarEdicionClient" onclick="actualizarRegistroClient(${respuesta[i].idClient})">actualizar</button>`
    }
    tabla+=`</table>`

    $("#listadoClient").html(tabla);
    $("#botonUpdateClient").html(retorno);
}

function editarRegistroClient(ClientID) {
    $("#CClientID").hide();
    $("#Cemail").prop('disabled', true);

    $.ajax({
        url:"http://158.101.30.210:8080/api/Client/"+ClientID,
        type:'GET',
        dataType:'json',
        success:function (respuesta) {
            console.log(respuesta);
            var items=respuesta;
            $("#CClientID").val(items.idClient);
            $("#Cemail").val(items.email);
            $("#Cpassword").val(items.password);
            $("#CClientname").val(items.name);
            $("#Cage").val(items.age);
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

function actualizarRegistroClient() {
    var datos={
        idClient:$("#CClientID").val(),
        email:$("#Cemail").val(),
        password:$("#Cpassword").val(),
        name:$("#CClientname").val(),
        age:$("#Cage").val(),
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Client/update",
        data:datosPeticion,
        type:'PUT',
        contentType:'application/JSON',

        success:function (respuesta) {
            console.log(respuesta);
            listarClient();
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
            });
            //Limpiamos los campos
            // $("#ClientID").val("");
            // $("#email").val("");
            // $("#password").val("");
            // $("#Clientname").val("");
            // $("#age").val("");
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

function borrarRegistroClient(ClientID) {
    var datos={
        idClient:ClientID
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Client/"+ClientID,
        data:datosPeticion,
        type:"DELETE",
        contentType:"application/JSON",
        dataType:'json',
        success:function (respuesta) {
            listarClient();
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

function autoInicioCliente() {
    console.log("Se esta ejecutando client...")
    $.ajax({
        url:"http://158.101.30.210:8080/api/Client/all",
        datatype:"JSON",
        Type:"GET",
        success:function(respuesta){
            console.log(respuesta);
            let $select1=$("#select1-client");
            let $select2=$("#select2-client");
            let $select3=$("#select1-Mclient");
            let $select4=$("#select2-Rclient");
            $.each(respuesta, function(id, name){
                $select1.append('<option value='+name.idClient+'>'+name.name+'</option>');
                $select2.append('<option value='+name.idClient+'>'+name.name+'</option>');
                $select3.append('<option value='+name.idClient+'>'+name.name+'</option>');
                $select4.append('<option value='+name.idClient+'>'+name.name+'</option>');
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