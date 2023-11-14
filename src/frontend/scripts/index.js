const WEB_Project = {

    async handleData() {
        const response = await axios.get('/dinners');
        $('.dinners').html('');
        if (!Array.isArray(response.data)) return;
        response.data.forEach((item) => {
            $('.dinners').append(`
                <li>
                    <span><strong>Número da refeição:</strong> ${item.id}</span>
                    <span><strong>Registro do funcionário:</strong> ${item.employeeId}</span>
                    <span><strong>Cardápio do dia:</strong> ${item.menu}</span>
                    <span><strong>Data do registro:</strong> ${item.recordTime}</span>
                </li>
            `)
        });
    },

    async handleSubmit() {
        $('#register-form').on('submit', async event => {
            event.preventDefault();
            const menu = $('#menu option:selected').val();
            const employeeId = parseInt($('#registry-number').val());
            const recordTime = new Date().toISOString();
            const body = {
                    menu,
                    recordTime,
                    employeeId
            }
            console.log(body)

            const response = await axios.post('/dinners', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)

            this.handleData();
        })
    },

    async init() {
      await this.handleData();
      await this.handleSubmit();
    },
};

document.addEventListener('DOMContentLoaded', () => {
    WEB_Project.init(); 
});

window.WEB_Project = WEB_Project;