import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the base URL for the API
const Domain = "https://api.artic.edu/api/v1";

// Define the base route for the API
const Route = `${Domain}`;
const api = axios.create({
    baseURL: Route,

});
const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
};
// Enviar el token en cada solicitud
api.interceptors.request.use(async (config: any) => {
    const token = await getToken(); // Obtener el token de alguna manera
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            const { status, data } = error.response;
            // Manejar el error de acuerdo a la respuesta

            // Verificar el tamaño de la respuesta
            const contentLength = error.response.headers['content-length'];
            const maxSize = 1000000; // Establece el límite en bytes (1MB en este ejemplo)
            if (contentLength && parseInt(contentLength) > maxSize) {
                // La respuesta excede el límite de tamaño permitido, manejarlo adecuadamente
            }
        }

        return Promise.reject(error);
    }
);
// Create an object to hold API methods
const ApiController = {
    // Define a method to GET the server using axios
    getDataByPage: (page: number) => api.get(Route + `/artworks?page=${page}`),
};

// Export the ApiController object as the default export
export default ApiController;
