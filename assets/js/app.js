document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_API_USER_ENDPOINT = 'https://api.github.com/users';
    const userSearchForm = document.querySelector('#user-search-form');
    const userSearchFormFeedback = document.querySelector('.user-not-found');

    // user data
    const userTitle = document.querySelector('#__data-user-title');
    const userAvatar = document.querySelector('#__data-user-avatar');
    const userName = document.querySelector('#__data-username');
    const userDateJoined = document.querySelector('#__data-user-date-joined');
    const userBio = document.querySelector('#__data-user-bio');
    const userRepoCount = document.querySelector('#__data-repo-count');
    const userFollowersCount = document.querySelector('#__data-followers-count');
    const userFollowingCount = document.querySelector('#__data-following-count');
    const userLocation = document.querySelector('#__data-user-location');
    const userWebpage = document.querySelector('#__data-user-webpage');
    const userTwitter = document.querySelector('#__data-user-twitter');
    const userCompany = document.querySelector('#__data-user-company');

    const showUserData = (show) => {
        const dataContainer = document.querySelector('.user-container');

        if(show) {
            dataContainer.style.display = 'grid';
        }else {
            dataContainer.style.display = 'none';
        }
    }

    const setFormError = () => {
        userSearchFormFeedback.style.display = 'inline-block';
        showUserData(false);
    }

    const cleanFormError = () => {
        userSearchFormFeedback.style.display = 'none';
    }

    const fetchUserData = (username) => {
        fetch(`${GITHUB_API_USER_ENDPOINT}/${username}`)
        .then(response => response.json())
        .then(data => {
            
            cleanFormError();

            // show error message
            if(data.message && data.message.toLowerCase() === 'not found') {
                return setFormError();
            }

            const createdAt = new Date(data.created_at);
            const dateFormated = createdAt.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' }) ;

            userTitle.textContent = data.name;
            userAvatar.setAttribute('src', data.avatar_url);
            userName.textContent = `@${data.login}`;
            userDateJoined.textContent = `Joined ${dateFormated}`;
            userBio.textContent = data.bio ? data.bio : 'This profile has no bio';
            userRepoCount.textContent = data.public_repos;
            userFollowersCount.textContent = data.followers;
            userFollowingCount.textContent = data.following;
            
            userLocation.textContent = data.location ? data.location : 'Not Available';
            userTwitter.textContent = data.twitter_username ? data.twitter_username : 'Not Available';
            userWebpage.innerHTML = data.blog ? `<a href="${data.blog}">${data.blog}</a>` : 'Not Available';
            userCompany.textContent = data.company ? data.company : 'Not Available';

            [userLocation, userTwitter, userWebpage, userCompany].map(element => {
                element.classList.remove('not-available');

                if(element.innerHTML.includes('Not Available')) {
                    element.classList.add('not-available');
                }
            });

            showUserData(true);
            
        })
        .catch(error => console.log(error));
    }


    (fetchUserData('oscarvajalmora'));

    userSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchValue = event.target['username'].value;

        fetchUserData(searchValue);
    });

    
    // Theme switch
    const themeSwitchers = document.querySelectorAll('.theme-switcher');
    themeSwitchers.forEach(element => {
        element.addEventListener('click', () => {
            const bodyTag = document.getElementById('app');
            bodyTag.classList.toggle('dark-theme');

            const lightThemeSwitch = document.querySelector('#theme-light');
            const darkThemeSwitch = document.querySelector('#theme-dark');

            darkThemeSwitch.style.display = window.getComputedStyle(darkThemeSwitch).display === 'flex' ? 'none' : '';
            lightThemeSwitch.style.display = window.getComputedStyle(lightThemeSwitch).display === 'flex' ? 'none' : '';
        });
    });

});