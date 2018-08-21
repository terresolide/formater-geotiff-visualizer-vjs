 /**
  * extrait de la lecture d'un fichier image sur le poste de l'utilisateur
  * <input type="file" id="upload">
  */
  
  $("#upload").on('change',readURL);
 
 function readURL(e) {
        e.preventDefault();
      
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            $(reader).load(function(e) { 
                $('img.avatar').attr('src', e.target.result);
               
                $('#preview img:eq(0)').attr('src',  e.target.result);
                $("input[name=upload]").prop("disabled", false);
                });
           if(this.files[0].type.indexOf("image")>=0 && this.files[0].size<serverconfig.max_size){
           
               reader.readAsDataURL(this.files[0]);
              
           }else{
               alert("Le fichier "+this.files[0].name+"\n\r est trop gros ou\n\r n'est pas une image!!");
               $('#upload').val('');
              // reader.readAsDataURL(defaultimage);
               $('img.avatar').attr('src', defaultimage);
              $('#preview img:eq(0)').attr('src',  defaultimage);
              initRatio(true);
             // $("#oitar").val(1);
               $("input[name=upload]").prop("disabled", true);
           }
        }
    }