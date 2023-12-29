const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold">Search Term:</label>
                    <input type="text" placeholder="Search..." id="searchTerm" className="border rounded-lg p-3 w-full" />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className="whitespace-nowrap font-semibold">Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all" className="" />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className="" />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className="" />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className="" />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className="whitespace-nowrap font-semibold">Amenities:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking" className="" />
                        <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished" className="" />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Sort:</label>
                    <select name="sort" id="sort_order" className="border-1 border-blue-500 rounded-lg p-3">
                        <option value="hl">Price high to low</option>
                        <option value="lh">Price low to high</option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
            </form>
        </div>
        <div className="mb-3">
            <h1 className="text-3xl font-semibold p-3 text-slate-700">Listing results:</h1>
        </div>
    </div>
  )
};

export default Search