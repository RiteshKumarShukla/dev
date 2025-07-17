document.addEventListener('DOMContentLoaded', () => {
  const GITHUB_USERNAME = 'RiteshKumarShukla';

  const profileImage = document.getElementById('profile-image');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const techStackContainer = document.getElementById('tech-stack');
  const output = document.getElementById('output');
  const terminalInput = document.getElementById('terminal-input');

  let projects = [];

  // Fetch user data from GitHub
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    .then(response => response.json())
    .then(data => {
      profileImage.src = data.avatar_url;
      profileName.textContent = data.name;
      profileBio.innerHTML = `
        <p>Software Engineer at RMR Technology for the past year.</p>
        <p>${data.bio}</p>
      `;
    });

  // Fetch projects from GitHub
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`)
    .then(response => response.json())
    .then(data => {
      projects = data.map(repo => ({
        name: repo.name,
        description: repo.description,
        stack: repo.language ? [repo.language] : [], // You might want to use GitHub topics for a more accurate stack
        demo: repo.homepage,
        github: repo.html_url
      }));
    });

  // Fetch tech stack - this is a placeholder, as GitHub API doesn't directly provide a tech stack
  const techStack = [
    'javascript', 'react', 'nodejs', 'mongodb', 'vuejs'
  ];

  techStack.forEach(tech => {
    const img = document.createElement('img');
    img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`;
    img.alt = tech;
    techStackContainer.appendChild(img);
  });

  const quotes = [
    "The best way to predict the future is to create it.",
    "The only way to do great work is to love what you do.",
    "Code is like humor. When you have to explain it, it’s bad."
  ];

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
    "What's a programmer's favorite place to hang out? Foo Bar."
  ];

  const commands = {
    help: () => `
      Available commands:
      - <span class="command">about</span>: Show about me section
      - <span class="command">projects</span>: List my projects
      - <span class="command">skills</span>: Show my tech stack
      - <span class="command">experience</span>: Show my work experience
      - <span class="command">education</span>: Show my education
      - <span class="command">quotes</span>: Get a random quote
      - <span class="command">jokes</span>: Get a random programming joke
      - <span class="command">clear</span>: Clear the terminal
    `,
    about: () => `
      I'm a Software Engineer at RMR Technology, where I've been working for the past year.
      I'm passionate about building clean, efficient, and user-friendly applications.
    `,
    projects: () => {
      let projectsList = '<ul>';
      projects.slice(0, 5).forEach(p => {
        projectsList += `
          <li>
            <strong>${p.name}</strong> - ${p.description || 'No description'}
            <br>
            <a href="${p.github}" target="_blank">GitHub</a>
            ${p.demo ? `| <a href="${p.demo}" target="_blank">Live Demo</a>` : ''}
          </li>
        `;
      });
      projectsList += '</ul>';
      return projectsList;
    },
    skills: () => {
      let skillsList = '<ul>';
      techStack.forEach(tech => {
        skillsList += `<li>${tech}</li>`;
      });
      skillsList += '</ul>';
      return skillsList;
    },
    experience: () => `
      <strong>Software Engineer</strong> - RMR Technology (1 year)
      <br>
      - Developed and maintained web applications using React, Node.js, and MongoDB.
      - Collaborated with cross-functional teams to deliver high-quality software.
    `,
    education: () => 'Education details not available.',
    quotes: () => quotes[Math.floor(Math.random() * quotes.length)],
    jokes: () => jokes[Math.floor(Math.random() * jokes.length)],
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  const typeAnimation = (element, text) => {
    let i = 0;
    const typing = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 50);
      }
    }
    typing();
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      if (command) {
        const commandElement = document.createElement('div');
        commandElement.innerHTML = `<span class="prompt">$</span> ${command}`;
        output.appendChild(commandElement);

        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        if (commands[command]) {
          const result = commands[command]();
          if(result) {
            resultElement.innerHTML = result;
            output.appendChild(resultElement);
          }
        } else {
          resultElement.innerHTML = `Command not found: ${command}`;
          output.appendChild(resultElement);
        }
        terminalInput.value = '';
        output.scrollTop = output.scrollHeight;
      }
    }
  });

  // Welcome message
  const welcomeMessage = document.createElement('div');
  welcomeMessage.innerHTML = commands.help();
  output.appendChild(welcomeMessage);
});
