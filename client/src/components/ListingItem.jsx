import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';

const ListingItem = ({listing}) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0] || "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftechmoran.com%2F2023%2F04%2F13%2Fthe-ultimate-guide-to-real-estate%2F&psig=AOvVaw379a6c8gjxQw4nHOpFRYDX&ust=1704224262023000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDSqsamvIMDFQAAAAAdAAAAABAI"} alt="listing cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-600'/>
            <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>
          <p className='text-slate-600 mt-2 font-semibold'> 
           ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
           {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs flex items-center'>
              <FaBed className='text-lg mr-1' />
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs flex items-center'>
              <FaBath className='text-lg mr-1' />
              {listing.bathrooms > 1 ? `${listing.bathrooms} beds ` : `${listing.bedrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
};

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired
};

export default ListingItem