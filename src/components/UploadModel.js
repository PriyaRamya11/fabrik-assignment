import React, { useState } from 'react'
import storage from '../utils/firebase';
import {ref, uploadBytes} from 'firebase/storage';
import { notification } from 'antd';

function UploadModel() {
    const [upload, setUpload] = useState(null);

    const [loading, setLoading] = useState(false);

    const changeFile = (e) => {
        if(e.target.files) {
            let file = e.target.files[0];
            let file_name = file.name;
            let splitted_name = file_name.split(".");
            console.log(splitted_name[splitted_name.length - 1].toLowerCase())
            if(splitted_name[splitted_name.length - 1].toLowerCase() === "glb" || splitted_name[splitted_name.length - 1].toLowerCase() === "gltf" || splitted_name[splitted_name.length - 1].toLowerCase() === "fbx") {
                setUpload(e.target.files[0])
                notification.info({
                    message : 'File format is accepted',
                    description : "The selected file format has been accepted to be uploaded",
                    placement : 'bottomRight'
                })
            } else {
                notification.error({
                    message : 'Error occured',
                    description : "File format wrong please select a glf, gltf or fbx format file",
                    placement : 'bottomRight'
                })
            }
        }
    }

    
    //  function to handle the form submission
    const submitForm = (e) => {
        e.preventDefault();     //  prevent the default behavior (no refreshing of browser)
        setLoading(true);

        const imageRef = ref(storage, `fabrik-images/${upload.name}`);

        uploadBytes(imageRef, upload).then(() => {
            setLoading(false);
            notification.success({
                message : 'Sucesfully uploaded',
                description : 'Please go to home page',
                placement : 'bottomRight'
            })
        }).catch(err => {
            setLoading(false);
            notification.error({
                message : 'Error occured',
                description : err,
                placement : 'bottomRight'
            })  
        });
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6' style={{margin : 'auto', marginTop : "50px"}}>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={submitForm}>
                                <div className='form-group'>
                                    <label htmlFor='upload'>Select a 3-d file and click on upload</label>
                                    <input type={'file'} className='form-control' name='upload' id='upload' required={true} onChange={changeFile} />
                                </div>
                                <div>
                                    <input
                                        type={'submit'}
                                        className='btn btn-outline-primary'
                                        value={loading ? 'Uploading the file ...' : 'Upload file'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadModel
