document.addEventListener("DOMContentLoaded", function() {
    const cityButtons = document.querySelectorAll('.city-button');

    cityButtons.forEach(button =>{
        button.addEventListener('click', function() {

            const city = this.getAttribute('data-city');
            window.location.href = `${city}.html`;
        });
    });
});
