import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { uploadImageBase64 } from '../api';
import ImageCropping from './imageCropping';

const defaultSrc = "/media/avatars/blank.png";

const CropperComponents = ({ onCroped, width, height, full, className, src, isRemove = false }) => {
    const [cropperModal, setCropperModal] = useState(false);
    const [image, setImage] = useState(src || defaultSrc);
    const [cropData, setCropData] = useState(src || defaultSrc);
    const [cropper, setCropper] = useState();
    const [cropRatio, setCropRatio] = useState();

    const onChange = (e) => {
        e.preventDefault();
        if (cropper)
            cropper.destroy();

        setCropRatio(width / height)

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            getImageSize(event.target.result, function (imageWidth, imageHeight, mg) {
                if ((imageWidth === width) && (imageHeight === height)) {
                    uploadFileHandler(event.target.result)
                } else {
                    setImage(reader.result);
                    setCropperModal(true)
                }
            })
        };
        reader.readAsDataURL(files[0]);
    };

    const getImageSize = (imageURL, callback) => {
        var image = new Image();
        image.onload = function () {
            if (!callback) {
                console.log("Error getting image size: no callback. Image URL: " + imageURL);
            } else {
                callback(this.naturalWidth, this.naturalHeight, this);
            }
        }
        image.src = imageURL;
    }


    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            let type = 'image/jpeg';
            if (cropper.url !== '') {
                let matches = cropper.url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
                if (matches.length >= 3)
                    type = matches[1]
            }
            let croped = cropper.getCroppedCanvas({
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
                width: width,
                fillColor: type === 'image/png' ? 'transparent' : '#ffffff',
                height: height
            }).toDataURL(type === 'image/png' ? type : 'image/jpeg', 1);
            uploadFileHandler(croped)
        }
    };

    const uploadFileHandler = async (image) => {
        const res = await uploadImageBase64(image);
        if (res.status_code === 200) {
            setCropData(image);
            setCropData(res.fileUrl);
            onCroped(res.key);
        } else {
            toast.error(res.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        handleClose()
    }

    const handleClose = () => setCropperModal(false);
    // console.log("s", src,isRemove)
    return (
        <>
            <div className={`image-input mb-3 ${isRemove === true ? src === defaultSrc? 'image-input-empty' : '' : 'image-input-empty'} bgi-position-center image-input-outline ${full && 'w-100'}`}>
                <label className={`cursor-pointer w-100`}>
                    <div className={`image-input-wrapper img-thumb-preview ${className ? className : 'w-150px h-150px'} bgi-position-center`}
                        style={{ backgroundImage: `url(${cropData })` }}>
                    </div>
                    <div
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="change" data-bs-toggle="tooltip"
                        title="Change avatar">
                        <i className="fas fa-pencil-alt"></i>
                        <input type="file" className="js-photo-upload" onChange={onChange} name="upload"
                            accept=".png, .jpg, .jpeg"
                            img-bg-preview=".img-thumb-preview" />
                        <input type="hidden" name="avatar_remove" />
                    </div>
                </label>
                <span
                    onClick={() => onCroped(null)}
                    className="btn btn-icon btn-circle btn-color-danger btn-light-danger w-25px h-25px bg-body shadow start-50 position-absolute"
                    data-kt-image-input-action="remove">
                    <i className="bi bi-x fs-2"></i>
                </span>
            </div>
            <Modal
                show={cropperModal}
                onHide={handleClose}
                backdrop="static"
                centered
                keyboard={false}>
                <Modal.Body className='p-0' style={{ height: 400, width: "100%" }}>
                    <ImageCropping image={image} cropRatio={cropRatio} cropWidth={width} cropHeight={height} setCropper={setCropper} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={getCropData}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CropperComponents;