/* SCRIPTS DO TEMA */

/* Constructor - Comente ou remova as linhas 'console.log' quando o App estiver pronto! */
var app = {
    // InicializaÃ§Ã£o do jQuery e Cordova (em breve)
    start: function(){
        console.log('1) Inicializando App...')
        $(document).ready(this.config);
    },

    // Configura o app (firebase e/ou local)
    config: function(){
        console.log('2) Configurando App...');

        // Simulando um usuÃ¡rio logado
        var user = {
            name : 'Joca da Silva Souza de Castro Siriliano QueirÃ³z Javaijunto',
            email : 'joca@silva.com',
            photo : 'img/jocasilva.jpg'
        };

        const store = window.localStorage; // ConexÃ£o com armazenamento local
        var configData = store.getItem('config'); // Ler as configuraÃ§Ãµes do armazenamento local 
        if(!configData) { // Se nÃ£o tem dados no armazenamento local
            // Cria configuraÃ§Ã£o default
            var config = {
                tema : 'light'
            };
            store.setItem('config', JSON.stringify(config)); // Gravar o JSON no armazenamento local
        } else { // Se tem os dados no armazenamento local
            var config = JSON.parse(configData); // Transforma JSON em objeto
        }
            
        // Configura jQuery AJAX CrossDomain para rotas no Android
		$.ajaxPrefilter( 'text html json script xml', function(options){
            options.crossDomain = true;
        });



        // Executa App
        app.run(config, user);
    },

    // Executa o app que estÃ¡ na funÃ§Ã£o 'runApp()'
    run: function(config, user){
        console.log('3) Executando o App...');

        // Aplicar tema prÃ©-configurado
        $('main').attr('class', config.tema);

        // Exibindo usuÃ¡rio no menu e na barra superior
        var nomeAbreviado = user.name;
        if(user.name.length > 20) {
            nomeAbreviado = user.name.substr(0, 20) + '...';
        }
        var userMenuView = `
        <div class="userMenu">
            <img src="${user.photo}" alt="${user.name}">
            <span title="${user.name}">${nomeAbreviado}</span>
        </div>
        `;
        $('#userThings').attr({'href':'https://profiles.google.com/', 'target':'_blank'});
        $('#userThings').html(userMenuView);
        $('#userThings').addClass('userLogged');
        $('#btnUser').html(`<img src="${user.photo}" alt="${user.name}" title="Ver meu perfil">`);
        $('#btnUser').attr({'href':'https://profiles.google.com/', 'target':'_blank'});

        // Executa tratamento de eventos
        runApp();
    }
}

/* 'Control' do menu principal */
function toggleMenu(hideMenu){
    if( $('nav').attr('class') == 'slideOn'){ // Se o menu estÃ¡ aparecendo...
        menuOff();
    } else { // Se o menu estÃ¡ oculto...
        menuOn();
    }
    return false;
}

// Mostra o menu
function menuOn(){
    $('nav').attr('class', function(){ // Altera a classe do menu
        $('#menuModal').fadeIn('fast'); // Mostra o fundo do menu com fade
        $('#menu').addClass('rotateMenuBtn'); // Adiciona classe que rotaciona o botÃ£o
        return 'slideOn'; // Aplica classe que desloca o menu para a direita, exibindo-o
    });
}

// Oculta menu
function menuOff(){
    $('nav').attr('class', function(){ // Altera a classe do menu
        $('#menuModal').fadeOut('fast'); // Esconde fundo do menu com fade
        $('#menu').removeClass('rotateMenuBtn'); // Remove classe que rotaciona o botÃ£o
        return 'slideOff'; // Aplica classe que desloca o menu para a esquerda, escondendo
    });
}

// Tratamento de eventos do App
function runApp(){

    // Carregar html/home.html
    $.get('html/home.html', function(htmlHome){
        $('main').html(htmlHome);
    });

    // Ocultar Splash Screen 500 milissegundos apÃ³s iniciar App
    setTimeout(function(){
        $('#splashScreen').fadeOut('slow'); // Oculta com fade
    }, 500);    

    // Monitorando click/touch no botÃ£o do menu principal
    $(document).on('click', '#menu', toggleMenu);

    // Monitorando click/touch no 'menuModal'
    $(document).on('click', '#menuModal', menuOff);

    // Monitorando links para virar rotas
    $(document).on('click', 'a', routing);

}

// Tudo pronto? Vamos 'rodar' o App
app.start();