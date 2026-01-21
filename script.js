// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sellForm = document.getElementById('sellForm');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const conditionFilter = document.getElementById('conditionFilter');
const priceFilter = document.getElementById('priceFilter');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const productModal = document.getElementById('productModal');
const modalClose = document.querySelector('.close');
const modalBody = document.getElementById('modalBody');
const imageInput = document.getElementById('images');
const imagePreview = document.getElementById('imagePreview');

// State
let products = [];
let currentFilter = {
    search: '',
    category: '',
    condition: '',
    price: ''
};
let currentPage = 1;
const productsPerPage = 6;
let isLoading = false;

// Sample data for demonstration with real images
const sampleProducts = [
    {
        id: 1,
        title: 'iPhone 12 Pro - Screen Cracked But Functional',
        category: 'phones',
        condition: 'not-working',
        price: 299,
        description: 'iPhone 12 Pro with cracked screen but everything else works perfectly. Great camera, battery life still good. Perfect for repair or parts.',
        sellerName: 'Alex Thompson',
        sellerEmail: 'alex.t@example.com',
        sellerPhone: '555-0101',
        images: [
            'https://images.unsplash.com/photo-1603092434339-9a5b1d4c4b3a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
        ],
        date: '2024-01-20'
    },
    {
        id: 2,
        title: 'MacBook Air 2020 - Perfect Condition',
        category: 'laptops',
        condition: 'working',
        price: 699,
        description: 'MacBook Air 2020 with M1 chip, 8GB RAM, 256GB SSD. Excellent condition, barely used. Includes original charger and box.',
        sellerName: 'Sarah Chen',
        sellerEmail: 'sarah.chen@example.com',
        sellerPhone: '555-0102',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
        ],
        date: '2024-01-19'
    },
    {
        id: 3,
        title: 'AirPods Pro - Left Earbud Not Working',
        category: 'earbuds',
        condition: 'not-working',
        price: 89,
        description: 'AirPods Pro where the right earbud works perfectly but left earbud needs repair. Charging case and both earbuds included.',
        sellerName: 'Mike Rodriguez',
        sellerEmail: 'mike.r@example.com',
        sellerPhone: '555-0103',
        images: [
            'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=300&fit=crop'
        ],
        date: '2024-01-18'
    },
    {
        id: 4,
        title: 'Samsung Galaxy S21 - Like New',
        category: 'phones',
        condition: 'working',
        price: 449,
        description: 'Samsung Galaxy S21 in excellent condition. No scratches, battery health at 95%. Comes with original box, charger, and case.',
        sellerName: 'Emily Watson',
        sellerEmail: 'emily.w@example.com',
        sellerPhone: '555-0104',
        images: [
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e597?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=300&fit=crop'
        ],
        date: '2024-01-17'
    },
    {
        id: 5,
        title: 'Dell XPS 13 - For Parts Only',
        category: 'laptops',
        condition: 'for-parts',
        price: 125,
        description: 'Dell XPS 13 with broken screen but excellent motherboard, RAM, and SSD. Great for parts or repair project.',
        sellerName: 'David Kim',
        sellerEmail: 'david.kim@example.com',
        sellerPhone: '555-0105',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
        ],
        date: '2024-01-16'
    },
    {
        id: 6,
        title: 'Sony WH-1000XM4 - Battery Dead',
        category: 'earphones',
        condition: 'not-working',
        price: 149,
        description: 'Sony WH-1000XM4 headphones with dead battery but perfect sound quality when used with cable. All accessories included.',
        sellerName: 'Lisa Anderson',
        sellerEmail: 'lisa.a@example.com',
        sellerPhone: '555-0106',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
        ],
        date: '2024-01-15'
    },
    {
        id: 7,
        title: 'iPad Air 4 - Small Crack on Corner',
        category: 'phones',
        condition: 'working',
        price: 379,
        description: 'iPad Air 4 with small crack on corner but screen fully functional. 64GB, Wi-Fi only. Includes Apple Pencil and case.',
        sellerName: 'James Miller',
        sellerEmail: 'james.m@example.com',
        sellerPhone: '555-0107',
        images: [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1616348416267-5c5571e4c223?w=400&h=300&fit=crop'
        ],
        date: '2024-01-14'
    },
    {
        id: 8,
        title: 'JBL Flip 5 - No Sound',
        category: 'accessories',
        condition: 'for-parts',
        price: 25,
        description: 'JBL Flip 5 Bluetooth speaker that powers on but produces no sound. Good for parts or repair.',
        sellerName: 'Tom Wilson',
        sellerEmail: 'tom.w@example.com',
        sellerPhone: '555-0108',
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
        ],
        date: '2024-01-13'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Load products from API
    await loadProducts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial products
    renderProducts();
}

// API Functions
async function loadProducts() {
    try {
        isLoading = true;
        showLoading();
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: productsPerPage,
            ...currentFilter
        });
        
        // Remove empty parameters
        for (const [key, value] of [...params.entries()]) {
            if (!value) params.delete(key);
        }
        
        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        
        if (response.ok) {
            if (currentPage === 1) {
                products = data.products;
            } else {
                products = [...products, ...data.products];
            }
            
            // Update load more button visibility
            if (data.page >= data.pages) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        } else {
            console.error('Failed to load products:', data.error);
            showNotification('Failed to load products', 'error');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Error loading products', 'error');
        // Load sample data as fallback
        products = [...sampleProducts];
    } finally {
        isLoading = false;
        hideLoading();
    }
}

async function submitProduct(productData) {
    try {
        const formData = new FormData();
        
        // Add all product fields
        Object.keys(productData).forEach(key => {
            if (key !== 'images') {
                formData.append(key, productData[key]);
            }
        });
        
        // Add images if any
        const imageInput = document.getElementById('images');
        if (imageInput.files.length > 0) {
            Array.from(imageInput.files).forEach(file => {
                formData.append('images', file);
            });
        }
        
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Product listed successfully!', 'success');
            // Reset form and reload products
            sellForm.reset();
            imagePreview.innerHTML = `
                <div class="upload-placeholder">
                    <i class="fas fa-camera"></i>
                    <p>Click to upload images</p>
                </div>
            `;
            
            // Reload products from server
            currentPage = 1;
            await loadProducts();
            renderProducts();
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        } else {
            showNotification(data.error || 'Failed to list product', 'error');
        }
    } catch (error) {
        console.error('Error submitting product:', error);
        showNotification('Error submitting product', 'error');
    }
}

function showLoading() {
    productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: #007bff; margin-bottom: 1rem;"></i>
            <p style="color: #666;">Loading products...</p>
        </div>
    `;
}

function hideLoading() {
    // Loading will be replaced by renderProducts()
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Form submission
    sellForm.addEventListener('submit', handleSellFormSubmit);
    
    // Search and filter
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    categoryFilter.addEventListener('change', handleFilter);
    conditionFilter.addEventListener('change', handleFilter);
    priceFilter.addEventListener('change', handleFilter);
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });
    
    // Image upload preview
    imageInput.addEventListener('change', handleImageUpload);
    
    // Button actions
    document.getElementById('startSelling').addEventListener('click', () => {
        document.getElementById('sell').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('browseProducts').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('sellBtn').addEventListener('click', () => {
        document.getElementById('sell').scrollIntoView({ behavior: 'smooth' });
    });
}

// Mobile Menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Smooth Scrolling
function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId && targetId !== '#') {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}

// Form Handling
async function handleSellFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(sellForm);
    const productData = {
        title: formData.get('title'),
        category: formData.get('category'),
        condition: formData.get('condition'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        sellerName: formData.get('sellerName'),
        sellerEmail: formData.get('sellerEmail'),
        sellerPhone: formData.get('sellerPhone')
    };
    
    await submitProduct(productData);
}

// Image Upload Preview
function handleImageUpload(e) {
    const files = e.target.files;
    imagePreview.innerHTML = '';
    
    if (files.length === 0) {
        imagePreview.innerHTML = `
            <div class="upload-placeholder">
                <i class="fas fa-camera"></i>
                <p>Click to upload images</p>
            </div>
        `;
        return;
    }
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = 'width: 100px; height: 100px; object-fit: cover; margin: 5px; border-radius: 5px;';
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Search and Filter
async function handleSearch() {
    currentFilter.search = searchInput.value.toLowerCase();
    currentPage = 1;
    await loadProducts();
    renderProducts();
}

async function handleFilter() {
    currentFilter.category = categoryFilter.value;
    currentFilter.condition = conditionFilter.value;
    currentFilter.price = priceFilter.value;
    currentPage = 1;
    await loadProducts();
    renderProducts();
}

// Product Rendering
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666;">No products found</h3>
                <p style="color: #999;">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

async function loadMoreProducts() {
    if (isLoading) return;
    
    currentPage++;
    await loadProducts();
    renderProducts();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductDetails(product);
    
    const conditionClass = `condition-${product.condition}`;
    const conditionText = product.condition.replace('-', ' ');
    
    // Get appropriate icon for category
    const categoryIcons = {
        phones: 'fa-mobile-alt',
        laptops: 'fa-laptop',
        earbuds: 'fa-headphones',
        earphones: 'fa-headphones',
        accessories: 'fa-tools'
    };
    
    const icon = categoryIcons[product.category] || 'fa-box';
    
    // Check if product has images
    let imageContent = `<i class="fas ${icon}"></i>`;
    if (product.images && product.images.length > 0) {
        imageContent = `<img src="${product.images[0]}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    
    card.innerHTML = `
        <div class="product-image">
            ${imageContent}
            <span class="condition-badge ${conditionClass}">${conditionText}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <p class="product-description">${product.description.substring(0, 100)}...</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-seller">
                <span class="seller-info">${product.sellerName}</span>
                <button class="contact-btn" onclick="event.stopPropagation(); contactSeller('${product.sellerEmail}')">
                    <i class="fas fa-envelope"></i> Contact
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Product Details Modal
function showProductDetails(product) {
    const conditionText = product.condition.replace('-', ' ');
    
    modalBody.innerHTML = `
        <div class="product-details">
            <h2>${product.title}</h2>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <span class="condition-badge condition-${product.condition}">${conditionText}</span>
                <span style="background: #f8f9fa; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.9rem;">
                    ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
            </div>
            
            <div style="font-size: 2rem; color: #007bff; font-weight: bold; margin-bottom: 1rem;">
                $${product.price.toFixed(2)}
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 0.5rem;">Description</h3>
                <p style="color: #666; line-height: 1.6;">${product.description}</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 0.5rem;">Seller Information</h3>
                <p><strong>Name:</strong> ${product.sellerName}</p>
                <p><strong>Email:</strong> ${product.sellerEmail}</p>
                ${product.sellerPhone ? `<p><strong>Phone:</strong> ${product.sellerPhone}</p>` : ''}
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" onclick="contactSeller('${product.sellerEmail}')">
                    <i class="fas fa-envelope"></i> Contact Seller
                </button>
                <button class="btn btn-outline" onclick="closeModal()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    productModal.style.display = 'block';
}

function closeModal() {
    productModal.style.display = 'none';
}

// Contact Seller
function contactSeller(email) {
    window.location.href = `mailto:${email}?subject=Interested in your product on TechMarket`;
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
