/* FUNÇÕES DO TEMA E DE USO GERAL DO APP */
 
var $FB = {}; // Superglobal do Firebase

// Construtor de configuração do App
var conf = {

    // Conexão com armazenamento local
    conn : function(){
        return window.localStorage
    },

    // Obtém configurações locais do App
    getAll : function(){
        return JSON.parse(conf.conn().getItem(localStorageKeyName)); // Transforma JSON em objeto
    },

    // Obtém uma configuração local do App
    get : function(key){
        return this.getAll()[key];
    },

    // Altera uma configuração local do App
    set : function(key, value){
        config = this.getAll();
        config[key] = value;
        this.conn().setItem(localStorageKeyName, JSON.stringify(config));
    },

    // Retorna para as configurações iniciais
    reset : function(){
        this.conn().removeItem(localStorageKeyName);
        this.conn().setItem(localStorageKeyName, JSON.stringify(initialConfig));
        return initialConfig;
    }
}

// 'Control' do menu principal
function toggleMenu(){
    if($('nav').attr('class') == 'slideOn'){ // Se o menu está aparecendo...
        menuOff(); // Ocuta
    } else { // Se o menu está oculto...
        menuOn(); // Mostra
    }
}

// Mostra o menu principal
function menuOn(){
    $('nav').attr('class', function(){ // Altera a classe do menu
        $('#menuModal').fadeIn('fast'); // Mostra o fundo do menu com fade
        $('#menu').addClass('rotateMenuBtn'); // Adiciona classe que rotaciona o botão
        return 'slideOn'; // Aplica classe que desloca o menu para a direita, exibindo-o
    });
}

// Oculta menu principal
function menuOff(){
    $('nav').attr('class', function(){ // Altera a classe do menu
        $('#menuModal').fadeOut('fast'); // Esconde fundo do menu com fade
        $('#menu').removeClass('rotateMenuBtn'); // Remove classe que rotaciona o botão
        return 'slideOff'; // Aplica classe que desloca o menu para a esquerda, escondendo
    });
}

// Login de usuário pelo Firebase Auth
function loginUser(){
    firebase.auth().signInWithRedirect(provider1);
}

// Logout de usuário pelo firebase Auth
function logoutUser(){
    firebase.auth().signOut();
    history.go(0);
}

// Mostra no tema quando usuário não está logado
function noUserIn(){

    // Modifica o header para o default
    $('#headerUser').html('<img src="img/nouser.png" alt="Entrar" title="CLique para entrar">');
    $('#headerUser').attr({'href':'#login','target':'_none'});

    // Modifica o menu para o default
    $('#menuProfile a').html(`<img src="img/nouser.png" alt="Entrar" title="CLique para entrar"><span>Fazer login</span>`);
    $('#menuProfile').hide('fast');
    $('#menuLoginout').html('<i class="fas fa-fw fa-sign-in-alt"></i> Login / Entrar');
    $('#menuLoginout').attr('href','#login');
}

// Mostra no tema quando usuário está logado
function userIn(user){

    // Obtém nome de usuário logado abreviado, se necessário
    abbrName = (user.displayName.length > 20) ? user.displayName.substr(0, 20) + '...' : user.displayName;

    // Mostra usuário no header
    $('#headerUser').html(`<img src="${user.photoURL}" alt="${user.displayName}" title="Clique para ver seu perfil.">`);
    $('#headerUser').attr({'href':'https://profiles.google.com/','target':'_blank'});

    // Mostra usuário no menu
    $('#menuProfile a').html(`<img src="${user.photoURL}" alt="${user.displayName}" title="Clique para ver seu perfil."><span title="${user.displayName}">${abbrName}</span>`);
    $('#menuProfile').show('fast');

    // Troca menu login por menu logout
    $('#menuLoginout').html('<i class="fas fa-fw fa-sign-out-alt"></i> Logout / Sair');
    $('#menuLoginout').attr('href','#logout');
}

// Obtém a data formatada em YYYY-MM-DD HH:II:SS
function agoraDb(myDate = ''){
    if(myDate == '') n = new Date(); // Obtém a data atual
    else n = new Date(myDate); // Obtém uma data específica
    y = n.getFullYear(); // Obtém o ano
    m = n.getMonth(); // Obtém o mês
    d = n.getDate(); // Obtém o dia do mês
    h = n.getHours(); // Obtém as horas
    i = n.getMinutes(); // Obtém os minutos
    s = n.getSeconds(); // obtém os segundos
    if(m < 10) m = `0${m}`; // Lead zeros do mês
    if(d < 10) d = `0${d}`; // Lead zeros do dia do mês
    if(h < 10) h = `0${h}`; // Lead zeros das horas
    if(i < 10) i = `0${i}`; // Lead zeros dos minutos
    if(s < 10) s = `0${s}`; // Lead zeros dos segundos
    return `${y}-${m}-${d} ${h}:${i}:${s}`; // Formata saída como YYYY-MM-DD HH:II:SS
}

// Função padrão para 'sanitizar' os valores dos campos
function sanitiza(texto) { 
	// Limpa espaços antes e depois da string
	texto = texto.trim();

	// Limpa espaços duplicados dentro da string
	while(texto.indexOf('  ') != -1) { // Quando achar um espaço duplo
		texto = texto.replace('  ', ' '); // substitui por um espaço simples
	}

	// Altera caracteres indesejados(usando expressão regular) 
	texto = texto.replace(/&/g, '&amp;'); /* Caractere '&' */
	texto = texto.replace(/</g, '&lt;'); /* Caractere '<' */
	texto = texto.replace(/>/g, '&gt;'); /* Caractere '>' */
	texto = texto.replace(/"/g, '&quot;'); /* Caractere '"' */

	// Retorna string 'limpa'
	return texto;
}

// Função para validar somente letras (usando expressão regular e match())
function soLetras(texto) { 
	if(texto.match(/[^a-zà-ú ]/gi)) { 
		return false;
	}
	return true;
}

// Função para validar um endereço de e-mail(usando expressão regular e match())
function isMail(texto) { 
	if(texto.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/)) {
		return true;
	}
	return false;
}