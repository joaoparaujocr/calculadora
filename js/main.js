function createCalculator() {
    return {
        display: document.querySelector('#view'),
        btnClear: document.querySelector('#clear'),

        //method
        performAccount(){
            let conta = this.display.value;

            try {
                conta = eval(conta.replace(/×/g, '*').replace(/÷/g, '/'));

                if(conta === 0){
                    this.display.value = conta;
                    return;
                }

                if(!conta){
                    this.display.value = 'ERROR';
                    return;
                }

                this.display.value = conta;
            } catch (error) {
                this.display.value = 'ERROR';
            }
        },

        enterPress(){
            this.display.addEventListener('keypress', (e) => {
                if(e.charCode === 13){
                    this.performAccount();
                }
            })
        },

        backSpace() {
            this.display.value = this.display.value.slice(0, -1)
        },

        clearDisplay() {
            this.display.value = ''
        },

        start() {
            this.clickButtons();
            this.clearDisplay();
            this.enterPress();
        },

        clickButtons(){
            document.addEventListener('click', function(e) {
                const el = e.target;
                const elemento = el.classList

                if(elemento.contains('btn-number')) {
                    this.btnForViewer(el.innerText);
                }

                if(el.classList.contains('btn')) {
                    if(elemento.contains('fa-percentage')) this.btnForViewer('%');
                    if(elemento.contains('fa-times')) this.btnForViewer('×');
                    if(elemento.contains('fa-minus')) this.btnForViewer('-');
                    if(elemento.contains('fa-plus')) this.btnForViewer('+');
                    if(elemento.contains('fa-divide')) this.btnForViewer('÷');
                    this.btnForViewer(el.innerText)
                }

                if(el.getAttribute('id') === 'clear') {
                    this.clearDisplay()
                }

                if(el.getAttribute('id') === 'backspace') {
                    this.backSpace();
                }

                if(el.getAttribute('id') === 'equals') {
                    this.performAccount();
                }
            }.bind(this));
        },

        btnForViewer(value) {
            this.display.value += value;
        }
    };
}

const calculator = createCalculator()
calculator.start();