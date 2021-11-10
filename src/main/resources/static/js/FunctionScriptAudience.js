function agregarAuditorio() {
    if($("#nameAudience").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#Audescription").val().length == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Todos los campos son necesarios!',
        });
     }else{
        var datos={
            name:$("#nameAudience").val(),
            owner:$("#owner").val(),
            capacity:$("#capacity").val(),
            description:$("#Audescription").val(),
            category:{id: +$("#select-category").val()},
        }  
        let datosPeticion=JSON.stringify(datos);
        $.ajax({
            url:"http://158.101.30.210:8080/api/Audience/save",
            data:datosPeticion,
            type:"POST",
            dataType: 'json',
            contentType:"application/JSON; charset=utf-8",
            success:function (respuesta){
                console.log(respuesta);
                setTimeout('window.location.reload()',3500);
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado!',
                });
            },
            
            error: function(xhr, status) {
                console.log(status)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                });
            }
        });
    }
}

function listarAuditorio() {
    // $("#btn-agregarAuditorio").hide();
    // $("#botonUpdateAuditorio").hide();

    $.ajax({
        url:"http://158.101.30.210:8080/api/Audience/all",
        Type:'GET',
        dataType:"json",

        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaAuditorio(respuesta);
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

function listarRespuestaAuditorio(respuesta) {
    var tabla=`<table class="table table-striped table-bordered table-condensed">
                <tr>
                    <th>NOMBRE</th>
                    <th>DUEÑO</th>
                    <th>CAPACIDAD</th>
                    <th>DESCRIPCION</th>
                    <th>CATEGORIA</th>
                    <th colspan="2">ACCIONES</th>
                </tr>`;
    for (let i = 0; i < respuesta.length; i++) {
        tabla+=`<tr>
                    <td>${respuesta[i].name} </td>
                    <td>${respuesta[i].owner} </td>
                    <td>${respuesta[i].capacity} </td>
                    <td>${respuesta[i].description} </td>
                    <td>${respuesta[i].category.name} </td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="editarRegistroAuditorio(${respuesta[i].id})">Editar</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="borrarRegistroAuditorio(${respuesta[i].id})">Borrar</button></td>
                    
                </tr>`;
                var actualizar=`<button type="button" class="btn btn-primary" onclick="actualizarRegistroAuditorio(${respuesta[i].id})">actualizar</button>`
                
    }
    tabla+=`</table>`
    
    $("#listadoAudience").html(tabla);
    $("#botonUpdateAuditorio").html(actualizar);
}

function editarRegistroAuditorio(numID) {
    $("#botonUpdateAuditorio").show();
    // $("#btn-agregarAuditorio").hide();
    // $("#btn-listarAuditorio").hide();
    $("#select-ccategory").prop('disabled', true);
    $("#AnumID").hide();
    
    $.ajax({
        url:"http://158.101.30.210:8080/api/Audience/"+numID,
        type:'GET',
        dataType:'json',
    
        success:function (respuesta) {
            console.log(respuesta)
            var item = respuesta;

            $("#AnumID").val(item.id);
            $("#AnameAudience").val(item.name);
            $("#Aowner").val(item.owner);
            $("#Acapacity").val(item.capacity);
            $("#AAudescription").val(item.description);
            $("#select-ccategory").val(item.category.id);
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

function actualizarRegistroAuditorio() {
    let datos={
        
        id:$("#AnumID").val(),
        name:$("#AnameAudience").val(),
        owner:$("#Aowner").val(),
        capacity:$("#Acapacity").val(),
        description:$("#AAudescription").val(),
        category:{id: +$("#select-ccategory").val()},
    }
    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://158.101.30.210:8080/api/Audience/update",
        data:datosPeticion,
        type:'PUT',
        dataType:'json',
        contentType: "application/JSON",

        success:function (respuesta) {
            console.log(respuesta);
            listarAuditorio();
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
            });
            //Limpiar Campos
            // $("#AnameAudience").val("");
            // $("#Aowner").val("");
            // $("#Acapacity").val("");
            // $("#AAudescription").val("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

function borrarRegistroAuditorio(numID) {
    var datos={
        id:numID
    };

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://158.101.30.210:8080/api/Audience/"+numID,
        data:datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",
        dataType:'json',

        success:function (respuesta) {
            console.log(respuesta);
            listarAuditorio();
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
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

function autoRelacionAuditorio() {
    console.log("Se esta ejecutando Auditorio...")
    $.ajax({
        url:"http://158.101.30.210:8080/api/Audience/all",
        type:"GET",
        datatype:"JSON",
        
        success:function (respuesta) {
            console.log(respuesta);
            let $select1=$("#select1-audience");
            let $select2=$("#select2-audience");
            let $select3=$("#select1-Maudience");
            let $select4=$("#select2-Raudience");
            $.each(respuesta, function(id, name){
                $select1.append('<option value='+name.id+'>'+name.name+'</option>');
                $select2.append('<option value='+name.id+'>'+name.name+'</option>');
                $select3.append('<option value='+name.id+'>'+name.name+'</option>');
                $select4.append('<option value='+name.id+'>'+name.name+'</option>');
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
