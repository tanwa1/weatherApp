
export function getCityData(getCity) {
    localStorage.setItem('getCity', JSON.stringify(getCity));
}

export function loadCityData(){
    const data = localStorage.getItem('getCity');
    return data ? JSON.parse(data) : {};
}

