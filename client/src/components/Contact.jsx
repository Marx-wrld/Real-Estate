import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState(''); // '' is the initial state of the message textarea
    const onChange = (e) => {
        setMessage(e.target.value);
    }
    useEffect(() =>{
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listing.userRef]);

  return (
    <>
        { landlord && (
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <img src={landlord.avatar} alt="avatar" className="w-12 h-12 rounded-full"/>
                    <p className="ml-2"> Contact <span className="font-semibold">{landlord.username} </span>for <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
                </div>
                <textarea name="message" id="messsage" rows="2" value={message} onChange={onChange} placeholder="Enter your message" className="w-full border-1 p-3 rounded-lg resize-none" style={{ height: '80px' }}></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
};

Contact.propTypes = {
    listing: PropTypes.shape({
        userRef: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};


export default Contact

