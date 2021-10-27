function createCalculator() {
    return {
        view: document.querySelector('#view'),
        start() {
            this.view.focus();
            this.clickButtons();
            this.keyPress();
        },
        keyPress() {
            this.view.addEventListener('keypress', (e) => {
                if(e.charCode === 12){
                    this.start();
                }
            })
        },
        doCalculation() {
            let valueCalc = this.view.value;
            valueCalc = eval(valueCalc.replace(/×/g, '*').replace(/÷/g, '/'));
            try {
                if(valueCalc === 0){
                    this.view.value = '0';
                }
                
                if(!valueCalc){
                    this.view.value = 'Error';
                }

                this.view.value = valueCalc;
            } catch (error) {
                this.view.value = 'Error'
            }
        },
        clickButtons(){
            document.addEventListener('click', (e) => {
                const elementClick = e.target;
                if(elementClick.classList.contains('btn-number')){
                    this.view.value += elementClick.innerText;
                }

                if(elementClick.classList.contains('btn')) {
                    const elId = elementClick.getAttribute('id')
                    switch (elId) {
                        case 'minus':
                            this.view.value += '-'
                            break;

                        case 'plus':
                            this.view.value += '+'
                            break;

                        case 'divide':
                            this.view.value += '÷'
                            break;

                        case 'times':
                            this.view.value += '×'
                            break;

                        case 'percentage':
                            this.view.value += '%'
                            break;

                        case 'clear':
                            this.view.value = '';
                            break;

                        case 'backspace':
                            this.view.value = this.view.value.slice(0, -1);
                            break;

                        case 'equals':
                            this.doCalculation();
                            break;
                        default:
                            break;
                    }
                }
            })
        }
    }
}

const calculator = createCalculator();
calculator.start();
