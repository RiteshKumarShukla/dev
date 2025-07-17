window.addEventListener('load', () => {
  fetch('https://api.github.com/users/riteshkumarshukla')
    .then(response => response.json())
    .then(data => {
      const profileContainer = document.querySelector('.profile-container');
      const profileImage = document.querySelector('.profile-image');
      const profileInfo = document.querySelector('.profile-info');
      const socialLinks = document.querySelector('.social-links');
      const buttonsContainer = document.querySelector('.buttons-container');

      profileImage.src = data.avatar_url;
      profileInfo.innerHTML = `
        <h1>${data.name}</h1>
        <p>${data.bio}</p>
      `;

      socialLinks.innerHTML = `
        <a href="${data.html_url}" target="_blank">
          <img src="assets/images/github.svg" alt="GitHub">
        </a>
        <a href="https://www.linkedin.com/in/riteshkrshukla/" target="_blank">
          <img src="assets/images/linkedin.svg" alt="LinkedIn">
        </a>
        <a href="https://twitter.com/ritesh_shuklaa" target="_blank">
          <img src="assets/images/twitter.svg" alt="Twitter">
        </a>
      `;

      buttonsContainer.innerHTML = `
        <a href="${data.blog}" class="button" download>Download Resume</a>
        <a href="mailto:${data.email}" class="button">Contact Me</a>
      `;
    });
});
