import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Button, Image } from "react-bootstrap";

import {
  CTable,

  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm,Controller  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import config from 'src/constant';

import { history } from 'src/_helpers';
import { userActions, alertActions,rolesActions } from 'src/_store';
 import { Alert } from 'src/_components';
 import Select from 'react-select'
 import Form from 'react-bootstrap/Form';

 import axios from 'axios';

 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 
  const Banner = () => {

    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);
    //const data = useSelector(x => x.auth?.value);
   const roles = useSelector(x => x.roles?.list);
     console.log(roles);
    // form validation rules
    
    const [double, setDouble] = useState(false);
    const [students, setStudents] = useState([]);

    const [mailerState, setMailerState] = useState({
      apply: "",
    });

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };

    function handleStateChange(e) {
      setMailerState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));


    }

    const submitEmail = async (e) => {
      setDouble(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
     formData.append("biodata", JSON.stringify({  mailerState }) );

      try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/banners`,
          formData
        );
        console.log(res);
        toast.success("Message Sent!" , {autoClose: 2000})
        // const APIResponse = res // This is response data from AXIOS
        setDouble(false);
        setMailerState({ apply: "" });
         // setStudents(APIResponse.data.result) // Only Response from API is set in state

      } catch (ex) {
        console.log(ex);
          toast.error("Message failed to send!", {autoClose: 2000})
         setMailerState({ apply: "" });
          setDouble(false);


      }
    };

    
    const fetchData = React.useCallback(() => {
      axios({
        "method": "GET",
        "url":  config.BASE_URL+"banners/",
        "headers": { }, "params": {}
      })
        .then((response) => {
  
          const APIResponse = response // This is response data from AXIOS
  
      //  console.log("response: ", APIResponse.data.result) // This is response data from API
  
          setStudents(APIResponse.data.result) // Only Response from API is set in state
       //   console.log("sec" , students);
  
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
  
    React.useEffect(() => {
      fetchData()
    }, [fetchData])
  
  // ---------------delete student----------------------
  const deleteStudent = (e) => {
    if(window.confirm ("Do you really want to delete this entry?")){ 
  
  var pid = e.target.value;
  axios
  .delete(config.BASE_URL + "banners/"+ pid )
  .then((resData) => {
  
    //console.log(resData);
  
    const APIResponse = resData // This is response data from AXIOS
  
    if (APIResponse.data.status === "success") {
  
      //alert("contact deleted");
      //NotificationManager.error('User Deleted');
      toast.error("Image Deleted!", {autoClose: 2000})
  
      setStudents(resData.data.result);  // Only Response from API is set in state
  
    //   setStudents(  students.filter((APIResponse) => {
    //     return APIResponse.data.result.id !== pid;
    //  } )  ); // Only Response from API is set in state
     // console.log(resData.result);
  
    } else if (APIResponse.data.status === "fail") {
      alert("contact not deleted");
      //NotificationManager.error('User Not Deleted');
      toast.error("Image Not Deleted!", {autoClose: 2000})
  
    }
  
    // if (res.status === 200) {
    //   alert("Student successfully deleted");
    //   window.location.reload();
    // } else Promise.reject();
  })
  .catch((err) => console.log(err)   );
    }
  };
  
  const DataTable = () => {
      //var date = new Date();
  
           
    return(
     <>
         { students.map((val , i)  =>  (
  
   
  <CTableRow key={i}>
  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
    <CTableDataCell>
      
      {/* <a target="_blank" rel="noreferrer" href={config.BASE_URL+'app/controllers/files/'+ `${val.banner_path}`}
  ><Button size="sm" variant="success">Banner</Button></a>  */}
  
  <Image src={ 'app/controllers/files/'+ `${val.banner_path}`} className="fluid"/> 
  </CTableDataCell>
   
  <CTableDataCell>  
  {new Date(`${val.banner_timestamp}`).toLocaleString("en-IN", {timeZone: 'Asia/Kolkata' , dateStyle:'medium' , timeStyle:'medium'})
  }
  
  </CTableDataCell>
  <CTableDataCell><Button onClick={ deleteStudent } value={`${val.banner_id}`}
    size="sm" variant="danger">
    Delete
  </Button></CTableDataCell>
  </CTableRow>
        )
        )
        }  
        </>
      );
    
     
  };
  
 
  return (
    <>
    <AppSidebar />
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 px-3"> 

    <CRow>
    <Alert />
    <ToastContainer />

     <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{title}</strong>  
          </CCardHeader>
          <CCardBody> 
                 <form >
{/*                    
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>You would like to apply for  ( eg. Admin Executive / Admin Sales)

</Form.Label>
                                <Form.Select value={mailerState.apply} name="apply" aria-label="Default select example" onChange={handleStateChange}>

                                  <option value=" ">Select Any Option</option>
                                 <option value="Teacher" defaultValue>Teacher
</option>
                                <option value="Admin">Admin
</option>
                                <option value="Coordinator"> Coordinator

</option>
<option value="Leadership role">Leadership Role </option>
<option value="Finance and Accounts">Finance and Accounts</option>
                                </Form.Select>
                                </Form.Group> */}
                                
                   
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Upload Banner</Form.Label>
                                <Form.Control type="file"      required   onChange={saveFile}
 name="resume"  placeholder="Upload Resume" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <button type="button"       disabled={double}
   onClick={() => {
    submitEmail();
    setDouble(true)
 }}  className='btn btn-success'  >    Submit

    </button>
                            </Form.Group>
 
                </form>
           
       </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
    <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Career Form Enquiry</strong> <small>From Website</small>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p>  */}
            <CTable responsive bordered>
                <CTableHead color="light">
                  <CTableRow>
                    
                    <CTableHeaderCell   scope="col">id</CTableHeaderCell>
 			<CTableHeaderCell  scope="col">Banner</CTableHeaderCell>
			<CTableHeaderCell  scope="col">Date</CTableHeaderCell>
			<CTableHeaderCell  scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                { DataTable()}
                </CTableBody>
              </CTable>
           </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <AppFooter />
      </div>
    </div>
    </>
  )
}

export default Banner
