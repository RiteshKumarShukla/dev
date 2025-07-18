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
    const typingSound = new Audio('https://www.soundjay.com/button/sounds/button-7.mp3');
    const responseSound = new Audio('https://www.soundjay.com/button/sounds/button-10.mp3');

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

    const projects = [
        {
            name: 'Project 1',
            description: 'A cool project I worked on.',
            language: 'JavaScript',
            url: 'https://github.com/RiteshKumarShukla/Project1'
        },
        {
            name: 'Project 2',
            description: 'Another cool project.',
            language: 'Vue.js',
            url: 'https://github.com/RiteshKumarShukla/Project2'
        },
        {
            name: 'Project 3',
            description: 'A project that solves a problem.',
            language: 'Node.js',
            url: 'https://github.com/RiteshKumarShukla/Project3'
        }
    ];

    // Tech stack
    const techStack = {
        frontend: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Nuxt.js', 'React', 'Redux', 'Vuetify', 'Tailwind'],
        backend: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
        devops: ['Git', 'GitHub', 'Netlify', 'Vercel'],
        tools: ['Postman', 'Chart.js', 'Axios', 'VS Code']
    };

    for (const category in techStack) {
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        techStackContainer.appendChild(categoryTitle);
        const skillList = document.createElement('ul');
        techStack[category].forEach(tech => {
            const li = document.createElement('li');
            li.textContent = tech;
            skillList.appendChild(li);
        });
        techStackContainer.appendChild(skillList);
    }

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
            <span class="command">RMR Technology - Software Engineer (2023 - Present)</span>
              - <span class="prompt">Role:</span> Building and scaling fintech web applications.
              - <span class="prompt">Responsibilities:</span> Developing new features, maintaining existing code, and collaborating with cross-functional teams.
              - <span class="prompt">Tech Stack:</span> Node.js, Vue.js, MongoDB, Express.js, IIFL APIs.
              - <span class="prompt">Achievements:</span> Successfully integrated IIFL APIs, leading to a 20% improvement in data processing efficiency.

            <span class="command">Digiblocks LLC - Full Stack Web Developer (2022 - 2023)</span>
              - <span class="prompt">Role:</span> Full-stack development of web applications.
              - <span class="prompt">Responsibilities:</span> Designing and implementing user-facing features, building RESTful APIs, and managing databases.
              - <span class="prompt">Tech Stack:</span> MERN (MongoDB, Express.js, React, Node.js) stack.
              - <span class="prompt">Achievements:</span> Developed a new user dashboard that improved user engagement by 15%.

            <span class="command">Masai School - Full Stack Developer Intern (2021 - 2022)</span>
              - <span class="prompt">Role:</span> Intern, learning and applying full-stack development skills.
              - <span class="prompt">Responsibilities:</span> Collaborated on real-world projects, building applications from scratch.
              - <span class="prompt">Tech Stack:</span> React, Node.js, Express, MongoDB.
              - <span class="prompt">Achievements:</span> Successfully completed three major projects, demonstrating proficiency in full-stack development.
        `,
        skills: () => {
            let skillsOutput = '';
            for (const category in techStack) {
                skillsOutput += `\n<span class="command">${category.toUpperCase()}</span>\n`;
                skillsOutput += `  ${techStack[category].join(', ')}\n`;
            }
            return skillsOutput;
        },
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
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const currentInput = terminalInput.value.trim().toLowerCase();
            const suggestions = Object.keys(commands).filter(c => c.startsWith(currentInput));
            if (suggestions.length === 1) {
                terminalInput.value = suggestions[0];
            }
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? 'Sound ON' : 'Sound OFF';
        if (soundEnabled) {
            responseSound.play();
        }
    });

    function typeResponse(text, element) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                if (soundEnabled) {
                    typingSound.currentTime = 0;
                    typingSound.play();
                }
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            } else {
                element.style.borderRight = 'none';
                if (soundEnabled) {
                    responseSound.play();
                }
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
            "Type 'help' to see the available commands."
        ];

        let i = 0;
        function showBootMessage() {
            if (i < bootMessages.length) {
                const bootElement = document.createElement('div');
                bootElement.classList.add('result');
                bootElement.innerHTML = bootMessages[i];
                output.appendChild(bootElement);
                i++;
                setTimeout(showBootMessage, 500);
            }
        }
        showBootMessage();
    }

    bootSequence();
});
