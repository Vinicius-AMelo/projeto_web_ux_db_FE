const WEB_Project = {

    async handleData() {
        const response = await axios.get('/dinners');
        $('.dinner').remove();
        let array = response.data;
        if (!Array.isArray(response.data)) {
            array = [
                {
                    "dinnerId": 3,
                    "menu": "Frango a Parmeggiana",
                    "recordTime": "2023-11-14T19:19:58.021",
                    "employeeId": 1,
                    "employee": null
                },
                {
                    "dinnerId": 5,
                    "menu": "Frango a Parmeggiana",
                    "recordTime": "2023-11-14T19:20:12.88",
                    "employeeId": 1,
                    "employee": null
                },
                {
                    "dinnerId": 7,
                    "menu": "Frango a Parmeggiana",
                    "recordTime": "2023-11-14T19:22:26.804",
                    "employeeId": 1,
                    "employee": null
                },
                {
                    "dinnerId": 9,
                    "menu": "string",
                    "recordTime": "2023-10-14T19:47:10.614",
                    "employeeId": 1,
                    "employee": null
                },
                {
                    "dinnerId": 10,
                    "menu": "Frango a Parmeggiana",
                    "recordTime": "2023-11-14T19:47:46.701",
                    "employeeId": 1,
                    "employee": null
                }
            ]
        }

        let count = 0;
        let manha = 0;
        let almoco = 0;
        let tarde = 0;

        array.forEach((item) => {
            if (this.todayDate(item.recordTime)) {
                count++;
                $('.dinners tbody').append(`
                    <tr class="dinner">
                    <td>${count}</td>
                    <td>${item.employeeId}</td>
                    <td>${item.menu}</td >
                    <td>${this.handleDateFormat(item.recordTime)}</td>
                    </tr >
                `)
            }

            if (item.menu.includes('manhã')) manha++;
            if (item.menu.includes('Almoço')) almoco++;
            if (item.menu.includes('tarde')) tarde++;
        });

        $('.count.manha').html(manha);
        $('.count.almoco').html(almoco);
        $('.count.tarde').html(count);

    },


    async handleSubmit() {
        $('.menu-mobile').on('click', () => $('.menu-list').toggleClass('active'));
        $('#week-cards').on('click', '.day-cards.active button', () => $('#popup-overlay').addClass('active'));

        $('.popup-confirm button').on('click', async event => {
            event.preventDefault();
            let menu = '';
            $('input[type="checkbox"').each((index, item) => {
                console.log(item)
                if (item.checked) menu += `${$(item).attr('data-dinner')}: ${item.value}, `
            })
            const employeeId = 1;
            // const employeeId = Math.floor(Math.random() * (120 - 56 + 1)) + 56;
            const recordTime = this.handleDateTime();
            const body = {
                menu,
                recordTime,
                employeeId
            }
            console.log(body)

            try {
                await axios.post('/dinners', body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                $('#popup-overlay').removeClass('active');
                $('body').append(`<div div class="popup-success" ><p>Refeição registrada com sucesso!</p><span></span></div > `)
                setTimeout(() => $('.popup-success').addClass('countdown'), 10)
                setTimeout(() => {
                    $('.popup-success').remove()
                    $('.day-cards ').removeClass('active')
                    // window.location.href = '/registros';
                }, 3000);


                this.handleData();
            } catch (error) {
                console.log(error)
            }

        })
    },

    async handleWeek() {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

        const dataAtual = new Date();
        const diaSemana = diasSemana[dataAtual.getDay()];

        diasSemana.forEach((item) => {
            $('#week-cards').append(`
                    <span span class="day-cards ${item == diaSemana ? 'active' : ''}" data - weekday="${item}" data - menu="Frango a Parmeggiana" >
                    <p>${item}</p>
                    <button>Registrar Refeição</button>
                </span >
    `)
        });
    },

    handleDateFormat(dataISO) {
        const opcoes = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        const data = new Date(dataISO);
        const formatoDesejado = data.toLocaleDateString('pt-BR', opcoes);

        return formatoDesejado;
    },

    handleDateTime() {
        function gerarHorarioAleatorio() {
            const hora = 12;
            const minutosAleatorios = Math.floor(Math.random() * 16); // entre 0 e 15
            const minutos = 30 + minutosAleatorios;
            return { hora, minutos };
        }

        // Obter a data de hoje
        const dataAtual = new Date();

        // Obter o horário aleatório
        const { hora, minutos } = gerarHorarioAleatorio();

        // Definir a hora na data de hoje
        dataAtual.setHours(hora, minutos, 0, 0);

        // Formatar a data no formato ISO
        const dataFormatadaISO = dataAtual.toISOString();

        return dataFormatadaISO;
    },

    todayDate(dataISO) {
        const dataFornecida = new Date(dataISO);
        const hoje = new Date();

        return (
            dataFornecida.getDate() === hoje.getDate() &&
            dataFornecida.getMonth() === hoje.getMonth() &&
            dataFornecida.getFullYear() === hoje.getFullYear()
        );
    },

    handleMenuButton() {
        $('.menu-list__item a').each((index, item) => {
            if (window.location.href.includes(item.href)) {
                $(item).parent().addClass('active');
            }
        });
    },

    handleLogin() {
        $('#login-form').on('submit', (event) => {
            event.preventDefault();
            if ($('#register').val() == 'admin' && $('#password').val() == 'admin') {
                window.location.href = '/registros';
            } else {
                window.location.href = '/registrar';
            }
        });
    },

    async init() {
        await this.handleData();
        await this.handleSubmit();
        await this.handleWeek();
        this.handleMenuButton();
        this.handleLogin();
    },
};

document.addEventListener('DOMContentLoaded', () => {
    WEB_Project.init();
});

window.WEB_Project = WEB_Project;