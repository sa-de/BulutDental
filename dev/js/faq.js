if( jQuery(".toggle .toggle-title").hasClass('active') ){
    jQuery(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
  }
  jQuery(".toggle .toggle-title").click(function(){
    if( jQuery(this).hasClass('active') ){
      jQuery(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
      jQuery(this).find('button').removeClass('tcon-transform');

    }
    else{	
      jQuery(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
      console.log("aç");
      jQuery(this).find('button').addClass('tcon-transform');
    }
  });
  
