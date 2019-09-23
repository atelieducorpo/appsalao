/* TRATAMENTO DE ROTAS E LINKS DO APP */

function routing(){

    // Onde cliquei
    var href = $(this).attr('href');
    var target = $(this).attr('target');

    //console.log(href, ' / ', target);

    if(target == '_blank') return true;
    else if(target == '_none') return false;
    else {
        var page = 'html/' + href.substr(1) + '.html';
        //console.log(page);
        $.get(page, function(dataReturn){
            $('main').html(dataReturn);
            menuOff();
        });
    }

    return false;
}