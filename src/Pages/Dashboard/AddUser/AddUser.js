import React, { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadImage from '../../../assets/dashboard/upload-img.svg'
import './AddUser.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/Authprovider';
import Spinner from '../../../components/Spinner/Spinner';


const AddUser = () => {
  const { user } = useContext(AuthContext)
  const [processing, setProcessing] = useState(false);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });


  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const thumbs = files.map(file => (
    <div className='image-preview-container' key={file.name}>
      <div className='preview-image'>
        <img
          src={file.preview}
          alt=''
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));



  const handleAddUser = (e) => {
    setProcessing(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", files[0]);
    const form = e.target;
    const name = form.name.value;
    const username = form.username.value;
    const email = form.email.value;
    const role = form.role.value;
    const plan = form.plan.value;
    const status = form.status.value;


    axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, formData)
      .then(res => {
        // console.log("image upload data-->", res.data);
        if (res?.data?.data?.image?.url) {
          const image = res?.data?.data?.image?.url;
          const userData = { name, username, image, email, role, plan, status }
          axios.post(`${process.env.REACT_APP_API_URL}/add-user?email=${user?.email}`, userData)
            .then(res => {
              // console.log("Server Res-->", res.data.data);
              if (res?.data?.data?.acknowledged) {
                setFiles([])
                setProcessing(false)
                toast.success(`${name} is added successfully!`);
                form.reset();
              }
            })
            .catch(err => {
              console.log(err);
              toast.error("Can't added !!")
            });
        }
      })
      .catch(err => {
        console.error(err)
      })
  }



  return (
    <section className='add-user-wrapper container'>
      <div className="user-form-container">
        <form onSubmit={handleAddUser} className="user-form-contact" tabIndex="1">
          <h1 className='user-title'>Add User</h1>
          <div className='upload-wrapper'>
            <div>
              <h3 className='user-upload-title'>Upload your Image</h3>
              <div {...getRootProps({ className: 'cilck-image' })}>
                <input name='image' {...getInputProps()} />
                <div className='upload-div'>
                  <div className='image-div'>
                    <img src={uploadImage} alt="uploadImageIcons" />
                  </div>
                  <p className='image-title' >Attach a Image</p>
                </div>
              </div>
            </div>
            <aside
              className='aside-container'
            >
              {thumbs}
            </aside>
          </div>


          <div className='user-form-input'>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" className="user-form-contact-input" name="name" placeholder="Name" required />
            </div>
            <div>
              <label htmlFor="name">User Name</label>
              <input type="text" className="user-form-contact-input" name="username" placeholder="userName" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" className="user-form-contact-input" name="email" placeholder="Email" required />
            </div>
            <div>
              <label htmlFor="role">Select an Role</label>
              <br />
              <select name="role" id="" className='user-form-contact-input'>
                <option className="" value="Admin">Admin</option>
                <option className="select-field__option js-option" value="Editor">Editor</option>
                <option className="select-field__option js-option" value="Subscriber">Subscriber</option>
                <option className="select-field__option js-option" value="Author">Author</option>
                <option className="select-field__option js-option" value="Maintainer">Maintainer</option>
              </select>
            </div>

            <div>
              <label htmlFor="plan">Select an Plan</label>
              <br />
              <select name="plan" id="" className='user-form-contact-input'>
                <option className="" value="Company">Company</option>
                <option className="select-field__option js-option" value="Enterprise">Enterprise</option>
                <option className="select-field__option js-option" value="Team">Team</option>
                <option className="select-field__option js-option" value="Basic">Basic</option>
              </select>
            </div>

            <div>
              <label htmlFor="status">Select an Status</label>
              <br />
              <select name="status" id="" className='user-form-contact-input'>
                <option className="" value="Active">Active</option>
                <option className="select-field__option js-option" value="Pending">Pending</option>
                <option className="select-field__option js-option" value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          <button type="submit" className="user-form-contact-button">
            {
              processing ? <Spinner /> : "Add User"
            }
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddUser;