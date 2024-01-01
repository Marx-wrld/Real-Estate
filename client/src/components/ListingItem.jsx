import PropTypes from 'prop-types';
const ListingItem = ({listing}) => {
  return (
    <div>{listing.name}</div>
  )
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired
};

export default ListingItem