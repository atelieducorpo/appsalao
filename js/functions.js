/* FUNÇÕES DO TEMA E DE USO GERAL DO APP */
 
var $FB = {}; // Superglobal do Firebase

// Construtor de configuração do App
var conf = {

    // Configurações locais iniciais do App
    initial : initialConfig,

    // Configuração da conexão com o Google Firebase
    fireConfig : firebaseConfig,

    // Chave do armazenamento que contém a configuração local do App
    name : localStorageKeyName,

    // Conexão com armazenamento local
    conn : function(){
        return window.localStorage
    },

    // Obtém configurações locais do App
    getAll : function(){
        return JSON.parse(conf.conn().getItem(this.name)); // Transforma JSON em objeto
    },

    // Obtém uma configuração local do App
    get : function(key){
        return this.getAll()[key];
    },

    // Altera uma configuração local do App
    set : function(key, value){
        config = this.getAll();
        config[key] = value;
        this.conn().setItem(this.name, JSON.stringify(config));
    },

    // Retorna para as configurações iniciais
    reset : function(){
        this.conn().removeItem(this.name);
        this.conn().setItem(this.name, JSON.stringify(this.initial));
        return this.initial;
    },

    // Google Firebase
    fireStart : function(){
        firebase.initializeApp(this.fireConfig); // Inicializa firebase
        $FB.db = firebase.firestore(); // Inicializa Firestore
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

// Identifica usuário logado no menu e na barra superior
function userStatus(){
    var user = conf.get('user');
    if(user.email !== ''){
        abbrName = (user.name.length > 20) ? user.name.substr(0, 20) + '...' : user.name;
        $('#headerUser').html(`<img src="${user.photo}" alt="${user.name}" title="Clique para ver seu perfil.">`);
        $('#headerUser').attr({'href':'https://profiles.google.com/','target':'_blank'});
        $('#menuProfile a').html(`<img src="${user.photo}" alt="${user.name}" title="Clique para ver seu perfil."><span title="${user.name}">${abbrName}</span>`);
        $('#menuProfile').show('fast');
        $('#menuLoginout').html('<i class="fas fa-fw fa-sign-out-alt"></i> Logout / Sair');
        $('#menuLoginout').attr('href','#logout');
    } else {
        $('#headerUser').html('<img src="img/nouser.png" alt="Entrar" title="CLique para entrar">');
        $('#headerUser').attr({'href':'#login','target':'_none'});
        $('#menuProfile a').html(`<img src="img/nouser.png" alt="Entrar" title="CLique para entrar"><span>Fazer login</span>`);
        $('#menuProfile').hide('fast');
        $('#menuLoginout').html('<i class="fas fa-fw fa-sign-in-alt"></i> Login / Entrar');
        $('#menuLoginout').attr('href','#login');
    }
}

// Faz login de um usuário
function loginUser(){
    /******************* REMOVER * LOGIN * FAKE **********************/
    var user = {
        name : 'Joca da Silva Souza de Castro Siriliano Queiróz Javaijunto',
        email : 'joca@silva.com',
        photo : 'img/jocasilva.jpg'
    }
    conf.set('user', user);
    userStatus();
    menuOff();
}

// Faz logout de um usuário
function logoutUser(){
    /******************* REMOVER * LOGOUT * FAKE **********************/
    var user = {
        name : '',
        email : '',
        photo : ''
    }
    conf.set('user', user);
    userStatus();
    menuOff();
}

// Obtém a data formatada em YYYY-MM-DD HH:II:SS
function agoraDb(myDate = ''){
    if(myDate == '') n = new Date()
    else n = new Date(myDate);
    y = n.getFullYear();
    m = n.getMonth();
    d = n.getDate();
    h = n.getHours();
    i = n.getMinutes();
    s = n.getSeconds();
    if(m < 10) m = `0${m}`;
    if(d < 10) d = `0${d}`;
    if(h < 10) h = `0${h}`;
    if(i < 10) i = `0${i}`;
    if(s < 10) s = `0${s}`;
    return `${y}-${m}-${d} ${h}:${i}:${s}`;
}

// Função padrão para 'sanitizar' os valores dos campos
function sanitiza(texto) { 
	// Limpa espaços antes e depois da string
	texto = texto.trim();

	// Limpa espaços duplicados dentro da string
	while(texto.indexOf('  ') != -1) { 
		texto = texto.replace('  ', ' ');
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