import axios from "axios"
import url from "./Api/api"

const token = sessionStorage.getItem("token")
console.log(token)

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
}

const getAllPatients = async () => {
  let res = await axios.get(`${url}/api/patient/getallpatients`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}
const getPatientById = async data => {
  let res = await axios.post(`${url}/api/patient/getpatient`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}

const getPatientScans = async data => {
  let res = await axios.post(`${url}/api/scans/getmyscans`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
  console.log(res)
  return res
}

const getConversations = async data => {
  let res = await axios.post(`${url}/api/chat/getconversations`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}

const getCon = async data => {
  let res = await axios.post(`${url}/api/chat/getcon`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}

const getConversationMessages = async data => {
  let res = await axios.post(`${url}/api/chat/getconversationmessages`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}

const newMessage = async data => {
  let res = await axios.post(`${url}/api/chat/newmessage`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}
const newMessageImage = async data => {
  let res = await axios.post(`${url}/api/chat/newmessageimage`, data)

  console.log(res)
  return res
}

const addNewNote = async data => {
  let res = await axios.post(`${url}/api/patient/addpatientnotes`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}

const getNotes = async data => {
  console.log(data)
  let res = await axios.post(`${url}/api/patient/getnotes`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}

// const getAllDoctors = async data => {
//   console.log(data)
//   let res = await axios.post(`${url}/api/user/getalldoctors`, data)

//   console.log(res)
//   return res
// }
const clinicVerify = async data => {
  let res = await axios.post(`${url}/api/file/clinicverify`, data)

  console.log(res)
  return res
}

const updateClinicDetails = async data => {
  let res = await axios.post(`${url}/api/file/updateclinicdetails`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })

  console.log(res)
  return res
}
const updateUserProfile = async data => {
  let res = await axios.post(`${url}/api/user/updateprofile`, data)

  console.log(res)
  return res
}
// const deletePatient = async data => {
//   let res = await axios.post(`${url}/api/user/deletepatient`, data)

//   console.log(res)
//   return res
// }
const deleteAccount = async data => {
  let res = await axios.post(`${url}/api/user/deleteaccount`, data)

  console.log(res)
  return res
}
const activePatients = async () => {
  let res = await axios.get(`${url}/api/user/activepatients`)
  console.log(res)
  return res
}

const newPatientRequests = async () => {
  let res = await axios.get(`${url}/api/user/newpatientreq`)
  console.log(res)
  return res
}

const doctorScans = async () => {
  let res = await axios.get(`${url}/api/doctors/getdoctorscans`)
  console.log(res)
  return res
}
const unSeenMessages = async () => {
  let res = await axios.get(`${url}/api/chat/unseen`)
  console.log(res)
  return res
}

const cronSchedule = async data => {
  let res = await axios.post(`${url}/api/scans/cron`, data)
  console.log(res)
  return res
}
const getContacts = async () => {
  let res = await axios.get(`${url}/api/user/getcontacts`)
  console.log(res)
  return res
}
const getContactById = async data => {
  let res = await axios.post(`${url}/api/user/getcontact`, data)
  console.log(res)
  return res
}
const getAllNotifications = async data => {
  let res = await axios.post(
    `${url}/api/notification/getallnotifications`,
    data
  )
  console.log(res)
  return res
}
const getNotifications = async data => {
  let res = await axios.post(`${url}/api/notification/getnoti`, data)
  console.log(res)
  return res
}
const sendNotification = async data => {
  let res = await axios.post(`${url}/api/notification/send`, data)
  console.log(res)
  return res
}
const createNewChat = async data => {
  let res = await axios.post(`${url}/api/chat/createchat`, data)
  console.log(res)
  return res
}

export {
  getAllPatients,
  getPatientById,
  getPatientScans,
  getConversations,
  getConversationMessages,
  addNewNote,
  getNotes,
  newMessage,
  //getAllDoctors,
  newMessageImage,
  clinicVerify,
  updateClinicDetails,
  updateUserProfile,
  //deletePatient,
  getCon,
  deleteAccount,
  activePatients,
  newPatientRequests,
  doctorScans,
  unSeenMessages,
  cronSchedule,
  getContacts,
  getContactById,
  getAllNotifications,
  getNotifications,
  sendNotification,
  createNewChat,
}
