function load(){
  for(var i of Object.keys(localStorage)){
    var check_m = JSON.parse(localStorage.getItem(i));
      for(var m of $(".card-title")){
        if(Object.keys(check_m)[0] == m.innerHTML){
        $(m).parent().css('opacity', '0.2'); 
        // card-title 태그의 부모의 card-body 에 투명도
        $(m).parent().siblings("img").css('opacity', '0.5'); 
        // card-title 의 부모의 형제들 중 img 태그에 투명도
        $(m).parent().parent().prepend('<img src="completed2.png" class="complete-img">');
        // 포스터 사진 위에 comeplete 이미지 추가
        }
      }
    }
  }
load();

//check box format
  var checkbox;
  $('input:checkbox').click(function() {
      checkbox = $(this);
  })
  $('input:checkbox').change(
    function(){
        if ($(this).is(':checked')) {
         
          $(this).parent().siblings().css('opacity', '0.5');
          $(this).parent().parent().prepend('<img src="completed2.png" class="complete-img">');
          var dialog = document.querySelector('dialog');
         var showDialogButton = document.querySelector('#show-dialog');
         if (! dialog.showModal) {
           dialogPolyfill.registerDialog(dialog);
         }
         dialog.showModal();
         dialog.querySelector('.close').addEventListener('click', function() {
           dialog.close();
         });
         key = $(this).parent().siblings().find(".card-title").html();
         
          $('#btn_review').click(function() {
        var content = $("#textarea").val();
         var myReview = {};
         myReview[key] = content;
         myReview['review'] = "ok";
         var saveReview = JSON.stringify(myReview);
         localStorage.setItem(key, saveReview);
         dialog.close();
       });
         $("#textarea").val("");
         $(".mdl-button.close").click(function(){
            $(checkbox).parent().parent().find(".card-img-top, .card-body").css('opacity', '1');
            $(checkbox).parent().parent().find(".complete-img").remove();
            checkbox.prop('checked', false);
         });
        }
        else{
          $(this).parent().siblings().css('opacity', '1');
          $(this).parent().parent().find(".complete-img").remove();
        }
    });

//random list selector
  var p_list = ["action.html", "crime.html", "fantasy_sf.html", "horror.html", "romance.html"];
  var random_list=[];
  for (p=0; p<5; p++) {
  $.get(p_list[p], function(data) {
    var test = $(data);
    var m_title = test.find('.card-title');
    for (var i in m_title) {
      if(typeof(m_title[i].innerHTML) == "string") {
        random_list.push(m_title[i].innerHTML);
        
      }
    }
  })
  };
  $("#random_movie").click(function() {
    var n = Math.floor(Math.random()*random_list.length);
  $("#random_title").text(random_list[n]);
  });