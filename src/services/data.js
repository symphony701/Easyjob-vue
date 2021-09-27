import axios from 'axios';

class LinkService {
    local = "http://localhost:3000"
    LinkService() {}
    async getProyectById(id) {
        const request = await axios.get(`${this.local}/proyects?id=${id}`)
        const respuesta = request.data
        return respuesta

    }
    async getProfileById(id) {
        const request = await axios.get(`${this.local}/profile?idprofile=${id}`)
        const respuesta = await request.data
        console.log(respuesta)
        return respuesta

    }
}

export default new LinkService();