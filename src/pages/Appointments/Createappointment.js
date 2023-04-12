import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import { Row, Col } from "reactstrap"
import DatePicker from "react-datepicker"
import { Button } from "reactstrap"
import "react-datepicker/dist/react-datepicker.css"
import Divider from "@mui/material/Divider"
import { useHistory, useLocation } from "react-router"
import { getAllDoctors } from "Connection/Doctors"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { createBooking } from "Connection/Appointments"
import { toast } from "react-toastify"

export default function Createappointment() {
  let history = useHistory()
  const services = [
    "Pediatric Dentistry",
    "Orthodontics",
    "Endodontics",
    "Oral Surgery",
  ]
  const clinics = ["Khalifa City", "Abu Dhabi City", "Dubai"]
  const consult = ["Remote Consultation", "Face-To-Face Consultation"]
  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState("")
  const [patientName, setPatientName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [clinicName, setClinicName] = useState(clinics[0])
  const [serviceName, setServiceName] = useState(services[1])
  const [emiratesId, setEmiratesId] = useState("")
  const [consultationType, setConsultationType] = useState("")
  const [id, setId] = useState("")
  // const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    getAllDoctors().then(res => {
      if (res.data && res.data.data.doctors) {
        for (let i = 0; i < res.data.data.doctors.length; i++) {
          console.log(res.data.data.doctors)
          setDoctors(res.data.data.doctors)
        }
      }
    })
  }, [])

  const handleBooking = async () => {
    let res = await createBooking({
      patientName: patientName,
      email: email,
      phoneNumber: phoneNumber,
      clinicName: clinicName,
      emiratesId: emiratesId,
      consultationType: consultationType,
      serviceName: serviceName,
      time: time,
      date: startDate,
      doctorId: doctorId,
    })
    console.log(res)
    setPatientName("")
    setEmail("")
    setPhoneNumber("")
    setClinicName("")
    setEmiratesId("")
    setServiceName("")
    setConsultationType("")
    setTime("")
    setStartDate("")
    setDoctorId("")
    if (res.data.data.success === 1) {
      history.push("/appointments")
      toast.success("Appointment created successfully")
    } else {
      toast.error("Error creating an appointment")
    }
  }

  const handleClose = () => {
    history.push("/appointments")
  }
  return (
    <>
      <div className="form-wrapper">
        <Row>
          <div className="border border-secondary rounded">
            <div
              style={{
                backgroundColor: "#20507B",
                color: "white",
                height: "60px",
              }}
              className="d-flex justify-content-start align-items-center "
            >
              <div>
                <button onClick={handleClose} className="btn text-light">
                  <i className="fas fa-arrow-left" />
                </button>
              </div>

              <h5 className="mt-2 text-light">Book New Appointment</h5>
            </div>
          </div>
        </Row>
        <br />
        <section style={{ padding: "0 19%" }}>
          <Row>
            <Col>
              <h5 className="mt-2">Book Appointment</h5>

              <Divider />
              <Form>
                <Row>
                  <Col sm="6">
                    <Form.Group className="mt-2" controlId="Patient Name">
                      <Form.Label className="mt-2">Patient Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="patientName"
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group className="mt-2" controlId="Emirates ID">
                      <Form.Label className="mt-2">
                        Emirates ID
                        {/* <sup className="text-danger">*</sup> */}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="emiratesId"
                        value={emiratesId}
                        onChange={e => setEmiratesId(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Form.Group controlId="Email">
                      <Form.Label className="mt-2">
                        Email<sup className="text-danger">*</sup>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group controlId="Phone Number">
                      <Form.Label className="mt-2">
                        Phone Number<sup className="text-danger">*</sup>
                      </Form.Label>

                      <PhoneInput
                        country={"ae"}
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Form.Group controlId="Clinic Name">
                      <Form.Label className="mt-2">
                        Clinic Name<sup className="text-danger">*</sup>
                      </Form.Label>
                      <div>
                        <select
                          name="clinicName"
                          className="form-select"
                          aria-label="Default select example"
                          value={clinicName}
                          onChange={e => {
                            setClinicName(e.target.value)
                            //setIsRole(false)
                          }}
                        >
                          {clinics.map(value => (
                            <option value={value} key={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group controlId="Service Name">
                      <Form.Label className="mt-2">
                        Service Name<sup className="text-danger">*</sup>
                      </Form.Label>
                      <div>
                        <select
                          name="Service Name"
                          className="form-select"
                          aria-label="Default select example"
                          value={serviceName}
                          onChange={e => {
                            setServiceName(e.target.value)
                          }}
                        >
                          {services.map(value => (
                            <option value={value} key={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mt-2" controlId="Assign a Doctor">
                  <Form.Label>
                    Assign a Doctor<sup className="text-danger">*</sup>
                  </Form.Label>

                  <div className="border border-secondary rounded mb-2">
                    <div className="form-check">
                      <br />
                      <input
                        type="radio"
                        value={doctors[0]?._id}
                        checked={doctorId === doctors[0]?._id}
                        id="doctors"
                        onClick={e => setDoctorId(e.target.value)}
                        name={doctorId}
                      />{" "}
                      <label style={{ marginBottom: "0" }} htmlFor="doctors">
                        {doctors[0]?.firstName} {doctors[0]?.lastName}
                      </label>
                      <p className="pl-3">{doctors[0]?.speciality}</p>
                    </div>
                  </div>
                  <div className="border border-secondary rounded mb-2">
                    <div className="form-check ">
                      <br />
                      <input
                        type="radio"
                        value={doctors[1]?._id}
                        checked={doctorId === doctors[1]?._id}
                        id="doctors"
                        onClick={e => setDoctorId(e.target.value)}
                        name={doctorId}
                      />{" "}
                      <label style={{ marginBottom: "0" }} htmlFor="doctors">
                        {doctors[1]?.firstName} {doctors[1]?.lastName}
                      </label>
                      <p className="pl-3">{doctors[1]?.speciality}</p>
                    </div>
                  </div>
                  <div className="border border-secondary rounded mb-2">
                    <div className="form-check ">
                      <br />
                      <input
                        type="radio"
                        value={doctors[2]?._id}
                        checked={doctorId === doctors[2]?._id}
                        id="doctors"
                        onClick={e => setDoctorId(e.target.value)}
                        name={doctorId}
                      />{" "}
                      <label style={{ marginBottom: "0" }} htmlFor="doctors">
                        {doctors[2]?.firstName} {doctors[2]?.lastName}
                      </label>
                      <p className="pl-3">{doctors[2]?.speciality}</p>
                    </div>
                  </div>
                  <div className="border border-secondary rounded mb-2">
                    <div className="form-check ">
                      <br />
                      <input
                        type="radio"
                        value={doctors[3]?._id}
                        checked={doctorId === doctors[3]?._id}
                        id="doctors"
                        onClick={e => setDoctorId(e.target.value)}
                        name={doctorId}
                      />{" "}
                      <label style={{ marginBottom: "0" }} htmlFor="doctors">
                        {doctors[3]?.firstName} {doctors[3]?.lastName}
                      </label>
                      <p className="pl-3">{doctors[3]?.speciality}</p>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="Consultation Type">
                  <Form.Label>
                    Consultation Type<sup className="text-danger">*</sup>
                  </Form.Label>
                  <div>
                    <select
                      name="Consultation Type"
                      className="form-select"
                      aria-label="Default select example"
                      value={consultationType}
                      onChange={e => {
                        setConsultationType(e.target.value)
                      }}
                    >
                      {consult.map(value => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
                <Form.Group className="mt-2" controlId="Date">
                  <Form.Label className="mt-2">Select Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                  />
                </Form.Group>
                <Form.Group className="mt-2" controlId="Date">
                  <Form.Label className="mt-2">Select Time</Form.Label>
                  <DatePicker
                    selected={time}
                    onChange={time => setTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Button
            color="primary"
            className="btn btn-primary mt-4 mb-4"
            onClick={handleBooking}
          >
            Book Appointment
          </Button>
        </section>
      </div>
    </>
  )
}
