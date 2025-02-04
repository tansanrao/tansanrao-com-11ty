// Initialize filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.categories-nav a[data-filter]');
    const posts = document.querySelectorAll('.post-item');
    const postsHeading = document.getElementById('posts-heading');
    const filterToggle = document.querySelector('.filter-toggle');
    const categoriesNav = document.getElementById('categories-nav');

    // Handle filter toggle for mobile
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true';
            filterToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!categoriesNav.contains(e.target) && !filterToggle.contains(e.target)) {
                filterToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Update toggle text when filter changes
        filterLinks.forEach(link => {
            link.addEventListener('click', () => {
                const filterText = link.textContent.trim();
                const toggleText = document.querySelector('.filter-toggle-text');
                toggleText.textContent = filterText;
                filterToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Handle filter functionality
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            filterLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            const filter = link.dataset.filter;
            
            // Update posts heading
            postsHeading.textContent = filter === 'all' ? 'All Posts' : `Posts from ${filter}`;
            
            // Filter posts
            posts.forEach(post => {
                if (filter === 'all' || post.dataset.year === filter) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.post-item {
    animation: fadeIn 0.5s ease forwards;
}
`;
document.head.appendChild(style); 