let currentIndex = 0;
const images = document.querySelectorAll('.img-container');

function showImage(index) {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);
