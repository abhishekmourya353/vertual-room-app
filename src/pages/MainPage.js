//import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

const MainPage=()=>{
    return(
        <>
        <section className=" flex justify-center items-center">

                <Link to= {"/Buyer"}>
                <div>
                      <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                      Buyer
                      </button>
                    </div>
                </Link >
                    
                  
                  <Link to= {"/Seller"}>
                  <div>
                  <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                      Seller
                      </button>
                    </div>
                 
                  </Link>
                    
                    

        </section>
        
        </>
    );
};

export default MainPage;