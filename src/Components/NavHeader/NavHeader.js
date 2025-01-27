import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Nav, Container, Offcanvas,  NavDropdown, Dropdown } from 'react-bootstrap'
import { Menu } from 'react-feather';
import { Link, NavLink } from 'react-router-dom';
import {  Typography } from 'antd';
import { useAuthContext } from 'Contexts/Auth';


function ScrollHandler() {
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            const scrollPosition = window.scrollY;
            if (scrollPosition > prevScrollY.current) {
                navbar.style.top = '-50px';
            } else {
                navbar.style.top = '0';
            }
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                navbar.classList.remove('bg-transparent')
                navbar.classList.add('nav_shadow')
            } else {
                navbar.classList.add('bg-transparent')
                navbar.classList.remove('nav_shadow')
            }
            prevScrollY.current = scrollPosition;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return null;
}
const NavHeader = () => {
    const { Title } = Typography
    const navItems = [
        { name: 'Add Notes', path: "/" },
        // { name: 'Blog', path: "/pages/blog" },
        { name: 'My Notes', path: "/todos/myTodos" },
        { name: 'About', path: "/about" },
    ]

    const [activeId, setActiveId] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleActive = (itemId) => {
        setActiveId(itemId);
        handleClose()
    };
    const { isAuth, handleLogout } = useAuthContext()

    return (
        <>
            <ScrollHandler />
            <Navbar expand="lg" fixed='top' className={`main_nav  px-sm-4 px-3 py-2`} id="navbar">
                <Container fluid="xxl" className='px-sm-3  px-0 ' >
                    <Navbar.Brand className='max-w-[176px]' >
                        <NavLink to='/' style={{ textDecoration: "none" }}  >
                            <Title level={2} style={{ fontFamily: "Quella" }} className='text-dark' ><i>Notes</i></Title>
                        </NavLink>
                    </Navbar.Brand>
                     <NavDropdown title="Account" className=' text-dark d-flex mb-3 ms-3 flex-wrap ' id="basic-nav-dropdown">
                        {!isAuth
                            ? <>
                                <Dropdown.Item as={"div"}>
                                    <Link className='ms-4 nav-link text-dark' to="/auth/login">Login</Link>
                                </Dropdown.Item>
                                <Dropdown.Item as={"div"}>
                                    <Link className='ms-4 nav-link  text-dark' to="/auth/register">Register</Link>
                                </Dropdown.Item>
                            </>
                            : <>
                                <Dropdown.Item as={"div"}>
                                    <Link className='ms-4 nav-link  text-dark' to="/todos/myTodos">My Notes</Link>
                                </Dropdown.Item>
                                <Dropdown.Item as={"div"}>
                                    <Link className='ms-4 nav-link  text-dark' onClick={handleLogout} >Logout</Link>
                                </Dropdown.Item>
                            </>
                        }
                    </NavDropdown>

                    <Navbar.Toggle onClick={handleShow} className='ms-auto mb-3 border-0 p-0 mb-0' style={{
                        fontSize: "13px",
                        paddingInline: "6px",
                    }} >
                        <Menu className='menu' />
                    </Navbar.Toggle>
                    <Nav className='nav_link ms-lg-auto fs_09  gap-lg-5  d-none d-lg-flex' >
                        {navItems.map((items, index) => (
                            <NavLink className={''} onClick={() => handleActive(index)} key={index} to={items.path}>
                                <span className=''>
                                    {items.name}
                                    <div key={index} className={`mt-1 visible1`} >
                                        <span className='border1'>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </div>
                                </span>
                            </NavLink>
                        ))}
                    </Nav>
                    <Nav className='min-[992px]:min-w-[190px] d-lg-none'>
                        <Offcanvas show={show} onHide={handleClose} placement={'top'} className="main_nav pb-3">
                            <Offcanvas.Header closeButton>
                            </Offcanvas.Header>
                            <Nav className='nav_link fs_10 justify-content-center align-items-center  gap-3' >
                                {navItems.map((items, index) => (
                                    <NavLink className={''} onClick={() => handleActive(index)}
                                        key={index} to={items.path}>
                                        <span className=''>
                                            {items.name}
                                        </span>
                                        <div key={index} className={`${activeId === index ? 'visible1' : 'visible1'}`} >
                                            <span className='border1'>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </span>
                                        </div>
                                    </NavLink>
                                ))}
                            </Nav>
                        </Offcanvas>
                    </Nav>
                </Container>
            </Navbar >
        </>

    )
}

export default NavHeader