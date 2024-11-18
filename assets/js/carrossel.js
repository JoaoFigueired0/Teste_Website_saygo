	  document.addEventListener('DOMContentLoaded', function() {
        const track = document.querySelector('.carousel-track');
        const dotsContainer = document.querySelector('.dots');
        const items = document.querySelectorAll('.carousel-item');
        const itemCount = items.length;
        let currentIndex = 0;

        function updateDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < Math.ceil(itemCount / visibleItems()); i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function visibleItems() {
            if (window.innerWidth < 767) {
                return 1;
            } else if (window.innerWidth < 991) {
                return 2;
            } else {
                return 3;
            }
        }

        function goToSlide(index) {
            currentIndex = index;
            const offset = -(currentIndex * 100 / visibleItems());
            track.style.transform = `translateX(${offset}%)`;
            updateDots();
        }

        window.addEventListener('resize', () => {
            goToSlide(0);
        });

        updateDots();
        goToSlide(0); 
    });
