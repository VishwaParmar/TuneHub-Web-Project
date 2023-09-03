export const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    if(user){
        return true;
    }else{
        return false;
    }
}

export const isAdmin = () => {
    const user = localStorage.getItem("user");
    if(user){
        const userJson = JSON.parse(user);
        if(userJson.userRole === "Admin"){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}