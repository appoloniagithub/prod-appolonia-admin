import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Row, Col } from "reactstrap"
import Divider from "@mui/material/Divider"
import profilePic from "../../assets/images/profile.png"
import { Select, MenuItem } from "@material-ui/core"
import countries from "i18n-iso-countries"
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json"
import itLocale from "i18n-iso-countries/langs/it.json"
import { useHistory, useLocation } from "react-router"
import { getDoctorById } from "Connection/Doctors"
import { updateDoctor } from "Connection/Doctors"
import { ToastContainer, toast } from "react-toastify"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import url from "Connection/Api/api"
import { getBookingData } from "Connection/Appointments"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const EditDoctor = () => {
  let history = useHistory()
  const location = useLocation()
  const roleOptions = ["Select", "Admin", "Doctor"]
  const options = [
    "Select",
    "Orthodontics",
    "Pediatric Dentistry",
    "Endodontics",
    "Oral Surgery",
  ]
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [emiratesId, setEmiratesId] = useState("")
  const [speciality, setSpeciality] = useState(options[0])
  const [isSpeciality, setIsSpeciality] = useState(false)
  const [image, setImage] = useState("")
  const [role, setRole] = useState(roleOptions[0])
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const [gender, setGender] = useState("")
  const [nationality, setNationality] = useState("")
  const [totalExperience, setTotalExperience] = useState("")
  const [certifications, setCertifications] = useState("")
  const [education, setEducation] = useState("")
  const [profile, setProfile] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCPassword] = useState("")
  const [file, setFile] = useState("")
  const [id, setId] = useState("")
  const [clinicName, setClinicName] = useState("")
  const [clinics, setClinics] = useState([])
  //const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = e => {
    const file = e.target.files[0]

    if (
      file
      //&& file.type.startsWith("image/")
    ) {
      const reader = new FileReader()

      reader.onload = event => {
        // Generate a unique file name using Date.now()
        const fileName = `uploads/doctors/${Date.now()}.png`
        const dataURL = event.target.result
        //setImage({ dataURL: event.target.result, fileName })
        //if (e.target.files.length !== 0) {
        setImage(fileName)
        //}
        console.log(image)
      }

      reader.readAsDataURL(file)
    } else {
      setImage(null) // Clear the preview if the selected file is not an image
    }
  }
  // const handleImageChange = e => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()

  //     reader.onload = event => {
  //       setSelectedImage(event.target.result)
  //     }

  //     reader.readAsDataURL(file)
  //   }
  // }

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  })
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  const selectCountryHandler = value => setNationality(value)

  // Have to register the languages you want to use
  countries.registerLocale(enLocale)
  countries.registerLocale(itLocale)

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" })
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    }
  })

  const hiddenFileInput = React.useRef(null)

  const handleChange = event => {
    if (event.target.files.length !== 0) {
      setImage(event.target.files[0])
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleClick = event => {
    hiddenFileInput.current.click()
  }
  const handleClose = () => {
    history.push("/doctors")
  }
  useEffect(() => {
    console.log(location, "doctor loc")
    let splitData = location.pathname.split("/")
    console.log(splitData, "doc split")
    if (splitData && splitData.length === 4) {
      let doctorId = splitData[3]
      console.log(doctorId)
      setId(doctorId)
      getDoctorById({ doctorId }).then(async res => {
        if (res.data.data.foundDoctor) {
          //setDoctorData(res.data.data.foundDoctor)
          setFirstName(res.data.data.foundDoctor.firstName)
          setLastName(res.data.data.foundDoctor.lastName)
          setEmail(res.data.data.foundDoctor.email)
          setPhoneNumber(res.data.data.foundDoctor.phoneNumber)
          setSpeciality(res.data.data.foundDoctor.speciality)
          setEmiratesId(res.data.data.foundDoctor.emiratesId)
          setClinicName(res.data.data.foundDoctor.clinicName)
          setImage(res.data.data.foundDoctor.image[0])
          setPassword(res.data.data.foundDoctor.uniqueId)
          setGender(res.data.data.foundDoctor.gender)
          setNationality(res.data.data.foundDoctor.nationality)
          setTotalExperience(res.data.data.foundDoctor.totalExperience)
          setProfile(res.data.data.foundDoctor.profile)
          setCertifications(res.data.data.foundDoctor.certifications)
          setEducation(res.data.data.foundDoctor.education)
          setRole(res.data.data.foundDoctor.role)
          //console.log(res.data.data.found.firstName)
        } else {
          console.log("no doctor found")
        }
      })
    }
  }, [])

  useEffect(() => {
    getBookingData().then(res => {
      console.log(res)
      //setServices(res.data.data.services)
      setClinics(res.data.data.clinic)
    })
  }, [])
  const handleValidation = () => {
    // if (!role) {
    //   setIsRole(true)
    // }
    if (!speciality) {
      setIsSpeciality(true)
    }
    if (!phoneNumber) {
      setIsPhoneNumber(true)
    }
  }

  const updateData = async () => {
    var formdata = new FormData()
    formdata.append("_id", id)
    formdata.append("firstName", firstName)
    formdata.append("lastName", lastName)
    formdata.append("role", role)
    formdata.append("email", email)
    formdata.append("speciality", speciality)
    formdata.append("emiratesId", emiratesId)
    formdata.append("password", password)
    formdata.append("clinicName", clinicName)
    formdata.append("phoneNumber", phoneNumber)
    formdata.append("image", image)
    formdata.append("gender", gender)
    formdata.append("nationality", nationality)
    formdata.append("totalExperience", totalExperience)
    formdata.append("profile", profile)
    formdata.append("certifications", certifications)
    formdata.append("education", education)
    console.log(formdata)
    await updateDoctor(
      //{
      // _id: id,
      // firstName,
      // lastName,
      // email,
      // phoneNumber,
      // speciality,
      // image,
      // password,
      // role,
      // gender,
      // nationality,
      // totalExperience,
      // profile,
      // certifications,
      // education,
      //}
      formdata
    )
      .then(res => {
        console.log(res)
        history.push("/doctors")
        toast.success("Doctor successfully updated")
      })
      .catch(err => {
        toast.error("Error while updating a doctor")
      })
  }
  //console.log(gender)
  console.log(image, file)
  return (
    <>
      <div className="form-wrapper">
        <Row>
          <div className="border border-secondary rounded  ">
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

              <h5 className="mt-2 text-light">Doctor Details</h5>
            </div>
          </div>
        </Row>
        <Row>
          <Col sm="4">
            <div className="border border-secondary rounded mt-4 ml-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Edit Doctor</h5>
                <Divider />

                {/* {image && (
                  <img
                    className="m-2"
                    style={{ borderRadius: "50px" }}
                    src={image ? `${url}/api/${image}` : profilePic}
                    width="100"
                    height="100"
                  />
                )} */}
                {file.length > 0 ? (
                  <div>
                    <img
                      className="m-2"
                      style={{ borderRadius: "50px" }}
                      src={file}
                      width="100"
                      height="100"
                    />
                    <div>
                      <Button
                        color="primary"
                        className="btn btn-primary m-2"
                        onClick={handleClick}
                      >
                        Upload Photo
                      </Button>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />

                      <p>Only .png .jpg allowed</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      className="m-2"
                      style={{ borderRadius: "50px" }}
                      src={`${url}/api/${image}`}
                      width="100"
                      height="100"
                    />
                    <div>
                      <Button
                        color="primary"
                        className="btn btn-primary m-2"
                        onClick={handleClick}
                      >
                        Upload Photo
                      </Button>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />

                      <p>Only .png .jpg allowed</p>
                    </div>
                  </div>
                )}

                <div className="form-wrapper">
                  <Form>
                    <Form.Group controlId="Role">
                      <Form.Label>
                        Role<sup className="text-danger">*</sup>
                      </Form.Label>
                      <div>
                        <select
                          name="role"
                          className="form-select"
                          aria-label="Default select example"
                          value={role}
                          onChange={e => {
                            setRole(e.target.value)
                            //setIsRole(false)
                          }}
                        >
                          {roleOptions.map(value => (
                            <option value={value} key={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                    <Form.Group controlId="Emirates ID">
                      <Form.Label className="mt-2">
                        Emirates ID
                        {/* <sup className="text-danger">*</sup> */}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="emiratesId"
                        // {...register("emiratesId", {
                        //   required: true,
                        // })}
                        value={emiratesId}
                        onChange={e => setEmiratesId(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </div>
                {/* {isRole && <p className="text-danger"> please select role</p>} */}
              </div>
            </div>
          </Col>
          <Col sm="8">
            <div className="border border-secondary rounded mt-4 mr-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Personal Information</h5>
                <Divider />
                <div className="form-wrapper">
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="First Name">
                        <Form.Label>
                          First Name<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          {...register("firstName", {
                            required: true,
                            maxLength: 20,
                          })}
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          autoFocus
                        />
                      </Form.Group>
                      {!firstName &&
                        errors.firstName &&
                        errors.firstName.type === "required" && (
                          <p className="text-danger">Please Enter First Name</p>
                        )}
                      {errors.firstName &&
                        errors.firstName.type === "maxLength" && (
                          <p className="text-danger">
                            Please check the First Name
                          </p>
                        )}
                    </Col>

                    <Col sm="6">
                      <Form.Group controlId="Last Name">
                        <Form.Label>
                          Last Name<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          {...register("lastName", {
                            required: true,
                            maxLength: 20,
                          })}
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </Form.Group>
                      {!lastName &&
                        errors.lastName &&
                        errors.lastName.type === "required" && (
                          <p className="text-danger">Please Enter Last Name</p>
                        )}
                      {errors.lastName &&
                        errors.lastName.type === "maxLength" && (
                          <p className="text-danger">
                            Please check the Last Name
                          </p>
                        )}
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
                          {...register("email", {
                            required: true,
                            pattern:
                              // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      {!email &&
                        errors.email &&
                        errors.email.type === "required" && (
                          <p className="text-danger">Please Enter email</p>
                        )}
                      {errors.email && errors.email.type === "pattern" && (
                        <p className="text-danger">Invalid email</p>
                      )}
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
                      {!phoneNumber && isPhoneNumber && (
                        <p className="text-danger">Please Enter phone number</p>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Gender">
                        <Form.Label>Gender</Form.Label>
                        &nbsp;&nbsp;&nbsp;
                        <div className="form-check form-check-inline">
                          <br />
                          <input
                            type="radio"
                            value="male"
                            checked={gender === "male"}
                            id="male"
                            onClick={e => setGender(e.target.value)}
                            name={gender}
                          />{" "}
                          <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            value="female"
                            checked={gender === "female"}
                            id="female"
                            onClick={e => setGender(e.target.value)}
                            name={gender}
                          />{" "}
                          <label htmlFor="female">Female</label>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Nationality">
                        <Form.Label className="mt-2">Nationality</Form.Label>
                        <div>
                          <Select
                            style={{ width: "150px" }}
                            value={nationality}
                            onChange={e => selectCountryHandler(e.target.value)}
                          >
                            {!!countryArr?.length &&
                              countryArr.map(({ label, value }) => (
                                <MenuItem key={value} value={value}>
                                  {label}
                                </MenuItem>
                              ))}
                          </Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Password">
                        <Form.Label className="mt-2">Password</Form.Label>
                        {/* <div className="Label1">
                          <label>Password</label>
                        </div> */}
                        <div className="input1">
                          {/* <i id="passlock" className="fa fa-lock icon"></i>
                          <i
                            id="showpass"
                            className="fa fa-eye icon"
                            onClick={() => {
                              setToggle1(!toggle1)
                            }}
                          ></i> */}
                          <input
                            style={{
                              width: "433px",
                              height: "36px",
                              border: "1px solid #ced4da",
                              borderRadius: "5px",
                            }}
                            className="input-field"
                            type="password"
                            name="password"
                            // {...register("password")}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          ></input>
                          {/* <div>{errors?.password?.message}</div> */}
                        </div>
                      </Form.Group>
                      {/* <p className="text-danger">{errors.password?.message}</p> */}

                      {/* <div className="Button">
                          <button type="submit">Submit</button>
                        </div> */}

                      {/* <Form.Group controlId="Password">
                        <Form.Label className="mt-2">
                          Password<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          {...register("password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                          })}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      {!password &&
                        errors.password &&
                        errors.password.type === "required" && (
                          <p className="text-danger">Please Enter password</p>
                        )}
                      {errors.password &&
                        errors.password.type === "pattern" && (
                          <p className="text-danger">Invalid password</p>
                        )} */}
                    </Col>
                    <Col sm="6">
                      {/* <Form.Group controlId="Repeat Password">
                        <Form.Label className="mt-2">
                          Repeat Password<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group> */}
                      <Form.Group controlId="Password">
                        <Form.Label className="mt-2">
                          Confirm Password
                        </Form.Label>
                        <div className="input2">
                          {/* <i id="passlock" className="fa fa-lock icon"></i>
                          <i
                            id="showpass"
                            className="fa fa-eye icon"
                            onClick={() => {
                              setToggle2(!toggle2)
                            }}
                          ></i> */}
                          <input
                            style={{
                              width: "433px",
                              height: "36px",
                              border: "1px solid #ced4da",
                              borderRadius: "5px",
                            }}
                            className="input-field"
                            type="password"
                            name="cpassword"
                            //{...register("cpassword")}
                            value={cpassword}
                            onChange={e => setCPassword(e.target.value)}
                          ></input>
                        </div>
                      </Form.Group>
                      {/* <p className="text-danger">{errors.cpassword?.message}</p> */}
                    </Col>
                  </Row>
                  <br />
                  <h5>Professional Information</h5>
                  <br />
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Speciality">
                        <Form.Label>
                          Speciality<sup className="text-danger">*</sup>
                        </Form.Label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={speciality}
                          onChange={e => {
                            setSpeciality(e.target.value)
                            setIsSpeciality(false)
                          }}
                        >
                          {options.map(value => (
                            <option value={value} key={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </Form.Group>

                      {isSpeciality && (
                        <p className="text-danger"> Please select speciality</p>
                      )}
                    </Col>

                    <Col sm="6">
                      <Form.Group controlId="Clinic Name">
                        <Form.Label>Clinic Name</Form.Label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={clinicName}
                          onChange={e => setClinicName(e.target.value)}
                        >
                          <option>Select</option>
                          {clinics.map(value => (
                            <option value={value.address} key={value.address}>
                              {value.address}
                            </option>
                          ))}
                        </select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Total Experience">
                        <Form.Label className="mt-2">
                          Total Experience
                        </Form.Label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={totalExperience}
                            onChange={e => setTotalExperience(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Profile">
                        <Form.Label className="mt-2">Profile</Form.Label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={profile}
                            onChange={e => setProfile(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Certifications">
                        <Form.Label className="mt-2">Certifications</Form.Label>

                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={certifications}
                            onChange={e => setCertifications(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Education">
                        <Form.Label className="mt-2">Education</Form.Label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={education}
                            onChange={e => setEducation(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <br />
                  <Button
                    onClick={updateData}
                    type="submit"
                    color="primary"
                    className="btn btn-primary m-2 "
                  >
                    <span
                    //onClick={handleValidation}
                    >
                      Update Doctor
                    </span>
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    className="btn btn-primary m-2 "
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default EditDoctor
