import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
// import { motion } from 'framer-motion'
import { throttle } from '../utils/helpers'

import { myContext } from '../utils/provider'
import Modal from './Modal'

export default function Nav() {
  const [hideNav, setHideNav] = useState(false)
  const [shrinkNav, setShrinkNav] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const MY_OFFSET = 25
  let prevScrollPos
  let lastScrollPos = 0

  useEffect(() => {
    if (typeof window != undefined) {
      prevScrollPos = window.pageYOffset
      document.addEventListener(
        'scroll',
        throttle(handleNavigationShowHide, 50)
      )
    }

    return () =>
      document.removeEventListener(
        'scroll',
        throttle(handleNavigationShowHide, 50)
      )
  }, [])

  const handleNavigationShowHide = () => {
    const maxScroll = document.body.clientHeight - window.innerHeight
    const fromTop = window.scrollY
    let currentScrollPos = window.pageYOffset

    if (Math.abs(lastScrollPos - fromTop) <= MY_OFFSET) {
      setShrinkNav(true)
      // return
    }

    if (fromTop < MY_OFFSET) {
      setShrinkNav(true)
      setHideNav(false)
    } else if (
      (maxScroll > 0 &&
        prevScrollPos > currentScrollPos &&
        prevScrollPos <= maxScroll) ||
      (maxScroll <= 0 && prevScrollPos > currentScrollPos) ||
      (prevScrollPos <= 0 && currentScrollPos <= 0)
    ) {
      setHideNav(false)
      setShrinkNav(true)
    } else {
      setHideNav(true)
    }
    prevScrollPos = currentScrollPos
  }

  const hamburgerToggle = (e, context) => {
    const burger = e.currentTarget
    context.slideMenu()
    burger.classList.toggle('opened')
    burger.setAttribute('aria-expanded', burger.classList.contains('opened'))
  }

  return (
    <myContext.Consumer>
      {(context) => (
        <>
          <nav
            className={
              'navbar' +
              (hideNav ? ' navbar--hidden' : '') +
              (window.scrollY && shrinkNav ? ' navbar--shrink' : '')
            }
          >
            {/* <div className="navbar__logo"> */}
            <Link to="/" className="brand">
              &lt;JJ&gt;
            </Link>
            {/* </div> */}
            <div
              // ref={links}
              className={
                'navbar__links' +
                (context.showMenu ? ' navbar__links--show' : '') +
                (hideNav ? ' navbar__links--hidden' : '')
              }
            >
              <Link activeClassName="navbar__links--active" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
                  />
                </svg>
              </Link>
              <Link activeClassName="navbar__links--active" to="/about">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"
                  />
                </svg>
              </Link>

              <Link activeClassName="navbar__links--active" to="/projects">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17,6.06a3,3,0,0,0-1.15,5.77A2,2,0,0,1,14,13.06H10a3.91,3.91,0,0,0-2,.56V7.88a3,3,0,1,0-2,0v8.36a3,3,0,1,0,2.16.05A2,2,0,0,1,10,15.06h4a4,4,0,0,0,3.91-3.16A3,3,0,0,0,17,6.06Zm-10-2a1,1,0,1,1-1,1A1,1,0,0,1,7,4.06Zm0,16a1,1,0,1,1,1-1A1,1,0,0,1,7,20.06Zm10-10a1,1,0,1,1,1-1A1,1,0,0,1,17,10.06Z"
                  />
                </svg>
              </Link>
              <Link activeClassName="navbar__links--active" to="/blog">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,12H9a1,1,0,0,0,1-1V5A1,1,0,0,0,9,4H3A1,1,0,0,0,2,5v6A1,1,0,0,0,3,12ZM4,6H8v4H4Zm9,2h8a1,1,0,0,0,0-2H13a1,1,0,0,0,0,2Zm0,10H3a1,1,0,0,0,0,2H13a1,1,0,0,0,0-2Zm8-4H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-4H13a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"
                  />
                </svg>
              </Link>
              <Link
                className={showModal ? 'navbar__links--active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  setShowModal(!showModal)
                }}
                to="#"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12,2a10,10,0,1,0,5,18.66,1,1,0,1,0-1-1.73A8,8,0,1,1,20,12v.75a1.75,1.75,0,0,1-3.5,0V8.5a1,1,0,0,0-1-1,1,1,0,0,0-1,.79A4.45,4.45,0,0,0,12,7.5,4.5,4.5,0,1,0,15.3,15,3.74,3.74,0,0,0,22,12.75V12A10,10,0,0,0,12,2Zm0,12.5A2.5,2.5,0,1,1,14.5,12,2.5,2.5,0,0,1,12,14.5Z"
                  />
                </svg>
              </Link>
            </div>

            <div className="navbar__social">
              <a
                className="navbar__social--twitter"
                href="https://twitter.com/codewithjalaj"
              >
                <svg
                  fill="currentColor"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
                </svg>
              </a>
              <a href="https://github.com/codewithjalaj">
                <svg
                  fill="currentColor"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="28"
                  viewBox="0 0 26 28"
                >
                  <path d="M10 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM20 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM22.5 19c0-2.391-1.453-4.5-4-4.5-1.031 0-2.016 0.187-3.047 0.328-0.812 0.125-1.625 0.172-2.453 0.172s-1.641-0.047-2.453-0.172c-1.016-0.141-2.016-0.328-3.047-0.328-2.547 0-4 2.109-4 4.5 0 4.781 4.375 5.516 8.188 5.516h2.625c3.813 0 8.188-0.734 8.188-5.516zM26 16.25c0 1.734-0.172 3.578-0.953 5.172-2.063 4.172-7.734 4.578-11.797 4.578-4.125 0-10.141-0.359-12.281-4.578-0.797-1.578-0.969-3.437-0.969-5.172 0-2.281 0.625-4.438 2.125-6.188-0.281-0.859-0.422-1.766-0.422-2.656 0-1.172 0.266-2.344 0.797-3.406 2.469 0 4.047 1.078 5.922 2.547 1.578-0.375 3.203-0.547 4.828-0.547 1.469 0 2.953 0.156 4.375 0.5 1.859-1.453 3.437-2.5 5.875-2.5 0.531 1.062 0.797 2.234 0.797 3.406 0 0.891-0.141 1.781-0.422 2.625 1.5 1.766 2.125 3.938 2.125 6.219z"></path>
                </svg>
              </a>
              <a href="https://codepen.io/jalajavascript">
                <svg
                  fill="currentColor"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <path d="M29.555 11.501l-14-9.333c-0.336-0.224-0.774-0.224-1.109 0l-14 9.333c-0.278 0.185-0.445 0.498-0.445 0.832v9.333c0 0.334 0.167 0.647 0.445 0.832l14 9.333c0.168 0.112 0.361 0.168 0.555 0.168s0.387-0.056 0.555-0.168l14-9.333c0.278-0.185 0.445-0.498 0.445-0.832v-9.333c0-0.334-0.167-0.647-0.445-0.832zM15 20.465l-5.197-3.465 5.197-3.465 5.197 3.465-5.197 3.465zM16 11.798v-6.93l11.197 7.465-5.197 3.465-6-4zM14 11.798l-6 4-5.197-3.465 11.197-7.465v6.93zM6.197 17l-4.197 2.798v-5.596l4.197 2.798zM8 18.202l6 4v6.93l-11.197-7.465 5.197-3.465zM16 22.202l6-4 5.197 3.465-11.197 7.465v-6.93zM23.803 17l4.197-2.798v5.596l-4.197-2.798z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/jalajgupta">
                <svg
                  fill="currentColor"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z"></path>
                  <path d="M2 12h6v18h-6v-18z"></path>
                  <path d="M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
                </svg>
              </a>
            </div>
            <div className="navbar__hamburger">
              <button
                className={'menu' + (context.showMenu ? ' opened' : '')}
                onClick={(e) => hamburgerToggle(e, context)}
                aria-label="Main Menu"
              >
                <svg width="50" height="50" viewBox="0 0 100 100">
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </div>
          </nav>
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </>
      )}
    </myContext.Consumer>
  )
}
