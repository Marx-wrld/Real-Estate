export const usePropertyFormat = (property) => {
    //Any property we pass into this is going to have these items ripped off and placed in a nice clean object(return).

    const address = property.location.map((item) => item.name).join(', ');
    const coverPhoto = property.coverPhoto.url;
    const propertyType = `${property.category[0].name}, ${property.category[1].name}`;
    const price = property.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });

    const title = property.title;
    const rooms = property.rooms;
    const baths = property.baths;
    const purpose = property.purpose;
    const sqSize = property.area.toFixed(2);
    const externalID = property.externalID;

    return (
        address,
        coverPhoto,
        propertyType,
        price,
        title,
        rooms,
        baths,
        purpose,
        sqSize,
        externalID
    );
};