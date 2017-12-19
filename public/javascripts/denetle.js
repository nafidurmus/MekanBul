$('#yorumEkle').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#name').val() || !$('select#rating').val() ||
   !$('textarea#review').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger">Tüm Alanlar Gereklidir!</div>');
     }
     return false;
   }
 });


$('#mekanEkle').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#mekanAdi').val()||!$('input#mekanAdresi').val()||!$('input#imkanlar').val()||!$('input#gunler1').val()||!$('input#acilis1').val()||!$('input#kapanis1').val()||!$('input#gunler2').val()||!$('input#acilis2').val()||!$('input#kapanis2').val()||!$('input#enlem').val()||!$('input#boylam').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger">Tüm alanları doldurmalısınız.</div>');
     }
     return false;
   }
 });
