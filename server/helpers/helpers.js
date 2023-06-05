const PARK_ID = 3;
const DEFAULT_TOTAL_PLACES = 12;

const getFreePlaces = async (parksInfo, companyInfo) => {
    const myPark = parksInfo.find((park) => park.id === PARK_ID);
    const totalPlacesForCompany =
        myPark?.totalPlacesForCompany || DEFAULT_TOTAL_PLACES;
    const usedPlacesByRegularSubscribers =
        myPark?.usedPlacesByRegularSubscribers || 0;
    const usedPlacesByGuests = myPark?.usedPlacesByGuests || 0;
    const reservedPlaces = companyInfo[0]?.reservedPlaces || 0;

    const freePlaces =
        totalPlacesForCompany -
        (reservedPlaces +
            usedPlacesByRegularSubscribers +
            usedPlacesByGuests);

    return freePlaces;
};

module.exports = {
    getFreePlaces,
};