import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ListingItem from "../components/ListingItem";

const Search = () => {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true:false,
                furnished: furnishedFromUrl === 'true' ? true:false,
                offer: offerFromUrl === 'true' ? true:false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        };

        }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebardata({...sidebardata, type: e.target.id}); // set type to all, rent or sale
        }
        if (e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata, searchTerm: e.target.value}); // set search term
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.targtet.checked === 'true' ? true : false}); // set parking, furnished or offer
        }
        if (e.target.id === 'sort_order'){
            setSidebardata({...sidebardata, sort: e.target.value.split('_')[0] || 'created_at', order: e.target.value.split('_')[1] || 'desc'}); // set sort and order
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();

        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);

        const searchQuery = urlParams.toString(); // converting the params to a string
        navigate(`/search?${searchQuery}`);
    };

  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold">Search Term:</label>
                    <input type="text" placeholder="Search..." id="searchTerm" className="border rounded-lg p-3 w-full" value={sidebardata.searchTerm} onChange={handleChange} />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className="whitespace-nowrap font-semibold">Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all" className="" onChange={handleChange} checked={sidebardata.type === 'all'}/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className="" onChange={handleChange} checked={sidebardata.type === 'rent'} />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className="" onChange={handleChange} checked={sidebardata.type === 'sale'}/>
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className="" onChange={handleChange} checked={sidebardata.offer}/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className="whitespace-nowrap font-semibold">Amenities:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking" className="" onChange={handleChange} checked={sidebardata.type === 'parking'}/>
                        <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished" className="" onChange={handleChange} checked={sidebardata.type === 'furnished'}/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Sort:</label>
                    <select 
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                        name="sort" id="sort_order" className="border-1 border-blue-500 rounded-lg p-3"
                    >
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
            </form>
        </div>
        <div className="mb-3 flex-1">
            <h1 className="text-3xl font-semibold p-3 text-slate-700">Listing results:</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className="text-xl text-slate-700">No listing found!</p>
                )}
                {loading && (
                    <p className="text-xl text-center w-full text-slate-700">Loading...</p>
                )}
                {
                    !loading && listings && listings.map((listing) => {
                        <ListingItem key={listing._id} listing={listing} />
                    })
                }
            </div>
        </div>
    </div>
  )
};

export default Search