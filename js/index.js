/* SCRIPTS DO TEMA */
 
/* Constructor - Comente ou remova as linhas 'console.log' quando o App estiver pronto! */
var app = {
    // Inicialização do jQuery, Firebase e Cordova (em breve)
    start: function(){
        console.log('1) Inicializando App...');

        $(document).ready(this.config); // Inicializando jQuery
    },

    // Configura o app
    config: function(){
        console.log('2) Configurando App...');

        // Configuração inicial local do App
        var config = conf.getAll(); // Obtém configurações
        if(!config) config = conf.reset(); // Se não existem, inicia com default
            
        // Configura jQuery AJAX CrossDomain para rotas no Android
		$.ajaxPrefilter( 'text html json script xml', function(options){
            options.crossDomain = true;
        });

        // Verifica se tem usuário logado
        firebase.auth().onAuthStateChanged(function(userData) {
            if (userData) {
                user = userData;
                userIn(user); // Mostra usuário logado no tema
            }
        });

        // Executa App
        app.run();
    },

    // Prepara e executa o app que está na função 'runApp()'
    run: function(){
        console.log('3) Executando o App...');

        // Aplicar tema pré-configurado
        $('main').attr('class', conf.get('tema'));

        // Executa tratamento de eventos
        runApp();
    }
}

// Tratamento de eventos do App
function runApp(){

    // Carregar html/home.html
    //$.get('html/contatos.html', function(htmlHome){ /*************************** REMOVER ********************************/
    $.get('html/home.html', function(htmlHome){
        $('main').html(htmlHome);
    });

    // Ocultar Splash Screen 500 milissegundos após iniciar App
    // $('#splashScreen').hide(0); /*************************** REMOVER ********************************/
    setTimeout(function(){
        $('#splashScreen').fadeOut('slow'); // Oculta com fade
    }, 500);

    // Monitorando click/touch no botão do menu principal
    $(document).on('click', '#menu', toggleMenu);

    // Monitorando click/touch no 'menuModal'
    $(document).on('click', '#menuModal', menuOff);

    // Monitorando links para virar rotas
    $(document).on('click', 'a', routing);

    // Monitorando botões logout
    $(document).on('click', 'a[href="#logout"]', logoutUser);

    // Monitorando botões login
    $(document).on('click', 'a[href="#login"]', loginUser);

}

// Tudo pronto? Vamos 'rodar' o App
app.start();