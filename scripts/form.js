class Validator{

    constructor() {
        this.validations = [
            'data-max-length',
            'data-required',
            'data-email-validate',
        ]
    }

    //iniciar validação de todos o campos
    validate(form) {

        //resgata validacoes
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }
        
        // pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transform an HTMLcollection -> array
        let inputsArray = [...inputs];

        //loop dos inputs e validacao do que for encontrado
        inputsArray.forEach(function(input){
            //loop em todas as validacoes existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica se a validacao atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {

                    //limpando string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invocar o método
                    this[method](input, value);

                }
            }
        }, this);
    }
    //verifica se um input tem numero maximo de caracteres
    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `Must have  ${maxValue} caracters`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida emails
    emailvalidate(input) {
        //passando na rejex como o email é escrito
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Please, enter a valide email`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    // imprime a mensagem de erro na tela
    printMessage(input, msg){

        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);

    }

    //verificação de o input está sendo requerido
    required(input){
        let inputValue = input.value;

        if (inputValue === ''){
            let errorMessage = `Please, fill out this field`;

            this.printMessage(input, errorMessage);
        }
    }

    //limpa as validacoes da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("form-id");
let submit = document.getElementById("btn-submit");

let validator =new Validator();

//validations //

submit.addEventListener('click',function(e) {

    e.preventDefault();

    validator.validate(form);
})