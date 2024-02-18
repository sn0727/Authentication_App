const ClearSession =()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('location_ip')
    sessionStorage.removeItem('location_latitude')
    sessionStorage.removeItem('location_longitude')
}

export default ClearSession