const WEB_Project = {

    async handleData() {
        const response = await axios.get('https://projeto_web_ux_db_be.railway.internal/dinners');
        console.log(response.data)
    },

    async init() {
      await this.handleData();s
    },
};

document.addEventListener('DOMContentLoaded', () => {
    WEB_Project.init(); 
});

window.WEB_Project = WEB_Project;