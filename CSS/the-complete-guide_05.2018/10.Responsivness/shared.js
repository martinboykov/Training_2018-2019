const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');
const selectPlanButtons = document.querySelectorAll('.plan button');
const modalNoButton = document.
    querySelector('.modal__action--negative');

selectPlanButtons.forEach((element) => {
    element.addEventListener('click', function() {
        // backdrop.style.display = 'block';
        // modal.style.display = 'block';
        modal.classList.add('open');
        backdrop.classList.add('open');
    });
});

backdrop.addEventListener('click', function() {
    closeModal();
});

mobileNav.addEventListener('click', function() {
    closeModal();
});

if (modalNoButton) {
    modalNoButton.addEventListener('click', function() {
        closeModal();
    });
}

toggleButton.addEventListener('click', function() {
    // mobileNav.style.display = 'block';
    // backdrop.style.display = 'block';
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});

function closeModal() {
    // backdrop.style.display = 'none';
    // modal.style.display = 'none';
    backdrop.classList.remove('open');
    if (modal) {
        modal.classList.remove('open');
    }
    mobileNav.classList.remove('open');
}
