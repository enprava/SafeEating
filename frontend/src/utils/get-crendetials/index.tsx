
function getCredentials(): [string, string, string] {
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem("token");
    const location = sessionStorage.getItem("location");

    if (!token || !userId) {
        window.location.href = "/login";
        return ["", "", ""];
    }
    if (!location) {
        window.location.href = "/location";
        return ["", "", ""];
    }
    return [userId, token, location];
}

export default getCredentials;