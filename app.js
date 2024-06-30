// Global variables
const header = document.querySelector('h1');
const app = document.getElementById('app');
const ddMenu = document.querySelector('#ddMenu');
const html = document.documentElement;
const menuItems = ['Calculator', 'About', 'Contact'];

// Toggle dark/light theme
const toggle = () => html.classList.toggle('dark');

// Set the view based on menu selection
const setView = (view) => {
    header.innerText = view;
    toggleMenu(true);

    if (view === 'Calculator') {
        renderCalculator();
    } else if (view === 'About') {
        renderAbout();
    } else if (view === 'Contact') {
        renderContact();
    }
};

// Toggle the visibility of the dropdown menu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden');
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        document.querySelectorAll('svg')[0].classList.remove('hidden');
        document.querySelectorAll('svg')[1].classList.add('hidden');
    }
};

// Add a row to the container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
};

// Add a monitor to the container
const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl dark:bg-gray-800 dark:text-white">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
};

// Create a button element
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn dark:bg-blue-700 dark:hover:bg-blue-500'>${text}</div>`;
};

// Add buttons to the container
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('');
    addRow(container, btnHTML);
};

// Handle button clicks
const click = (event) => {
    const monitor = document.getElementById('monitor');
    const bac = monitor.innerText.trim();
    const a = event.target.innerText;
    console.log(a);
    if (a === 'clear') {
        monitor.innerText = '';
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac);
    } else {
        monitor.innerText += a;
    }
};

// Render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));
};

// Render the About view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
};

// Render the Contact view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
};

// Render the top menu dynamically
const renderMenu = () => {
    const menuContainer = document.querySelector('.justify-start');
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.innerText = item;
        button.onclick = () => setView(item);
        menuContainer.appendChild(button);
    });

    const ddMenuContent = menuItems.map(item => `
        <button class="block py-1 px-2" onclick="setView('${item}')">${item}</button>
    `).join('');
    ddMenu.innerHTML = ddMenuContent;
};

// Render the dark/light toggle buttons dynamically
const renderThemeToggle = () => {
    const container = document.querySelector('.bg-blue-700 .flex:last-child');
    container.innerHTML = ''; // Clear existing buttons

    const darkButton = document.createElement('button');
    darkButton.className = 'dark:hidden block';
    darkButton.innerText = 'Dark';
    darkButton.onclick = toggle;

    const lightButton = document.createElement('button');
    lightButton.className = 'hidden dark:block';
    lightButton.innerText = 'Light';
    lightButton.onclick = toggle;

    container.appendChild(darkButton);
    container.appendChild(lightButton);
};

// Initialize the application
const init = () => {
    renderMenu();
    renderThemeToggle();
    renderCalculator();
};

// Start the application
init();
// updated 12:02