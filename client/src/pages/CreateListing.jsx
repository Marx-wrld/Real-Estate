import { useState } from 'react';
import { getStorage, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { useSelector } from 'react-redux';

const CreateListing = () => {
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
        parking: false,
        furniture: false
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false); //To show a loading spinner when uploading images
    const [imageUploadError, setImageUploadError] = useState(false);
    const isImageFileValid = (file) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

        return allowedExtensions.includes(`.${extension.toLowerCase()}`);
    }
    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = []; //Uploading more than one image hence promises

            for (let i = 0; i < files.length; i++) {
                if (isImageFileValid(files[i])) {
                    promises.push(storeImage(files[i]));
                } else {
                    setImageUploadError('Invalid file type!');
                    setUploading(false);
                    return; // Exit the loop and function
                }
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) }); //helps to keep the previous images and only add new urls to previous
                setImageUploadError(false);
                setUploading(false); //When all images are uploaded successfully
            }).catch((err) => {
                console.log(err);
                setImageUploadError('Image upload failed. Please try again!');
                setUploading(false); //incase of an error

            });
        } else {
            setImageUploadError('You can only upload 6 images max. per listing!');
            setUploading(false); //other errors
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        resolve(downloadURL);
                    });
                }
            )
        });
    }

    const handleRemoveImage = (index) => () => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index) //removing the image that has this index -> i
        });
    }

    const handleChange = (e) => {
       if (e.target.id === 'sale' || e.target.id === 'rent'){
        setFormData({
            ...formData,
            type: e.target.id
        });
     }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            });
     }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
   };

   const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/listings/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                userRef: currentUser._id,
            })
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
            setError(data.message);
        }
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
   }

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-6 mt-3">
                Create a Listing
            </h1>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />

                    <textarea type="text" placeholder="Description" className="border resize-none p-3 rounded-lg" id="description" required onChange={handleChange} value={formData.description} />

                    <input type="text" placeholder="Address" className="border p-3 rounded-lg" id="address" required onChange={handleChange} value={formData.address} />

                    <div className="flex gap-6 flex-wrap">

                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={formData.type === "sale"} />
                            <span>Sell</span>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={formData.type === "rent"} />
                            <span>Rent</span>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={formData.type === "parking"} />
                            <span>Parking spot</span>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" onChange={handleChange} checked={formData.type === "furnished"} id="furnished" className="w-5" />
                            <span>Furnished</span>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={formData.type === "offer"} />
                            <span>Offer</span>
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" required onChange={handleChange} value={formData.bedrooms} />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" required onChange={handleChange} value={formData.bathrooms} />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularPrice" min='50' max='1000000000' className="p-3 border border-gray-300 rounded-lg" required onChange={handleChange} value={formData.regularPrice}/>
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                <span className="text-xs">($ /month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="discountPrice" min='50' max='1000000000' className="p-3 border border-gray-300 rounded-lg" required onChange={handleChange} value={formData.discountPrice} />
                            <div className="flex flex-col items-center">
                                <p>Discounted price</p>
                                <span className="text-xs">($ /month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">Images:
                        <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple />
                        <button disabled={uploading} type='button' onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? 'uploading...' : 'Upload'}</button>
                    </div>
                    <p className='text-red-600'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                                <button type='button' onClick={handleRemoveImage(index)} className='p-3 text-red-600 rounded-lg uppercase hover:opacity-75'>Delete</button>
                            </div>
                        ))
                    }
                    <button className="p-3 bg-slate-700 text-white rounded-lg mt-4 uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Creating...' : 'Create Listing'}</button>
                    {error && <p className="text-red-600">{error}</p>}
                </div>
            </form>
        </main>
    )
}

export default CreateListing