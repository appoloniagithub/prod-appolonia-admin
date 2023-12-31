import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [dashboard, setdashboard] = useState(false)
  const [patient, setPatient] = useState(false)
  const [ui, setui] = useState(false)
  const [app, setapp] = useState(false)
  const [email, setemail] = useState(false)
  const [ecommerce, setecommerce] = useState(false)
  const [crypto, setcrypto] = useState(false)
  const [project, setproject] = useState(false)
  const [task, settask] = useState(false)
  const [contact, setcontact] = useState(false)
  const [blog, setBlog] = useState(false)
  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [invoice, setinvoice] = useState(false)
  const [auth, setauth] = useState(false)
  const [utility, setutility] = useState(false)
  const [role, setRole] = useState()
  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  useEffect(() => {
    if (sessionStorage.getItem("role")) {
      const role = sessionStorage.getItem("role")
      console.log(role)
      setRole(role)
    }
  }, [])
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }
  //console.log(props, "props")
  return (
    <React.Fragment>
      <div className="topnav">
        <div className="px-2">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse isOpen={props.leftMenu} className="navbar-collapse" id="">
              {role === "Admin" ? (
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      onClick={e => {
                        //e.preventDefault()
                        setdashboard(!dashboard)
                      }}
                      to="/dashboard"
                    >
                      <i className="bx bx-home-circle me-2"></i>
                      {props.t("Dashboard")} {props.menuOpen}
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/patients"
                    >
                      {props.t("Patients")}
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/doctors"
                    >
                      {props.t("Doctors")}
                    </Link>
                  </li>

                  {/* <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/settings"
                    >
                      {props.t("Settings")}
                    </Link>
                  </li> */}
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        //e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/library"
                    >
                      {props.t("Library")}
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/appointments"
                    >
                      {props.t("Appointments")}
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/send-notification"
                    >
                      {props.t("Send Notification")}
                    </Link>
                  </li>
                  {/* <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/support"
                    >
                      {props.t("Support")}
                    </Link>
                  </li> */}

                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/calender"
                    >
                      {props.t("Work Calender")}
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/contact-issues"
                    >
                      {props.t("Messages")}
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  {/* <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      onClick={e => {
                        //e.preventDefault()
                        setdashboard(!dashboard)
                      }}
                      to="/dashboard"
                    >
                      <i className="bx bx-home-circle me-2"></i>
                      {props.t("Dashboard")} {props.menuOpen}
                    </Link>
                  </li> */}
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/patients"
                    >
                      {props.t("Patients")}
                    </Link>
                  </li>

                  {/* <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/doctors"
                    >
                      {props.t("Doctors")}
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/settings"
                    >
                      {props.t("Settings")}
                    </Link>
                  </li> */}
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        //e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/library"
                    >
                      {props.t("Library")}
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        // e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/appointments"
                    >
                      {props.t("Appointments")}
                    </Link>
                  </li>
                  {/* <li className="nav-item ">
                    <Link
                      className="nav-link"
                      onClick={e => {
                        e.preventDefault()
                        setPatient(!patient)
                      }}
                      to="/support"
                    >
                      {props.t("Support")}
                    </Link>
                  </li> */}
                </ul>
              )}
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
