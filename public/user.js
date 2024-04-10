const userIn = document.querySelector('.user')
const logOut = document.querySelector('.user-out')
const logIn = document.querySelector('.user-in')


window.onload = function() {
    fetchUserData();

    async function fetchUserData() {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
			console.log(data);

            if (data.user) {
                displayUserInfo(data.user);
                logIn.style.display = 'none'
            } else {
                console.log(data.error); // Display error message if any
                logOut.style.display = 'none'
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    function displayUserInfo(user) {
		console.log(user);
        userIn.textContent = `
            Welcome ${user.firstname}
        `;
    }
};
