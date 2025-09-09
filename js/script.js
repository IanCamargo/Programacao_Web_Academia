document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('countryCode');

    // Mapeamento de formatos de telefone por código de país, incluindo minLength e maxLength
    const phoneFormats = {
        '+55': { regex: /^(\d{2})\s?(\d{4,5})-?(\d{4})$/, format: '(XX) XXXX-XXXX', example: '(11) 99999-9999', minLength: 10, maxLength: 11 }, // Brasil (DDD + 8 ou 9 dígitos)
        '+1': { regex: /^(\d{3})\s?(\d{3})-?(\d{4})$/, format: '(XXX) XXX-XXXX', example: '(123) 456-7890', minLength: 10, maxLength: 10 }, // EUA/Canadá
        '+44': { regex: /^(\d{2})\s?(\d{4})\s?(\d{4})$/, format: 'XX XXXX XXXX', example: '01 2345 6789', minLength: 10, maxLength: 10 }, // Reino Unido
        '+351': { regex: /^(\d{3})\s?(\d{3})\s?(\d{3})$/, format: 'XXX XXX XXX', example: '912 345 678', minLength: 9, maxLength: 9 }, // Portugal
        '+49': { regex: /^(\d{2,5})\s?(\d{4,8})$/, format: 'XX XXXX XXXX', example: '30 1234 5678', minLength: 7, maxLength: 11 }, // Alemanha (variável)
        '+33': { regex: /^(\d{1})\s?(\d{2})\s?(\d{2})\s?(\d{2})\s?(\d{2})$/, format: 'X XX XX XX XX', example: '0 12 34 56 78', minLength: 9, maxLength: 9 }, // França
        '+81': { regex: /^(\d{2})\s?(\d{4})\s?(\d{4})$/, format: 'XX XXXX XXXX', example: '03 1234 5678', minLength: 10, maxLength: 10 }, // Japão
        '+86': { regex: /^(\d{3})\s?(\d{4})\s?(\d{4})$/, format: 'XXX XXXX XXXX', example: '138 1234 5678', minLength: 11, maxLength: 11 }, // China
        '+91': { regex: /^(\d{5})\s?(\d{5})$/, format: 'XXXXX XXXXX', example: '98765 12345', minLength: 10, maxLength: 10 }, // Índia
        '+61': { regex: /^(\d{1})\s?(\d{4})\s?(\d{4})$/, format: 'X XXXX XXXX', example: '0 1234 5678', minLength: 9, maxLength: 9 }, // Austrália
        '+54': { regex: /^(\d{2})\s?(\d{4})\s?(\d{4})$/, format: 'XX XXXX XXXX', example: '11 1234 5678', minLength: 10, maxLength: 10 }, // Argentina
        '+52': { regex: /^(\d{2})\s?(\d{4})\s?(\d{4})$/, format: 'XX XXXX XXXX', example: '55 1234 5678', minLength: 10, maxLength: 10 }, // México
    };

    // Validação de nome (apenas letras e espaços)
    nameInput.addEventListener('input', function() {
        const regex = /^[A-Za-zÀ-ú\s]+$/;
        if (!regex.test(nameInput.value) && nameInput.value !== '') {
            nameInput.setCustomValidity('O nome deve conter apenas letras e espaços.');
        } else {
            nameInput.setCustomValidity('');
        }
        nameInput.reportValidity();
    });

    // Função para formatar e validar o telefone
    function formatAndValidatePhoneNumber() {
        let value = phoneInput.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        const countryCode = countryCodeSelect.value;
        const format = phoneFormats[countryCode];

        if (format) {
            // Define o maxlength do input com base no formato do país
            phoneInput.maxLength = format.maxLength;

            // Aplica a formatação baseada na regex e no formato definido
            const match = value.match(format.regex);
            if (match) {
                let formatted = format.format;
                for (let i = 1; i < match.length; i++) {
                    formatted = formatted.replace(/X+/, match[i]);
                }
                phoneInput.value = formatted;
                phoneInput.setCustomValidity(''); // Limpa qualquer erro de validação anterior
            } else {
                // Se não corresponder ao formato, tenta aplicar uma formatação básica ou limpa
                phoneInput.value = value;
                // Validação de comprimento
                if (value.length < format.minLength || value.length > format.maxLength) {
                    phoneInput.setCustomValidity(`O telefone deve ter entre ${format.minLength} e ${format.maxLength} dígitos.`);
                } else {
                    phoneInput.setCustomValidity('');
                }
            }
            phoneInput.placeholder = format.example;
        } else {
            phoneInput.value = value; // Sem formatação se não houver formato definido
            phoneInput.placeholder = 'Digite o telefone';
            phoneInput.maxLength = ''; // Remove o maxlength se não houver formato
            phoneInput.setCustomValidity('');
        }
        phoneInput.reportValidity();
    }

    // Event listeners para formatação e validação do telefone
    phoneInput.addEventListener('input', formatAndValidatePhoneNumber);

    countryCodeSelect.addEventListener('change', function() {
        phoneInput.value = ''; // Limpa o campo ao mudar o código do país
        formatAndValidatePhoneNumber();
    });

    // Inicializa o placeholder e o maxlength ao carregar a página
    formatAndValidatePhoneNumber();
});


