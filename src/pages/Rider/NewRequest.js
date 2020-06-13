import React from 'react';
import Requests from './Requests';
import {CircleLoader} from '../../components/index'

export default function NewRequest({requests}){

    return(
        <div>
            <Requests requests={requests}/>
            
            {!requests.length && <div className="center">
            <CircleLoader/>
            </div>}
        </div>
    )
}