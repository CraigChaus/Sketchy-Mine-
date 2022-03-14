import router from "page";
import tokenStore from "../stores/token";
import Swal from "sweetalert2";

export default async function(ctx, next) {
    let token;

    tokenStore.subscribe(tokenValue => {
        token = tokenValue
    });


    // const verifyCredentials = async() => {
    //     const response = await fetch(`http://localhost:3000/credentials`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token.token}`,
    //             'Content-Type': 'application/json'
    //         },
    //     });

    //     if (response.ok) {
    //         console.log("Success. no errors found")
    //         next();
    //     } else {
    //         console.log("Error code " + response.status + " something went wrong")
    //         loginRequired();
    //         router.redirect('/login');
    //     }
    // };

    const verifyCredentials = async() => {
        next();
    }

    await verifyCredentials();


    function loginRequired() {
        console.log("you must be logged in for this.")
    }

}