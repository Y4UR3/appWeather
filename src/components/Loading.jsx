import React from 'react'
import { Spinner } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Loading.css'

const Loading = () => {
  return (
    <section>
        <h2 className='loading_title'>Loading</h2>
        <div className='loading_snp'> 
            <Spinner/>  
        </div>
        

    </section>
  )
}

export default Loading