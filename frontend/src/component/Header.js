import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from "react-icons/bs"
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { BsListColumnsReverse } from "react-icons/bs";






const Header = () => {
  return (
    <>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    
      <header className='header-top-strip py-3'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white  mb-0">
                Free Shipping Over $1000 Order & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                HotLine :
                <a style={{ textDecoration: "none" }} className='text-white' href='tel:+919976542341'>
                  +91 9976542341
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className='row align-items-center'>
            <div className='col-2'>
              <h1><Link style={{ textDecoration: "none" }} to="/" className='text-white'>Amazon</Link></h1>
            </div>
            <div className='col-5'>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search Product here ........." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <span class="input-group-text" id="basic-addon2"> <BsSearch className='fs-6' /></span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div style={{ textDecoration: "none", display: "flex", flexDirection: "row", color: "white", gap: "10" }}>
                  <span style={{ margin: "5px" }}>
                    <HiArrowPathRoundedSquare style={{ width: "30px", height: "30px", color: "white" }} />
                  </span>
                  <p style={{ marginBottom: "0px" }}>
                    Compare
                    Product
                  </p>
                </div>


                <div style={{ textDecoration: "none", display: "flex", flexDirection: "row", color: "white" }}>
                  <span style={{ margin: "5px" }}>
                    <CiHeart style={{ width: "30px", height: "30px", color: "white" }} />
                  </span>
                  <p style={{ marginBottom: "0px" }} >
                    Favourite
                    Wishlist
                  </p>

                </div>


                <div style={{ textDecoration: "none", display: "flex", flexDirection: "row", color: "white" }}>
                  <span style={{ margin: "5px" }}>
                    <CiUser style={{ width: "30px", height: "30px", color: "white" }} />
                  </span>
                  <p style={{ marginBottom: "0px" }} >
                    Log in My Account
                  </p>

                </div>


                <div style={{ textDecoration: "none", display: "flex", flexDirection: "row", color: "white" }}>

                  <FaShoppingCart style={{ width: "30px", height: "30px", color: "white", margin: "5px" }} />
                  <div className='d-flex flex-column '>
                    <span className='badge bg-white text-dark' >0</span>
                  </div>


                </div>

              </div>
            </div>
          </div>
        </div>
      </header>


      <header className='header-bootom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center'>
                <div>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle  bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <span><BsListColumnsReverse/></span>
                      Shop Category
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center'>
                    <NavLink to={"/"} style={{ marginLeft: "15px", textDecoration: "none" }}  >Home</NavLink>
                    <NavLink to={"/store"} style={{ marginLeft: "15px", textDecoration: "none" }} >Our store</NavLink>
                    <NavLink to={"/blogs"} style={{ marginLeft: "15px", textDecoration: "none" }}>Blogs</NavLink>
                    <NavLink to={"/contactUs"} style={{ marginLeft: "15px", textDecoration: "none" }} > ContactUs</NavLink>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
