import Keycloak from "keycloak-js";

class KeycloakService {
    
    state = {
        keycloak: null,
        isAuthenticated: false
    };
	init(success) {
       
        const keycloak = Keycloak('/keycloak.json');
        
		keycloak.init({ onLoad: "login-required","checkLoginIframe" : false }).then(authenticated => {
            this.state.keycloak = keycloak;
            this.state.isAuthenticated = authenticated;
        });
    
		success(true);
	}

	// getUserData = userId => {
	// 	if (!firebase.apps.length) {
	// 		return false;
	// 	}
	// 	return new Promise((resolve, reject) => {
	// 		this.db
	// 			.ref(`users/${userId}`)
	// 			.once('value')
	// 			.then(snapshot => {
	// 				const user = snapshot.val();
	// 				resolve(user);
	// 			});
	// 	});
	// };

	// updateUserData = user => {
	// 	if (!firebase.apps.length) {
	// 		return false;
	// 	}
	// 	return this.db.ref(`users/${user.uid}`).set(user);
	// };

	// onAuthStateChanged = callback => {
	// 	console.log(this.auth)
	// 	if (!this.auth) {
	// 		return;
	// 	}
	// 	this.auth.onAuthStateChanged(callback);
	// };

	// signOut = () => {
	// 	if (!this.auth) {
	// 		return;
	// 	}
	// 	this.auth.signOut();
	// };
}

const instance = new KeycloakService();

export default instance;
