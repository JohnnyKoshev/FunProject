const dialWindow = document.querySelector('#window');
const targetButton = document.querySelector('#button');
const successWindow = document.querySelector('#success');
const againButton = document.querySelector('#success-button');
const levels = document.querySelectorAll('.level');
const levelsList = document.querySelector('#levels');
const menuButton = document.querySelector('.barLeftItem');
const nextLevelBtn = document.querySelector('.barRightItem');
const bottomBar = document.querySelector('#bottomBar');

const levelsSettings = [
    {
        level: '1',
        windowSpeed: '3s'
    },
    {
        level: '2',
        windowSpeed: '2s'
    },
    {
        level: '3',
        windowSpeed: '1s'
    }
];

// const user = [{level: 1}];
// const myCursor = document.querySelector('#myCursor');


function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const getSpeed = (level, levelsDB) => {
    const foundLevel = levelsDB.filter((item) => item.level === level);
    return foundLevel[0].windowSpeed;
};

const changePositions = () => {
    const randomTop = Math.round(Math.random() * 80);
    const randomLeft = Math.round(Math.random() * 87);
    dialWindow.style.top = `${randomTop}vh`;
    dialWindow.style.left = `${randomLeft}vw`;
}
const handleRandomPos = () => {
    debounce(changePositions, 1)();
}

dialWindow.addEventListener('mouseover', handleRandomPos);
targetButton.addEventListener('click', (event) => {
    if (event.isTrusted) {
        for (let level of levels) {
            const levelNum = level.innerText.replace(/ /g, '').split('-')[1];
            if (dialWindow.dataset.levelNum === levelNum) {
                level.classList.add('list-group-item-success');
            }
            if (levelNum === (parseInt(dialWindow.dataset.levelNum) + 1).toString()) {
                level.removeAttribute('disabled');
            }
        }
        dialWindow.removeEventListener('mouseover', handleRandomPos);
        successWindow.classList.remove('hidden');
        bottomBar.classList.remove('hidden');
        dialWindow.classList.add('hidden');
    } else {
        alert('Do not cheat!');
    }
});
againButton.addEventListener('click', () => {
    dialWindow.style.top = '30vh';
    dialWindow.style.left = '44vw';
    successWindow.classList.add('hidden');
    dialWindow.classList.remove('hidden');
    dialWindow.addEventListener('mouseover', handleRandomPos);
    bottomBar.classList.add('hidden');
})

menuButton.addEventListener('click', () => {
    levelsList.classList.remove('hidden');
    bottomBar.classList.add('hidden');
    successWindow.classList.add('hidden');
})


for (let level of levels) {
    level.addEventListener('click', () => {
        const levelNum = level.innerText.replace(/ /g, '').split('-')[1];
        dialWindow.style.top = '30vh';
        dialWindow.style.left = '44vw';
        levelsList.classList.add('hidden');
        dialWindow.addEventListener('mouseover', handleRandomPos);
        dialWindow.classList.remove('hidden');
        dialWindow.style.transition = `${getSpeed(levelNum, levelsSettings)} ease-out`;
        dialWindow.dataset.levelNum = levelNum;
    })
}

nextLevelBtn.addEventListener('click', () => {
    bottomBar.classList.add('hidden');
    successWindow.classList.add('hidden');
    const nextLevel = (parseInt(dialWindow.dataset.levelNum) + 1).toString();
    for (let level of levels) {
        const levelNum = level.innerText.replace(/ /g, '').split('-')[1];
        if (levelNum === nextLevel) {
            level.dispatchEvent(new Event('click'));
        }
    }
})


// document.addEventListener('mousemove', (event)=>{
//     document.body.style.cursor = 'none';
//     myCursor.style.top = event.pageY +'px';
//     myCursor.style.left = event.pageX + 'px';
// })



