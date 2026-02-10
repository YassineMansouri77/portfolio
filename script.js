const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.tab;
        sections.forEach(sec => {
            sec.classList.remove('active');
            if(sec.id === target) sec.classList.add('active');
        });
    });
});
