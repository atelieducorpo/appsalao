// Oculta barra superior
$('header').slideUp('fast');

// Marca o campo correto com o tema correto
$('input[value=' + conf.get('tema') + ']').attr('checked', true);

// Monitora botões do tema
$(document).on('click', 'input[name=temaBtn]', mudaTema);

// Monitora botão, quando de login
$(document).on('click', 'a[href="#confLogin"]', loginUser);

// Monitora botão, quando de logout
$(document).on('click', 'a[href="#confLogout"]', logoutUser);

// Exibe status do usuário
if(user.email !== undefined){

    // Obtém nome de usuário logado abreviado, se necessário
    abbrName = (user.displayName.length > 20) ? user.displayName.substr(0, 20) + '...' : user.displayName;

    // Exibe foto e nome do usuário logado
    var userView = `<p>Você está logado(a) como:</p><img src="${user.photoURL}" alt="${user.displayName}"><span title="${user.displayName}">${abbrName}</span><small>${user.displayName}</small>`;
    $('#configUser').html(userView);
    
    // Modifica botão login / logout para logout
    $('#confInOut').attr('href', '#confLogout');
    $('#confInOut').html('<i class="fas fa-fw fa-sign-out-alt"></i> Logout / Sair');
    
} else {

    // Exibe foto do usuário anônimo
    var userView = `<p>Você ainda não fez login!</p><small>Entre com sua conta do Google:</smal>`;
    $('#configUser').html(userView);
    
    // Modifica botão login / logout para login
    $('#confInOut').attr('href', '#confLogin');
    $('#confInOut').html('<img src="img/googleicon.png" alt="Entrar pelo Google"> Login / Entrar');
    
}

// Troca tema
function mudaTema(){
    var tema = $(this).val(); // Obtém o valor do tema selecionado
    $('main').attr('class', tema); // Aplica a classe do tema selecionado
    conf.set('tema', tema); // Altera o tema na configuração
}