/**
 * table paginating
 * Created by jackho on 2/27/14.
 * 
 * how to use :
 * $(selected table).paginate();
 * with paginate.css
 * 
 * Need to refresh by $.ajax complete 
 * or wherever you rebuild your container 
 */
(function($) {  // Protecting the $ Alias and Adding Scope

        
        
        $.fn.paginate = function(options) {

          //default
          var settings = $.extend({
              //how many rows you want to show in a page
              rowsPage : 1

          },options);
          
          
          
    
          return this.each(function() {
                var rowsPage = settings.rowsPage;
                var $table = $(this);          
                var totalRows = $table.find("tr:gt(0)").length;
                //numPage = lastPage number
                var numPages = Math.ceil(totalRows/rowsPage);
                /**********************Initiate navigator **************************/
                //show first page
                $table.find("tr:gt(0)").hide().slice(0, rowsPage).show();
                createNavigator();
                hideNavigator(1);

                //first nav addClass
                $("#nav a[name='showPage']:first").addClass('activeSlide');
               
                /**********************End Initiate navigator**************************/
                
                /**********************navigator on click**************************/
                $("#nav a").off();
                $("#nav a[name='showPage']").click(function(event) {
                    event.preventDefault();

                    $('#nav a').removeClass('activeSlide');
                    $(this).addClass('activeSlide');
                    var currPage = $(this).attr('rel');
                    hideNavigator(currPage);
                    setCurrentPage(currPage);
                    
                });
                /**********************navigator firstPage**************************/
                $("#nav a[name='firstPage']").click(function(event) {
                    event.preventDefault();

                    $('#nav a').removeClass('activeSlide');
                    //to first page 0
                    $("#nav a[name='showPage']:first").addClass('activeSlide');
                    hideNavigator(1);
                    setCurrentPage(1);

                    
                });
                /**********************navigator lastPage**************************/
                $("#nav a[name='lastPage']").click(function(event) {
                    event.preventDefault();

                    $('#nav a').removeClass('activeSlide');
                    //to last Page = numPages
                    $("#nav a[name='showPage']:last").addClass('activeSlide');
                    var lastPage = numPages;
                    hideNavigator(lastPage);
                    setCurrentPage(lastPage);

                });
                /**********************navigator prevPage**************************/
                $("#nav a[name='prevPage']").click(function(event) {
                    event.preventDefault();

                    var currPage = $(".activeSlide").attr('rel');

                    console.log(currPage);
                    
                    if((parseInt(currPage)-1) !== 0){
                      var prevPage = parseInt(currPage)-1;
                    
                      $('#nav a').removeClass('activeSlide');

                      $("#nav a[rel="+prevPage+"]").addClass('activeSlide');

                      hideNavigator(prevPage);
                      setCurrentPage(prevPage);
                    }
                });
                
                /**********************navigator nextPage**************************/
                $("#nav a[name='nextPage']").click(function(event) {
                    event.preventDefault();
                    var currPage = parseInt($(".activeSlide").attr('rel'));

              
                    if(currPage !== numPages){
                        

                        var nextPage = parseInt(currPage)+1;
                       
                        $('#nav a').removeClass('activeSlide');

                        $("#nav a[rel="+nextPage+"]").addClass('activeSlide');
                        hideNavigator(nextPage);
                        setCurrentPage(nextPage);
                    }

                });
                /**********************End navigator click**************************/
                /**************************setCurrentPage****************************/
                function setCurrentPage(currPage){
                  var currPage = currPage-1 ;
                  var begin = currPage * rowsPage;
                  var end = begin + rowsPage;
                  
                  $table.find("tr:gt(0)").hide().slice(begin, end).show();
                }
              /**********************create navigator **************************/ 
               function createNavigator(){
                  //remove Navigator
                  $('#nav a').remove(); 

                  //create first , previous page navigator
                  $('#nav').append('<a name="firstPage" href="#"> << </a> ');
                  $('#nav').append('<a name="prevPage"  href="#">  < </a> ');
                  //create showPage navigator
                  for ( i = 1; i <= numPages;i++ ) {
                  var pageNum = i ;  // a number
                  $('#nav').append('<a name="showPage"  href="#" rel="' + i + '">' + pageNum + '</a> ');
                  }//end for
                  //create last , next page navigator
                  $('#nav').append('<a name="nextPage"  href="#"> > </a> ');
                  $('#nav').append('<a name="lastPage"  href="#"> >> </a> ');
                  $('#nav').append('<a >total page:'+numPages+'</a> ');
                  
               }
              /*******************End create navigator **************************/
              /**********************hide navigator **************************/
                function hideNavigator(currPage){
                    //toal Navigator to show
                    var numNav = 10;
                    var numNextPage = 5;
                    var numPrePage = 4 ;
                    //Need to reShow 
                    $("a[name=showPage]").show();              
                    //before page 5 , need to hideNext  variable           
                    //10-currpage(1) =9
                    //10-2 =8
                    //10-3 =7
                    //10-4 =6
                    //10-5 =5
                    var nextDiffernce = numNav-currPage;
                    if(nextDiffernce>5){
                      var hideNext = parseInt(currPage)+parseInt(nextDiffernce);
                    }else{
                      var hideNext = parseInt(currPage)+parseInt(numNextPage);
                    }
                    //lastPage-5 to lastPage ,need to hidePre variable
                    //currpage(69)-69=0
                    //69 - 69 =0 =>-9
                    //69 - 68 =1 =>-8
                    //69 - 67 =2 =>-7
                    //69 - 66 =3 =>-6
                    //69 - 65 =4 =>-5
                    //69 - 64 =5 =>-4
                    var preDifference = numPages-currPage;
                    var toHidePre = numNav-preDifference-1;
                    if(preDifference<5){
                      var hideprev = parseInt(currPage)-parseInt(toHidePre);
                    }else{
                      var hideprev = parseInt(currPage)-parseInt(numPrePage);
                    }            
                    //hide greater than currPage
                    var hidegt = $("a[name=showPage]").map(function(){
             
                          if(this.rel > hideNext){
                            console.log(this.rel > hideNext);
                            return '#nav a[rel='+this.rel+']';
                          }
                    }).get().join(',');
                    //hide less than currPage
                    var hidelt = $("a[name=showPage]").map(function(){
    
                          if(this.rel < hideprev){
                            console.log(this.rel > hideNext);
                            return '#nav a[rel='+this.rel+']';
                          }
                    }).get().join(',');


                    $(hidegt).hide();
                    $(hidelt).hide();
                }
                /**********************End hide navigator **************************/ 
          });//end return             
        };//end paginate

}(jQuery));
