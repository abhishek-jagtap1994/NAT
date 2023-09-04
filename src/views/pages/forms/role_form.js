import React from 'react'
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
import { DocsExample } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm,Controller  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from 'src/_helpers';
import { userActions, alertActions,rolesActions } from 'src/_store';
 import { Alert } from 'src/_components';
 import Select from 'react-select'
 
  const Roles = () => {

    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);
    //const data = useSelector(x => x.auth?.value);
   const roles = useSelector(x => x.roles?.list);
     console.log(roles);
    // form validation rules
    

    const validationSchema = Yup.object().shape({
        

            role_name: Yup.string()
            .required('Role Name is required'),
     
           file: Yup.mixed().test("file", "You need to provide a file", (value) => {
            if (value.length > 0) {  
              return true;
            }
            return false;
            }),
             role_description: Yup.string()
            .required('Role Description is required'),
            role_type: Yup.string()
            .required('Role Type is required'),
            activity_id: Yup.array()
           // activity_id: Yup.array()
            .required('Role Activity is required'),
            
       
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    // get functions to build form with useForm() hook
    const { control, register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
   useEffect(() => {
        // if (id) {
        //     setTitle('Edit User');
        //     // fetch user details into redux state and 
        //     // populate form fields with reset()
        //     dispatch(userActions.getById(id)).unwrap()
        //         .then(user => reset(user));
        // } else {
        //     setTitle('Add User');
        // }

        dispatch(rolesActions.getAll());

    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
           
                await dispatch(rolesActions.register(data)).unwrap();
                message = 'Role added';
            

            // redirect to user list with success message
            history.navigate('/roles');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }
  return (
    <>
    <AppSidebar />
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 px-3"> 

    <CRow>
    <Alert />

     <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{title}</strong>  
          </CCardHeader>
          <CCardBody> 
             {!(user?.loading || user?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">First Name</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Last Name</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                    </div> */}
                    <div className="row">

                    <div className="mb-3 col">
                            <label className="form-label">Role Name</label>
                            <input name="role_name" type="text" {...register('role_name')} className={`form-control ${errors.role_name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.role_name?.message}</div>
                        </div>
                        </div>

                         <div className="row">

                    <div className="mb-3 col">
                            <label className="form-label">Role pic</label>
                            <input name="file" type="file" {...register('file')} className={`form-control ${errors.file ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.file?.message}</div>
                        </div>
                        </div>

                        <div className="row">

                        <div className="mb-3 col">
                            <label className="form-label">Role Description</label>

                            <textarea  name="role_description" {...register('role_description')}  className={`form-control ${errors.role_description ? 'is-invalid' : ''}`}></textarea>
                            <div className="invalid-feedback">{errors.role_description?.message}</div>

                            {/* <input name="role_description" type="text" {...register('role_description')} className={`form-control ${errors.role_description ? 'is-invalid' : ''}`} /> */}
                        </div>
                        </div>

                        <div className="row">

                        <div className="mb-3 col">
                            <label className="form-label">Role Type</label>
                            <select name="role_type" {...register('role_type')}  className={`form-control ${errors.role_type ? 'is-invalid' : ''}`}>
                                <option value=''>Please select</option>
                                <option value='1'>Standard</option>
                                <option value='2'>System</option>
                                <option value='3'>Custom</option>
                            </select>
                             
                            <div className="invalid-feedback">{errors.role_type?.message}</div>

                        
                        </div>
                        </div>
                        <div className="row">

                    <div className="mb-3 col">
                <label className="form-label">Activity</label>

{/* 
                <select name="activity_id" {...register('activity_id')}  className={`form-control ${errors.activity_id ? 'is-invalid' : ''}`}>
                <option value='00001'>Test</option>
                                <option value='00002'>Test2</option>
                                <option value='00003'>Test3</option>
                            </select> 

                             <div className="invalid-feedback">{errors.activity_id?.message}</div> */}

<Controller
  name="activity_id"
  control={control}

   render={({ field }) => (
    <Select
      {...field}
      options={options}
      className={`basic-multi-select  ${
        errors.activity_id ? 'is-invalid' : ''
      }`}
      classNamePrefix="select"
      isMulti
    />
    )}
    />
<div className="invalid-feedback">{errors.activity_id?.message}</div>

                        </div>
                        </div>
                        {/* <div className="row">

                        <div className="mb-3 col">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">
                                Password
                                {id && <em className="ml-1">(Leave blank to keep the same password)</em>}
                            </label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div> */}
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/users" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            }
            {user?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {user?.error &&
                <div className="text-center m-5">
                    <div className="text-danger">Error loading user: {user.error}</div>
                </div>
            }
       </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
        <CCol>
            <CCard>
                <CCardBody>
                <div>
            <h1>Users</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Role Name</th>
                        <th style={{ width: '30%' }}>Role Description</th>
                        <th style={{ width: '30%' }}>Status</th>
                        <th style={{ width: '30%' }}>Activity</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {roles?.value?.result.map(role =>
                        <tr key={role.role_id}>
                            <td>{role.role_name}</td>
                            <td>{role.role_description}</td>
                            <td>{role.role_status}</td>
                            <td>{role.activity_values}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${role.role_id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(rolesActions.delete(role.role_id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={role.isDeleting}>
                                    {role.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {roles?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
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

export default Roles
