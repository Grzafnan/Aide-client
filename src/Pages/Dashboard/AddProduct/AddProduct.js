import React, { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadImage from '../../../assets/dashboard/upload-img.svg'
import Spinner from '../../../components/Spinner/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider/Authprovider';
import axios from 'axios';
import toast from 'react-hot-toast';
import useRole from '../../../hooks/useRole';


const AddProduct = () => {
  const { user } = useContext(AuthContext)
  const [processing, setProcessing] = useState(false);
  const [files, setFiles] = useState([]);
  const [role, isRoleLoading] = useRole(user?.email)


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


  const handleAddProducts = (e) => {
    setProcessing(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", files[0]);
    const form = e.target;
    const title = form.name.value;
    const price = form.price.value;
    const description = form.description.value;


    axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, formData)
      .then(res => {
        console.log("image upload data-->", res.data);
        if (res?.data?.data?.image?.url) {
          const img = res?.data?.data?.image?.url;
          const productData = { title, price, img, description }
          axios.post(`${process.env.REACT_APP_API_URL}/add-product?email=${user?.email}`, productData)
            .then(res => {
              console.log("Server Res-->", res.data.data);
              if (res?.data?.data?.acknowledged) {
                setFiles([])
                setProcessing(false)
                toast.success(`${title} is added successfully!`);
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

  return (
    <section className='add-user-wrapper container'>
      <div className="user-form-container">
        <form onSubmit={handleAddProducts} className="user-form-contact" tabIndex="1">
          <h1 className='user-title'>Add Product</h1>
          <div className='upload-wrapper'>
            <div>
              <h3 className='user-upload-title'>Upload product Image</h3>
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
              <label htmlFor="name">Product Name</label>
              <input type="text" className="user-form-contact-input" name="name" placeholder="Product Name" required />
            </div>
            <div>
              <label htmlFor="price">Product Price</label>
              <input type="number" className="user-form-contact-input" name="price" placeholder=" Enter a price" required />
            </div>
            <div className='description-area'>
              <label htmlFor="description">Description</label>
              <textarea style={{ padding: '10px' }} type="text" name="description" placeholder="Write a description" required />
            </div>
          </div>
          <button type="submit" className="user-form-contact-button">
            {
              processing ? <Spinner /> : "Add Product"
            }
          </button>
        </form>
      </div>



    </section>
  );
};

export default AddProduct;