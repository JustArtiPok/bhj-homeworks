// Находим все элементы вкладок (переключатели)
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const navigation = this.closest('.tab__navigation');
        if (!navigation) return;
        const tabsInNav = navigation.querySelectorAll('.tab');
        tabsInNav.forEach(t => t.classList.remove('tab_active'));
        this.classList.add('tab_active');
        const index = Array.from(tabsInNav).indexOf(this);
        const container = navigation.parentElement;
        const contents = container.querySelector('.tab__contents');
        if (!contents) return;
        const contentItems = contents.querySelectorAll('.tab__content');
        contentItems.forEach(c => c.classList.remove('tab__content_active'));
        if (contentItems[index]) {
            contentItems[index].classList.add('tab__content_active');
        }
    });
});