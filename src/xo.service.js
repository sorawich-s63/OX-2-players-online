import http from "./http-common";

class TodoDataService {
    getAll() {
        return http.get("/xo");
    }

    update(data) {
        return http.put(`/xo`, data);
    }

    deleteAll() {
        return http.delete(`/xo`);
    }

}

export default new TodoDataService();