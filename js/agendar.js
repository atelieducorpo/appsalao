// Oculta barra superior
$('header').slideUp('fast');

// Pré-preenche nome e e-mail de usuário, se logado
if(user !== undefined){
    $('#nome').val(user.displayName);
    $('#email').val(user.email);
}

serv = conf.get('servico');
if(serv !== undefined){
    $('#servico').val(serv);
}

// Monitorando envio do formulário
$(document).on('submit', '#agendar', processaForm);

// Monitorando botão fechar box
$(document).on('click', '#msgErro > span', closeBox);

// Processamento do formulário
function processaForm(){

    // Variável que armazena as mensagens de erro
    var erro = '';

    // Variável que contém o feedback do erro
    var msg = '';

    // Obtendo os valores dos campos já sanitizados
    var formNome = sanitiza($('#nome').val());
    var formEmail = sanitiza($('#email').val());
    var formServico = sanitiza($('#servico').val());
    var formData = sanitiza($('#dataservico').val());
    var formHorario = sanitiza($('#horarioservico').val());

    // Atualizando campos com valores sanitizados
    $('#nome').val(formNome);
    $('#email').val(formEmail);
    $('#servico').val(formServico);
    $('#dataservico').val(formData);
    $('#horarioservico').val(formHorario);

    // Validando nome
    if (formNome.length < 3) {
        erro += '<li>Seu nome está muito curto.</li>';
    } else if (!soLetras(formNome)) {
        erro += '<li>Seu nome tem caracteres inválidos.</li>';
    }

    // Validando e-mail
    if (formEmail.indexOf('@') < 1) {
        erro += '<li>Seu e-mail não é válido.</li>';
    } else if (!isMail(formEmail)) {
        erro += '<li>Seu e-mail não é válido.</li>';
    }

    // Validando assunto
    if (formServico.length < 5) {
        erro += '<li>O serviço não foi preenchido.</li>';
    }

    // Validando assunto
    if (formData.length < 5) {
        erro += '<li>O serviço não foi preenchido.</li>';
    }
    
    // Validando mensagem
    if (formHorario.length < 5) {
        erro += '<li>A mensagem está muito curta.</li>';
    }

    // Se não ocorreram erros...
    if (erro == '') {

        // Quebra nome do remetente pelos espaços
        nome = formNome.split(' ');

        // Enviando para o Firebase, salvando na coleção 'contatos'
        db.collection("agenda").add({
            data: agoraDb(), // Obtém a data de agora, formatada
            nome: formNome,
            email: formEmail,
            servico: formServico,
            data: formData,
            horario: formHorario,
            status: 'recebido'
        })
        .then(function(docRef) { // Se gravou no Firebase
            msg = `
<h3>Olá ${nome[0]}!</h3>
<p>Seu serviço foi agendado com sucesso!</p>
Obrigado...
            `;
            $('#msgFb').html(msg);
            $('#agendar').hide('fast', function(){
                $('#msgFb').show('fast');
            });        
        })
        .catch(function(error) { // Se falhou ao gravar no Firebase
            msg = `
<h3>Ooooops!</h3>
<p>Ocorreram erros ao agendar o seu servico:</p>
<ul><li>Falha no servidor remoto.</li>
<p>A equipe técnica do Atelie du Corpo já foi avisada da falha.</p>
Você pode tentar enviar o formulário novamente, agora ou mais tarde.
            `;
            $('#msgErro').html(msg);
            $('#msgErroBox').show('fast');
        });        

    // Se ocorreram erros...	
    } else {
        // Exibe os erros na página
        msg = `
<span><i class="fas fa-fw fa-times"></i></span>
<h3>Ooops!</h3>
<p>Ocorreram erros ao agendar o seu servico:</p>
<ul>${erro}</ul>
Por favor, corrija os erros e tente novamente.
`;

        $('#msgErro').html(msg);
        $('#msgErroBox').show('fast');
    }

    // De qualquer forma, não faça nada após enviar o formulário
    return false;
}

// Fecha caixa de mensagem de erro
function closeBox(){
    $('#msgErroBox').hide('fast');
}