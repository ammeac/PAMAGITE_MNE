document.addEventListener('DOMContentLoaded', function() {
    let left = '';
    let right = '';
    let result = '';
    let op = null;

    const screen = document.querySelector('.result');

    function update() {
        screen.textContent = left + (op ? op : '') + right;
    }

    function digit(val) {
        if (!op) {
            if ((val !== '.') || (val === '.' && !left.includes(val))) {
                left += val;
            }
            update();
        } else {
            if ((val !== '.') || (val === '.' && !right.includes(val))) {
                right += val;
            }
            update();
        }
    }

    document.querySelector('.buttons').addEventListener('click', function(event) {
        if (!event.target.classList.contains('btn')) return;

        const btn = event.target;
        const value = btn.textContent;

        switch (value) {
            case 'C':
                left = '';
                right = '';
                op = null;
                result = '';
                update();
                break;
            case '«':
                if (right !== '') {
                    right = right.slice(0, -1);
                } else if (op) {
                    op = null;
                } else {
                    left = left.slice(0, -1);
                }
                update();
                break;
            case '+':
            case '−':
            case '×':
            case '÷':
                if (left === '' && value != '−') return;
                op = value;
                update();
                break;
            case '=':
                if (left === '' || right === '' || !op) return;

                let num1 = parseFloat(left);
                let num2 = parseFloat(right);

                switch (op) {
                    case '×':
                        result = num1 * num2;
                        break;
                    case '+':
                        result = num1 + num2;
                        break;
                    case '−':
                        result = num1 - num2;
                        break;
                    case '÷':
                        if (num2 === 0) {
                            screen.textContent = 'на 0 не делится';
                            return;
                        }
                        result = num1 / num2;
                        break;
                }

                left = result.toString();
                right = '';
                op = null;
                update();
                break;
            case '%':
                if (left === '') return;
                left = (parseFloat(left) / 100).toString();
                update();
                break;
            case '√':
                if (left === '') return;
                left = Math.sqrt(parseFloat(left)).toString();
                update();
                break;
            case 'x²':
                if (left === '') return;
                left = Math.pow(parseFloat(left), 2).toString();
                update();
                break;
            case 'x!':
                if (left === '') return;
                let num = parseInt(left);
                if (num < 0) {
                    screen.textContent = 'Ошибка';
                    return;
                }
                let fact = 1;
                for (let i = 2; i <= num; i++) {
                    fact *= i;
                }
                left = fact.toString();
                update();
                break;
            case '000':
                digit('000');
                break;
            case '☭':
                const colors = ['red', 'green'];
                let index = 0;
                screen.style.backgroundColor = colors[index];

                 document.querySelector('.buttons').addEventListener('click', function(event) {
                 const button = event.target;
                 const buttonText = button.textContent;
                 if (buttonText == '☭')
                {
                    index = (index + 1) % colors.length;
                    screen.style.backgroundColor = colors[index];
                }
        });
                break;
            default:
                if (!isNaN(parseFloat(value)) || value === '.') {
                    digit(value);
                }
                break;
        }
    });
});