$(document).ready(function () {
    $('input[name=tel]').mask('(00) 00000-0000')
});

$('textarea[name=description]').val('');
$('legend').html('0/500');


$('textarea[name=description]').keyup(() => {
    let count = $('textarea[name=description]').val().length

    $('legend').html(`${count}/500`);
});

$('#form-send-mail').submit((e) => {
    e.preventDefault();

    Swal.fire({
        icon: "info",
        title: "Aguarde",
        text: "Enviando email...",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
    Swal.showLoading()

    const greetings = getGreetings();

    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const api_key = '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';

    const headers = {
        Accept: "application/json",
        "Content-Type": 'application/json',
        "api-key": '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',
        charset: "iso-8859-1"
    }

    const to = [{
        email: "iramaroliveira1@hotmail.com",
        name: "Boa Saúde",
    }];

    const params = {
        name: $('input[name=name]').val(),
        tel: $('input[name=tel]').val(),
        email: $('input[name=email]').val(),
        subject: $('select[name=subject]').val(),
        description: $('textarea[name=description]').val(),
        greetings: greetings
    }

    const sender = {
        email: $('input[name=email]').val(),
    };

    const data = {
        sender: sender,
        to: to,
        params: params,
        templateId: 1
    };


    setTimeout(() => {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            headers: headers,
        }).then(() => {
            Swal.close();

            Swal.fire({
                icon: 'success',
                title: 'Tudo Certinho :)',
                text: 'Email enviado com sucesso.',
                allowEscapeKey: false,
                allowOutsideClick: false,
            })

            $('#form-send-mail').trigger('reset');
            $('textarea[name=description]').val('');
            $('legend').html('0/500');
        }).catch(() => {
            Swal.close();

            Swal.fire({
                icon: "error",
                title: "Ocorreu um erro :(",
                text: "Entre em contato com suporte via WhatsApp (71) 99999-9999",
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
        });
    }, 1000);
});

function getGreetings() {
    let greetings = ['Boa madrugada', 'Bom dia', 'Boa tarde', 'Boa noite'];
    let hours = new Date().toLocaleTimeString('pt-BR', { hour: 'numeric', hour12: false });
    return greetings[(hours / 6) >> 0];
}
