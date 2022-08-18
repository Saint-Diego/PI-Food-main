import React from 'react';
import { Link } from 'react-router-dom';
import imagefondo  from '../../assets/comida-2-50pto.jpg';

const LoadPage = () => {

  const containerStyle = {
    background: `url(${imagefondo}) center no-repeat`,
  };

  return (
    <div className="container-loading" style={containerStyle}>
      {/* <div className='center'> */}
        <Link to='/home'>
          <button className='btn btn-primary'>
		        <div className='icono'>
					    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
						    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
					    </svg>
				    </div>
            <span>Ingresar a la API</span>
          </button>
        </Link>
      {/* </div> */}
    </div>
  )
}

export default LoadPage