const WEB_Project = {

    async handleData() {
        const response = await axios.get('/backend');
        response.data.forEach((item) => {
            document.getElementById('json-tree').appendChild(document.createElement('span')).innerHTML = `
                <li><strong>Refeição:</strong> ${item.id}</li>
                <li><strong>Cardápio do dia:</strong> ${item.menu}</li>
                <li><strong>Data:</strong> ${item.recordTime}</li>
                <li><strong>Registro do Funcionário:</strong> ${item.employeeId}</li>
            `;
        });
    },

    async init() {
      await this.handleData();s
    },
};

document.addEventListener('DOMContentLoaded', () => {
    WEB_Project.init(); 
});

window.WEB_Project = WEB_Project;