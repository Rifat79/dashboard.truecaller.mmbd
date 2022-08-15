import axios from "axios";
import { URL } from "./action";

export const uploadImageBase64 = async (access_token, uid, image) => {
    try {
        const { data: response } = await axios({
            method: 'POST',
            url: URL.UPLOAD_IMAGE_BASE64,
            headers: {

            },
            data: {
                field_name: "product_gallery",
                image
            }
        });

        return response;
    } catch (err) {
        return {
            success: false,
            status_code: 5001,
            message: err.message
        };
    }
};
export const uploadImageFile = async (file) => {
    try {
        let formData = new FormData();
        formData.append('image', file);
        formData.append('field_name', `product_gallery`);
        const { data: response } = await axios({
            method: 'POST',
            url: URL.UPLOAD_IMAGE_FILE,
            data: formData
        });

        return response;
    } catch (err) {
        return {
            success: false,
            status_code: 5001,
            message: err.message
        };
    }
};

export const queryRequest = async (url, data) => {
    try {
        const { data: response } = await axios({
            method: 'POST',
            url: url,
            data: data
        });

        return response;
    } catch (err) {
        return {
            success: false,
            status_code: 5001,
            message: err.message
        };
    }
};
export const getQueryRequest = async (url) => {
    try {
        const { data: response } = await axios({
            method: 'GET',
            url: url,
        });

        return response;
    } catch (err) {
        return {
            success: false,
            status_code: 5001,
            message: err.message
        };
    }
};