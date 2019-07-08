
var addEditAction = 'none';

function addCat() {
  addEditAction = 'add';
  $('#editform_phone').val('');
  $('#editform_owner_name').val('');
  $('#editform_city').val('');
  $('#editform_name').val('');
  $('#editform_breed').val('');
  $('#editform_age').val(0);
  $('#editform_sex').val('no');
  $("#editform").modal();
}

function saveEditClick() {
  let formData = {
    owner: {}
  };
  
  formData.owner.phone = $('#editform_phone').val();
  formData.owner.name = $('#editform_owner_name').val();
  formData.owner.city = $('#editform_city').val();
  formData.name = $('#editform_name').val();
  formData.breed = $('#editform_breed').val();
  formData.age = $('#editform_age').val();
  formData.sex = $('#editform_sex').val();
  
  if( addEditAction == 'edit' )
    $.ajax({
      type: "PUT",
      url: './api/cats',
      data: formData
    });
  
  if( addEditAction == 'add' )
    $.ajax({
      type: "POST",
      url: './api/cats',
      data: formData
    });
  
  addEditAction = 'none';
  $('#editform').modal('hide');
}

function catClick(id) {
  $.get(`./api/cats/${id}.json`)
  .then( data => {
    $('#ownerform_phone').val(data.owner.phone);
    $('#ownerform_name').val(data.owner.name);
    $('#ownerform_city').val(data.owner.city);
    $("#ownerform").modal()
  });
}

function catEdit(id) {
  $.get(`./api/cats/${id}.json`)
  .then( data => {
    addEditAction = 'edit';
    $('#editform_phone').val(data.owner.phone);
    $('#editform_owner_name').val(data.owner.name);
    $('#editform_city').val(data.owner.city);
    $('#editform_name').val(data.name);
    $('#editform_breed').val(data.breed);
    $('#editform_age').val(data.age);
    $('#editform_sex').val(data.sex);
    $("#editform").modal();
  });
}

function genTableBody(data) {
  let result = '';
  
  for(let item of data) {
    result += '<tr>\n';
    
    for(let index in item)
      result += `<td>${item[ index ]}</td>`;
    
    result += `<td><a class="btn btn-primary" href="javascript:catClick(${item.id})">Owner info</a> `;
    result += `<a class="btn btn-primary" href="javascript:catEdit(${item.id})">Edit</a></td>`;
    result += '</tr>\n';
  }
  
  return result;
}

function loadCatsList(url) {
  $.get(url)
  .then( data => {
    $('#cats_table_body').html(genTableBody(data));
  });
} 
