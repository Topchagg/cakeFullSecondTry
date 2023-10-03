import { useEffect, useState } from "react"

import { tools } from "../store"


function Carousel (props) {

    const incrementPage = tools((state) => state.incrementPage)
    const decrimentPage = tools((state) => state.decrimentPage)
    const fixWrongPage = tools((state) => state.fixWrongPage)

    useEffect(() => {
        fixWrongPage(props.page, props.setPage)
    }, [props.status])

    return (
        <div className="carousel-btn-wrapper">
         <div className="carousel-wrapper">
                  <button type='button' onClick={() => decrimentPage(props.page, props.setPage)} className="decriment-btn carousel-btn">
                      &laquo;	
                  </button>
                  <>{props.page}</>
                  <button type='button' onClick={() => incrementPage(props.page, props.setPage)}  className="increment-btn carousel-btn">
                      &raquo;
                  </button>
              </div> 
          </div>
    )

}

export default Carousel