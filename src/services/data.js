import axios from 'axios';

class LinkService {
    local = "http://localhost:3000";
    headers = {
        "Content-type": "application/json"
    }
    LinkService() {}
    async getProyectById(id) {
        const request = await axios.get(`${this.local}/proyects?id=${id}`)
        const respuesta = request.data
        return respuesta

    }
    async getProfileById(id) {
        const request = await axios.get(`${this.local}/profile?idprofile=${id}`)
        const respuesta = await request.data
        return respuesta

    }
    async getProyectByOwner(id) {
        const request = await axios.get(`${this.local}/proyects?idown=${id}`)
        const respuesta = await request.data
        return respuesta
    }
    async setedit(id, data) {

        try {
            await axios.patch(`${this.local}/proyects/${id}`, data, { headers: this.headers })

        } catch (error) {
            console.log(error)
        }
    }
    async setprofile(id, data) {

        try {
            await axios.patch(`${this.local}/profile/${id}`, data, { headers: this.headers })

        } catch (error) {
            console.log(error)
        }
    }
    async addProyect(titulo, description, idown, repository = "") {

        try {
            const request = await axios.get(`${this.local}/proyects?_sort=id&_order=desc`)
            const respuesta = await request.data
            const id = respuesta[0].id + 1

            const data = {
                "id": id,
                "title": titulo,
                "description": description,
                "idown": idown,
                "linktogithub": repository,
                "evidence": "https://images.ctfassets.net/lzny33ho1g45/learn-html-css-p-img/12978ef50623cf76538cfe18e1011fc5/file.png?w=1520&fm=jpg&q=30&fit=thumb&h=760",
                "img": "https://cdn.vuetifyjs.com/images/cards/cooking.png"

            }

            await axios.post(`${this.local}/proyects`, data)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProyects(id) {
        await axios.delete(`${this.local}/proyects/${id}`)
    }
    async getRepositories(user) {
        const request = await axios.get(`https://api.github.com/users/${user}/repos`)
        const respuesta = await request.data
        return respuesta

    }




}

export default new LinkService();