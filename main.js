"use strict"

// 从 localStorage 加载咖啡数据
function loadCoffees() {
    const saved = localStorage.getItem('coffees');
    if (saved) {
        return JSON.parse(saved);
    }
    // 默认咖啡列表
    return [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];
}

// 保存到 localStorage
function saveCoffees() {
    localStorage.setItem('coffees', JSON.stringify(coffees));
}

// 渲染单个咖啡（div 结构）
function renderCoffee(coffee) {
    return `
        <div class="coffee">
            <h3>${coffee.name}</h3>
            <p>${coffee.roast}</p>
        </div>
    `;
}

// 根据当前搜索词和烘焙类型筛选并渲染
function updateCoffees() {
    const searchTerm = nameSearch.value.toLowerCase();
    const selectedRoast = roastSelection.value;

    const filtered = coffees
        .filter(coffee => {
            const matchesRoast = selectedRoast === 'all' || coffee.roast === selectedRoast;
            const matchesName = coffee.name.toLowerCase().includes(searchTerm);
            return matchesRoast && matchesName;
        })
        .sort((a, b) => a.id - b.id); // 按 ID 升序

    coffeeContainer.innerHTML = filtered.map(renderCoffee).join('');
}

// 添加新咖啡
function addCoffee(e) {
    e.preventDefault();
    const name = newNameInput.value.trim();
    const roast = newRoastInput.value;
    if (!name) return;

    const newId = coffees.length > 0 ? Math.max(...coffees.map(c => c.id)) + 1 : 1;
    coffees.push({ id: newId, name, roast });
    saveCoffees();
    updateCoffees();
    addCoffeeForm.reset();
}

// 初始化
const coffees = loadCoffees();
const coffeeContainer = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-selection');
const nameSearch = document.querySelector('#name-search');
const addCoffeeForm = document.querySelector('#add-coffee-form');
const newNameInput = document.querySelector('#new-name');
const newRoastInput = document.querySelector('#new-roast');
const filterForm = document.querySelector('#filter-form');

// 实时更新：输入搜索词或切换烘焙类型时触发
nameSearch.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);

// 阻止表单默认提交
filterForm.addEventListener('submit', e => e.preventDefault());

// 添加咖啡表单提交
addCoffeeForm.addEventListener('submit', addCoffee);

// 初始渲染（按 ID 升序）
updateCoffees();
