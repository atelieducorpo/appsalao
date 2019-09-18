/* SCRIPTS DO TEMA */

/* Constructor - Comente ou remova as linhas 'console.log' quando o App estiver pronto! */
var app = {
    // Inicialização do jQuery e Cordova (em breve)
    start: function(){
        console.log('1) Inicializando App...')
        $(document).ready(this.config);
    },

    // Configura o app (firebase e/ou local)
    config: function(){
        console.log('2) Configurando App...');
        app.run();
    },

    // Executa o app que está na função 'runApp()'
    run: function(){
        console.log('3) Executando o App...');
        runApp();
    }
}

/* 'Control' do menu principal */
function toggleMenu(){
    if( $('nav').attr('class') == 'slideOn' ){ // Se o menu está aparecendo...
        $('nav').attr('class', function(){ // Altera a classe do menu
            $('#menuModal').fadeOut('fast'); // Esconde fundo do menu com fade
            $('#menu').removeClass('rotateMenuBtn'); // Remove classe que rotaciona o botão
            return 'slideOff'; // Aplica classe que desloca o menu para a esquerda, escondendo
        });
    } else { // Se o menu está oculto...
        $('nav').attr('class', function(){ // Altera a classe do menu
            $('#menuModal').fadeIn('fast'); // Mostra o fundo do menu com fade
            $('#menu').addClass('rotateMenuBtn'); // Adiciona classe que rotaciona o botão
            return 'slideOn'; // Aplica classe que desloca o menu para a direita, exibindo-o
        });
    }
}

// Construtor de eventos do App
function runApp(){

    // Monitorando click/touch no botão do menu principal
    $(document).on('click', '#menu', toggleMenu);

    // Monitorando click/touch no 'menuModal'
    $(document).on('click', '#menuModal', toggleMenu);

}

// Tudo pronto? Vamos 'rodar' o App
app.start();