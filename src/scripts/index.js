const WEB_Project = {

    async handleData() {
        const response = await axios.get('http://localhost:5232/dinners');
        console.log(response.data)
    },

    async init() {
      await this.handleData();
    },
};

document.addEventListener('DOMContentLoaded', () => {
    WEB_Project.init(); 
});

window.WEB_Project = WEB_Project;