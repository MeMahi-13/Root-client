import axios from "axios";


const axiosSecure= axios.create({
    baseURL: `https://root-server-nine.vercel.app`
})
const useAxios = () => {
    return axiosSecure;
};

export default useAxios;