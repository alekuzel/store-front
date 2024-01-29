

export const FetchUserDetailsMixin = {
    methods: {
        async fetchUserDetails(userId) {
            try {
              // Make a request to your backend to get user details
              const response = await fetch(`http://localhost:8000/users/${userId}`);
              
              const userData = await response.json();
      
              // Set the user's name in the component data
              this.name = userData.name || 'Guest';
              this.lastname = userData.lastname || 'Guest';
              this.role = userData.role;
            } catch (error) {
              console.error('Error fetching user details:', error);
            }
          },
        },
        };