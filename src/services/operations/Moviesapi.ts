import { apiConnector } from "../apiConnector"
import { movieEndPoints } from "../apis";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


export const fetchMovies = async () => {
    const { All_Movies_API } = movieEndPoints;

    try {
        const response = await apiConnector({
            method: "GET",
            url: All_Movies_API,

        });
        // console.log("ALL_Movies API RESPONSE............", response.data.allMovie);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data.allMovie;

    }
    catch (error) {
        console.log("ALL_Movies API ERROR............", error);
    }
}

export const fetchFavMovie = async (token: string) => {
    const { Fav_Movies_API } = movieEndPoints;
    try {
        const response = await apiConnector({
            method: "GET",
            url: Fav_Movies_API,
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`Fav_MOVIE_API....`, response)
        return response;
    }
    catch (err) {
        console.log("FAV_Movies API ERROR............", err);
    }
}




export const addFavMOvie = async (token: string, _id: string) => {
    const { Add_Fav_Movie_API } = movieEndPoints;
    // Add_Fav_Movie_API.push(`/${_id}`)
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${Add_Fav_Movie_API}/${_id}`,
            headers: { Authorization: `Bearer ${token}` },

        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`add_Fav_MOVIE_API....`, response)
        toast.success(response.data.message)
        return response;
    }
    catch (err) {
       // console.log("ADD_COMMENT_Movies API ERROR............", err);
       if(err instanceof AxiosError){
        toast.error(err.response?.data.message)
    }
    }

}


export const removeFavMovie = async(token:string,_id:string)=>{
    const { REMOVE_Fav_Movie_API } = movieEndPoints;
    // Add_Fav_Movie_API.push(`/${_id}`)
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${REMOVE_Fav_Movie_API}/${_id}`,
            headers: { Authorization: `Bearer ${token}` },

        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`REMOVE_Fav_MOVIE_API....`, response)
        toast.success(response.data.message)
        return response.data.favMovies;
    }
    catch (err) {
        // console.log("ADD_COMMENT_Movies API ERROR............", err);
        if(err instanceof AxiosError){
            toast.error(err.response?.data.message)
        }
    }
}


export const addCommnet=async(token:string,_id:string,text:string,rating:string)=>{
    const { ADD_COMMENT_API } = movieEndPoints;
    // Add_Fav_Movie_API.push(`/${_id}`)
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${ADD_COMMENT_API}/${_id}`,
            bodyData:{text,rating},
            headers: { Authorization: `Bearer ${token}` },

        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`ADD_COMMENT_MOVIE_API....`, response)
        toast.success(response.data.message)

    }
    catch (err) {
        // console.log("ADD_COMMENT_Movies API ERROR............", err);
        if(err instanceof AxiosError){
            toast.error(err.response?.data.message)
        }
    }
}