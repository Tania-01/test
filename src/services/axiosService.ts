
import axios from "axios";
import {baseURL} from "../constant/urls";


const axiosServices = axios.create({
    baseURL,
});


export {axiosServices}