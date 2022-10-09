import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import storage from '../utils/firebase';
import IndividualModel from './IndividualModel';

function AllModels() {

    //  we need some state (loading, models)
    const [loading, setLoading] = useState(true);
    const [models, setModels] = useState([]);
    const [error, setError] = useState(null);    
    const [selectedModel, setSelectedModel] = useState(null);


    //  lifecycle method whenever any side effect happens in the component
    useEffect(() => {
        const imageListRef = ref(storage, "fabrik-images/");
    
        listAll(imageListRef).then(res => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setModels(prev => [...prev, url]);
                })
            })
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
        })
        // fetch('https://backend-api-priya.herokuapp.com/')
        //     .then(res => res.json())
        //     .then(data => {
        //         if(data.error){
        //             setError(data.error);
        //         setLoading(false);
                    
        //         }else{
        //             setModels(data);
        //             setSelectedModel(data[0])
        //             setLoading(false);
        //         }
        //     })
        //     .catch(err=>{
        //         setError(err.message);
        //         setLoading(false);
        //     })
    }, []);


    //  when the data is being fetched from the server
    if(loading) {
        return <p>Loading models ...</p>
    }


    //  if there are some errors found from the request
    if(error !== null) {
        return <p>Error has occurred : {error}</p>
    }

    //  if there are no models found
    if(models.length <= 0) {
        return <div className='container' style={{textAlign : "center", marginTop : "50px"}}>
            <div className='card'>
                <div className='card-body'>
                    <p><b>No models has been uploaded yet.</b></p>
                    <p><Link to="/upload">CLick here to upload</Link></p>
                </div>
            </div>
        </div>
    }

    //  if models exist
    return (
        <div className='container' style={{marginTop : "30px"}}>
            <div className='row'>
                <div className='col-sm-4' style={{height : "600px", overflowY : 'scroll'}}>
                    {
                        models.map((model, index) => {
                            return <div className='card' style={{marginBottom : "10px", cursor:"pointer"}} onClick={() => {
                                setSelectedModel(model);
                            }} key={index} >
                                <div className='card-body'>
                                    {model.split("/")[model.split("/").length - 1].split("%")[0]}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='col-sm-8'>
                    {selectedModel === null ? 
                    <div className='card'>
                        <div className='card-body'>
                            <h2>Select a modal to render</h2>
                        </div>
                    </div> : <IndividualModel modal={selectedModel} />
                    }
                </div>
            </div>
        </div>
    )
}

export default AllModels
