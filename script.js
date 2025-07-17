document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_USERNAME = 'RiteshKumarShukla';

    // Sidebar elements
    const profileImage = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const githubStats = document.getElementById('github-stats');
    const techStackContainer = document.getElementById('tech-stack');

    // Terminal elements
    const output = document.getElementById('output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    // Toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const soundToggle = document.getElementById('sound-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    let soundEnabled = false;

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Fetch user data from GitHub
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        .then(response => response.json())
        .then(data => {
            profileImage.src = data.avatar_url;
            profileName.textContent = data.name;
            profileBio.textContent = data.bio;
            githubStats.innerHTML = `
                <p>Followers: ${data.followers}</p>
                <p>Following: ${data.following}</p>
                <p>Public Repos: ${data.public_repos}</p>
            `;
        });

    let projects = [];

    // Fetch projects from GitHub
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`)
        .then(response => response.json())
        .then(data => {
            projects = data.map(repo => ({
                name: repo.name,
                description: repo.description,
                language: repo.language,
                url: repo.html_url
            }));
        });

    // Tech stack
    const techStack = [
        'HTML', 'CSS', 'JavaScript', 'Vue.js', 'Nuxt.js', 'React', 'Redux', 'Vuetify', 'Tailwind',
        'Node.js', 'Express.js', 'MongoDB', 'REST APIs',
        'Git', 'GitHub', 'Postman', 'Chart.js', 'Axios', 'VS Code', 'Netlify', 'Vercel'
    ];

    techStack.forEach(tech => {
        const p = document.createElement('p');
        p.textContent = tech;
        techStackContainer.appendChild(p);
    });

    const commands = {
        help: () => `
            Available commands:
            - about
            - experience
            - skills
            - education
            - projects
            - github
            - joke
            - quote
            - help
            - clear
        `,
        about: () => `
            A passionate full-stack developer with hands-on experience in MERN stack, Vue.js, Nuxt, and more.
            Currently working as a Software Engineer at RMR Technology.
        `,
        experience: () => `
            RMR Technology - Software Engineer (2023 - Present)
              - Built and scaled fintech web apps using Node.js, Vue, and MongoDB
              - Integrated IIFL APIs, improved data processing pipelines

            Digiblocks LLC - Full Stack Web Developer (2022 - 2023)
              - Developed user dashboards and REST APIs in MERN stack
              - Worked closely with design and QA teams for delivery

            Masai School - Full Stack Developer Intern (2021 - 2022)
              - Learned and implemented real-world projects in React, Node, and Express
        `,
        skills: () => techStack.join(', '),
        education: () => `
            Masai School, Bangalore — Full Stack Web Development (2021 - 2022)
            AKTU of Allahabad — BTech. (2016 - 2020)
        `,
        projects: () => {
            if (projects.length === 0) {
                return 'Fetching projects...';
            }
            let projectList = '';
            projects.forEach(p => {
                projectList += `
                    <div>
                        <strong>${p.name}</strong> - ${p.description || 'No description'}
                        <br>
                        <a href="${p.url}" target="_blank">GitHub</a>
                        <br>
                        <span>Language: ${p.language}</span>
                    </div>
                    <br>
                `;
            });
            return projectList;
        },
        github: () => {
            window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank');
            return 'Opening GitHub profile...';
        },
        joke: () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs.",
                "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
                "What's a programmer's favorite place to hang out? Foo Bar."
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        quote: () => {
            const quotes = [
                "The best way to predict the future is to create it.",
                "The only way to do great work is to love what you do.",
                "Code is like humor. When you have to explain it, it’s bad."
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        },
        clear: () => {
            output.innerHTML = '';
            return '';
        },
        'sudo hire ritesh': () => {
            return 'Access granted. Initiating contact sequence...';
        }
    };

    let commandHistory = [];
    let historyIndex = 0;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                const commandElement = document.createElement('div');
                commandElement.innerHTML = `<span class="prompt">$</span> ${command}`;
                output.appendChild(commandElement);

                const [cmd, ...args] = command.split(' ');
                const resultElement = document.createElement('div');
                resultElement.classList.add('result');
                if (commands[cmd]) {
                    const result = commands[cmd](args);
                    if (result) {
                        typeResponse(result, resultElement);
                    }
                } else {
                    typeResponse(`Command not found: ${cmd}`, resultElement);
                }
                output.appendChild(resultElement);
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? 'Sound ON' : 'Sound OFF';
    });

    function typeResponse(text, element) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            } else {
                element.style.borderRight = 'none';
            }
        }
        typing();
    }

    function bootSequence() {
        const bootMessages = [
            'Booting up...',
            'Loading environment...',
            'Initializing modules...',
            'Connecting to GitHub...',
            'Welcome Ritesh!',
        ];

        let i = 0;
        function showBootMessage() {
            if (i < bootMessages.length) {
                const bootElement = document.createElement('div');
                bootElement.classList.add('result');
                output.appendChild(bootElement);
                typeResponse(bootMessages[i], bootElement);
                i++;
                setTimeout(showBootMessage, 1000);
            } else {
                const welcomeMessage = document.createElement('div');
                welcomeMessage.innerHTML = `
                    <pre>
 __          __  _                          _
 \ \        / / | |                        | |
  \ \  /\  / /__| | ___ ___  _ __ ___   ___| |
   \ \/  \/ / _ \ |/ __/ _ \| '_ \` _ \ / _ \ |
    \  /\  /  __/ | (_| (_) | | | | | |  __/_|
     \/  \/ \___|_|\___\___/|_| |_| |_|\___(_)
                    </pre>
                    <p>Welcome to my terminal portfolio. Type 'help' to see the available commands.</p>
                `;
                output.appendChild(welcomeMessage);
            }
        }
        showBootMessage();
    }

    bootSequence();
});
