function agregarCategory() {
    if($("#caName").val().length == 0 || $("#caDescription").val().length == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Todos los campos son necesarios!',
        });
     }else{
        var datos={
            name:$("#caName").val(),
            description:$("#caDescription").val(),
        }

        let datosPeticion=JSON.stringify(datos);
        $.ajax({
            url:"http://158.101.30.210:8080/api/Category/save",
            data:datosPeticion,
            type:"POST",
            contentType:"application/JSON; charset=utf-8",
            success:function (respuesta){
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
function listarCategory() {
    // $("#btn-agregarCategory").hide();
    // $("#botonUpdateCategory").hide();

    $.ajax({
        url:"http://158.101.30.210:8080/api/Category/all",
        Type:"GET",
        dataType:"json",
        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaCategory(respuesta);
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

function listarRespuestaCategory(respuesta) {
    var tabla=`<table class="table table-striped table-bordered table-condensed">
                <tr>
                    <th>CATEGORIA</th>
                    <th>DESCRIPCION</th>
                    <th colspan="2">ACCIONES</th>
                </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla+=`<tr>
                    <td>${respuesta[i].name} </td>
                    <td>${respuesta[i].description} </td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="editarRegistroCategory(${respuesta[i].id})">Editar</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="borrarRegistroCategory(${respuesta[i].id})">Borrar</button></td>
                </tr>`;
                var actualizar=`<button type="button" class="btn btn-primary" onclick="actualizarRegistroCategory(${respuesta[i].id})">actualizar</button>`
                
    }
    tabla+=`</table>`

    $("#listadoCategory").html(tabla);
    $("#botonUpdateCategory").html(actualizar);
}

function editarRegistroCategory(CategoryID) {
    $("#ccategoryID").hide();
    $("#botonUpdateCategory").show();
    // $("#btn-agregarCategory").hide();
    // $("#btn-listarCategory").hide();
    
    $.ajax({
        url:"http://158.101.30.210:8080/api/Category/"+CategoryID,
        type:'GET',
        dataType:'json',
        success:function (respuesta) {
            var items = respuesta;
            $("#ccategoryID").val(items.id);
            $("#ccaName").val(items.name);
            $("#ccaDescription").val(items.description);
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

function actualizarRegistroCategory() {
    var datos={
        id:$("#ccategoryID").val(),
        name:$("#ccaName").val(),
        description:$("#ccaDescription").val(),
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Category/update",
        data:datosPeticion,
        type:'PUT',
        contentType:'application/JSON',

        success:function (respuesta) {
            console.log(respuesta);
            listarCategory();
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
            });
            //Limpiar Campos
            // $("#ccaName").val("");
            // $("#ccaDescription").val("");
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

function borrarRegistroCategory(CategoryID) {
    var datos={
        id:CategoryID
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"http://158.101.30.210:8080/api/Category/"+CategoryID,
        data:datosPeticion,
        type:"DELETE",
        contentType:"application/JSON",
        dataType:'json',
        success:function (respuesta) {
            console.log(respuesta);
            listarCategory();
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

function autoInicioCategoria(){
    console.log("se esta ejecutando category...")
    $.ajax({
        url:"http://158.101.30.210:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select1 = $("#select-category");
            let $select2 = $("#select-ccategory")
            $.each(respuesta, function (id, name) {
                $select1.append('<option class="option" value='+name.id+'>'+name.name+'</option>');
                $select2.append('<option class="option" value='+name.id+'>'+name.name+'</option>')
            }); 
        },
    });
}