import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from "./assets/logo.png";
import s1 from "./assets/s1.jpg";
import s2 from "./assets/s2.jpg";
import s3 from "./assets/s3.jpg";
import s4 from "./assets/s4.jpg";
import b1 from "./assets/b1.png";
import b2 from "./assets/b2.png";
import b3 from "./assets/b3.png";
import b4 from "./assets/b4.png";
import b5 from "./assets/b5.png";
import b6 from "./assets/b6.png";
import ex2 from "./assets/ex2.jpg";
import ex3 from "./assets/ex3.jpg";
import m1 from "./assets/m1.jpg";
import m2 from "./assets/m2.jpg";
import m3 from "./assets/m3.jpg";
import m4 from "./assets/m4.jpg";
import m5 from "./assets/m5.jpg";
import m6 from "./assets/m6.jpg";
import m7 from "./assets/m7.jpg";
import m8 from "./assets/m8.jpg";
import Swal from 'sweetalert2';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,       // animation speed
      easing: "ease-in-out",
      once: true,          // animation sirf aik dafa chale
      offset: 100,         // kitna scroll par start ho
    });
  }, []);
  AOS.init({
  disable: "mobile", // agar mobile par animation nahi chahiye
});


  // States for search and cart functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // All products data
  const productsData = [
    // Services
    { id: 1, name: "FACE MASSAGE", category: "services", price: 50, description: "Professional face massage service", image: s2 },
    { id: 2, name: "HEAD MASSAGE", category: "services", price: 60, description: "Relaxing head massage service", image: s1 },
    { id: 3, name: "BACK MASSAGE", category: "services", price: 80, description: "Therapeutic back massage service", image: s3 },
    { id: 4, name: "FULL BODY MASSAGE", category: "services", price: 100, description: "Complete body massage service", image: s4 },
    
    // Makeup Services
    { id: 5, name: "BRIDAL MAKEUP", category: "makeup", price: 200, description: "Professional bridal makeup for special day", image: b1 },
    { id: 6, name: "PARTY MAKEUP", category: "makeup", price: 150, description: "Glamorous party makeup", image: b2 },
    { id: 7, name: "PHOTOSHOOT MAKEUP", category: "makeup", price: 180, description: "Professional makeup for photoshoots", image: b3 },
    { id: 8, name: "EVENING MAKEUP", category: "makeup", price: 120, description: "Elegant evening makeup", image: b4 },
    { id: 9, name: "DAY MAKEUP", category: "makeup", price: 100, description: "Natural day makeup", image: b5 },
    { id: 10, name: "SPECIAL EFFECTS MAKEUP", category: "makeup", price: 250, description: "Special effects and creative makeup", image: b6 },
    
    // Cosmetic Products
    { id: 11, name: "FOUNDATION", category: "products", price: 24.99, description: "High-quality foundation for flawless skin", image: m1 },
    { id: 12, name: "HIGHLIGHTER", category: "products", price: 19.99, description: "Shimmering highlighter for glowing skin", image: m2 },
    { id: 13, name: "NAIL POLISH", category: "products", price: 9.99, description: "Long-lasting nail polish in various shades", image: m3 },
    { id: 14, name: "FRAGRANCE", category: "products", price: 49.99, description: "Luxury fragrance for lasting impression", image: m4 },
    { id: 15, name: "POWDER", category: "products", price: 22.99, description: "Setting powder for perfect finish", image: m5 },
    { id: 16, name: "LIPSTICK", category: "products", price: 16.99, description: "Matte lipstick in trending shades", image: m6 },
    { id: 17, name: "LIP GLOSS", category: "products", price: 12.99, description: "Glossy lip gloss with hydration", image: m7 },
    { id: 18, name: "CONCEALER", category: "products", price: 18.99, description: "Full coverage concealer", image: m8 },
    
    // Experts
    { id: 19, name: "MAKEUP ARTIST", category: "experts", price: 300, description: "Professional makeup artist for special events", image: ex2 },
    { id: 20, name: "HAIR STYLIST", category: "experts", price: 250, description: "Expert hair stylist for any occasion", image: ex3 },
    
    // Membership Plans
    { id: 21, name: "STARTER MEMBERSHIP", category: "membership", price: 0, description: "Free starter membership plan", image: null },
    { id: 22, name: "PROFESSIONAL MEMBERSHIP", category: "membership", price: 38, description: "Professional membership plan", image: null },
    { id: 23, name: "ENTERPRISE MEMBERSHIP", category: "membership", price: 72, description: "Enterprise membership plan", image: null }
  ];

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(productsData);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show success notification
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      confirmButtonColor: '#ec4899',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    Swal.fire({
      title: 'Removed!',
      text: 'Item has been removed from cart.',
      icon: 'warning',
      confirmButtonColor: '#ec4899',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Download bill
  const downloadBill = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: 'Cart is Empty!',
        text: 'Add items to cart before downloading bill.',
        icon: 'error',
        confirmButtonColor: '#ec4899'
      });
      return;
    }

    const billContent = `
Glamour Beauty Store - Invoice
================================
${cart.map(item => `
${item.name}
Price: $${item.price.toFixed(2)}
Quantity: ${item.quantity}
Subtotal: $${(item.price * item.quantity).toFixed(2)}
`).join('\n')}
================================
Total: $${calculateTotal().toFixed(2)}
================================
Thank you for shopping with us!
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beauty-store-bill-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
      title: 'Bill Downloaded!',
      text: 'Your invoice has been downloaded successfully.',
      icon: 'success',
      confirmButtonColor: '#ec4899'
    });
  };

  // Clear cart
  const clearCart = () => {
    Swal.fire({
      title: 'Clear Cart?',
      text: 'This will remove all items from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire({
          title: 'Cleared!',
          text: 'Your cart has been cleared.',
          icon: 'success',
          confirmButtonColor: '#ec4899',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <>
      {/* Search and Cart Sidebar */}
      <div className='nav-toggle'>
        <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
              <div className="flex space-x-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 px-3 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-2xl text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some beautiful products!</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-pink-600 font-bold">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2 transition"
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between text-lg font-bold mb-2">
                    <span>Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-6">
                    <span>Shipping:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={downloadBill}
                      className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
                    >
                      Download Bill
                    </button>
                    
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Checkout',
                          text: 'Proceed to secure checkout?',
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonColor: '#ec4899',
                          cancelButtonColor: '#6b7280',
                          confirmButtonText: 'Yes, proceed!'
                        });
                      }}
                      className="w-full bg-white border-2 border-pink-600 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition font-medium"
                    >
                      Proceed to Checkout (${calculateTotal().toFixed(2)})
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Overlay for cart */}
        {cartOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setCartOpen(false)}
          />
        )}

        {/* Navbar */}
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 font-bold">
          <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8 md:h-10" alt="Beauty Store Logo" />
            </a>
            
            {/* Desktop Search and Cart */}
            <div className="flex items-center md:order-2 space-x-2">
              {/* Mobile Search Toggle */}
              <button 
                type="button" 
                id="mobile-search-toggle"
                className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => {
                  const mobileSearch = document.getElementById('mobile-search');
                  mobileSearch.classList.toggle('hidden');
                }}
              >
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
              
              {/* Desktop Search Input */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="desktop-search"
                  className="block w-64  ps-9 pe-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative bg-white text-pink-600 p-2 rounded-full hover:bg-pink-50 transition border border-pink-100"
              >
                <span className="text-xl">🛒</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                id="navbar-toggle"
                type="button" 
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                onClick={() => {
                  const navbarMenu = document.getElementById('navbar-menu');
                  navbarMenu.classList.toggle('hidden');
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
            
            {/* Mobile Search Input - Hidden by default */}
            <div id="mobile-search" className="hidden w-full md:hidden mt-3 order-3">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="mobile-search-input"
                  className="block w-full ps-9 pe-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Search Results Dropdown */}
            {searchTerm && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg p-4 z-30 mx-4 md:mx-auto md:max-w-2xl border border-gray-100">
                {filteredProducts.length > 0 ? (
                  <>
                    <p className="text-gray-600 mb-2 text-sm">
                      Results for: <span className="font-semibold text-pink-600">"{searchTerm}"</span>
                      <span className="ml-2 text-gray-500">
                        ({filteredProducts.length} found)
                      </span>
                    </p>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredProducts.slice(0, 5).map(product => (
                        <div key={product.id} className="flex items-center p-2 hover:bg-gray-50 rounded border-b border-gray-100 last:border-0">
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate text-sm">{product.name}</p>
                            <p className="text-xs text-gray-600 truncate">${product.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="text-xs bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 whitespace-nowrap ml-2"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 text-sm">No results found.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilteredProducts(productsData);
                      }}
                      className="mt-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1" id="navbar-menu">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                <li><a href="#hero" className="block py-2 px-3 text-pink-600 font-bold md:p-0" aria-current="page">Home</a></li>
                <li><a href="#services" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 md:p-0">Services</a></li>
                <li><a href="#makeup" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 md:p-0">Makeup</a></li>
                <li><a href="#products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 md:p-0">Products</a></li>
                <li><a href="#membership" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 md:p-0">Membership</a></li>
                <li><a href="#testinomial" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 md:p-0">Testimonials</a></li>
                <li><a href="#contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 md:p-0">Contact</a></li>
              </ul>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown (Controlled by JS) */}
          <div id="mobile-menu" className="hidden w-full md:hidden border-t border-gray-100">
             <ul className="flex flex-col p-4 font-medium bg-gray-50">
               <li><a href="#hero" onClick={() => document.getElementById('navbar-menu').classList.add('hidden')} className="block py-2 px-3 text-white bg-pink-500 rounded">Home</a></li>
               <li><a href="#services" onClick={() => document.getElementById('navbar-menu').classList.add('hidden')} className="block py-2 px-3 text-gray-900 border-b border-gray-200">Services</a></li>
               <li><a href="#makeup" onClick={() => document.getElementById('navbar-menu').classList.add('hidden')} className="block py-2 px-3 text-gray-900 border-b border-gray-200">Makeup</a></li>
               <li><a href="#products" onClick={() => document.getElementById('navbar-menu').classList.add('hidden')} className="block py-2 px-3 text-gray-900 border-b border-gray-200">Products</a></li>
               <li><a href="#membership" onClick={() => document.getElementById('navbar-menu').classList.add('hidden')} className="block py-2 px-3 text-gray-900 border-b border-gray-200">Membership</a></li>
               <li><a href="#contact" onClick={() => document.getElementById('navbar-menu').classList.add('hidden')} className="block py-2 px-3 text-gray-900">Contact</a></li>
             </ul>
          </div>
        </nav>
      </div>

      
      {/* Hero Section */}
      <section  data-aos="fade-up" className="bg-gray-900 body-font hero relative" id="hero">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center h-full justify-center md:justify-start">
          <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center bg-white/80 md:bg-transparent p-6 rounded-xl md:p-0 mt-20 ml-10">
            <h1 className="title-font sm:text-5xl lg:text-7xl mb-4 font-medium text-black md:text-black">
              BEST PLACE <span className='text-pink-600'>FOR YOU</span>
              <br className="hidden lg:inline-block font-bold"/>
              <span className='text-pink-600 '>HERBAL</span> <span className=''>TREATMENT</span>
            </h1>
            <p className="mb-8 leading-relaxed text-black font-medium">
              Discover the ultimate relaxation and beauty treatments designed just for you. 
              <br className="hidden md:inline" /> Experience luxury and care like never before.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 w-full">
              <button 
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} 
                className="inline-flex text-white bg-pink-500 border-0 py-3 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg font-bold justify-center"
              >
                See All Services
              </button>
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })} 
                className="inline-flex text-white font-bold bg-gray-800 border-0 py-3 px-8 focus:outline-none hover:bg-gray-700 rounded text-lg justify-center"
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section data-aos="fade-right"  className="text-black bg-white body-font" id="services">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-5xl lg:text-6xl font-bold title-font mb-4 text-black">OUR <span className="text-pink-600 border-b-4 border-pink-500">SPA</span> SERVICES</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-5 text-gray-600">
              Relax, rejuvenate, and refresh your body and mind with our premium spa services.
            </p>
          </div>
          <div className="flex flex-wrap -m-4 justify-center">
            {/* Service 1 */}
            <div className="p-4 lg:w-1/4 md:w-1/2 w-full">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="Face Massage" className="shrink-0 w-full h-64 object-cover object-center mb-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 border-b-12 border-pink-500 border-r-8 hover:border hover:border-t-12 hover:border-l-8" src={s2} />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">FACE MASSAGE</h2>
                  <h3 className="text-pink-600 mb-3 font-semibold">ONLY $50</h3>
                  <button onClick={() => addToCart(productsData[0])} className="bg-pink-500 text-white font-bold px-6 py-2 rounded-full hover:bg-pink-600 transition-colors w-full sm:w-auto">Book Now</button>
                </div>
              </div>
            </div>
            {/* Service 2 */}
            <div className="p-4 lg:w-1/4 md:w-1/2 w-full">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="Head Massage" className="shrink-0 w-full h-64 object-cover object-center mb-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 border-t-12 border-pink-500 border-l-8 hover:border hover:border-b-12 hover:border-r-8" src={s1} />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">HEAD MASSAGE</h2>
                  <h3 className="text-pink-600 mb-3 font-semibold">ONLY $60</h3>
                  <button onClick={() => addToCart(productsData[1])} className="bg-pink-500 text-white font-bold px-6 py-2 rounded-full hover:bg-pink-600 transition-colors w-full sm:w-auto">Book Now</button>
                </div>
              </div>
            </div>
            {/* Service 3 */}
            <div className="p-4 lg:w-1/4 md:w-1/2 w-full">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="Back Massage" className="shrink-0 w-full h-64 object-cover object-center mb-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 border-b-12 border-pink-500 border-r-8 hover:border hover:border-t-12 hover:border-l-8" src={s3} />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">BACK MASSAGE</h2>
                  <h3 className="text-pink-600 mb-3 font-semibold">ONLY $80</h3>
                  <button onClick={() => addToCart(productsData[2])} className="bg-pink-500 text-white font-bold px-6 py-2 rounded-full hover:bg-pink-600 transition-colors w-full sm:w-auto">Book Now</button>
                </div>
              </div>
            </div>
            {/* Service 4 */}
            <div className="p-4 lg:w-1/4 md:w-1/2 w-full">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="Full Body Massage" className="shrink-0 w-full h-64 object-cover object-center mb-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 border-t-12 border-pink-500 border-l-8 hover:border hover:border-b-12 hover:border-r-8" src={s4}/>
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">FULL BODY MASSAGE</h2>
                  <h3 className="text-pink-600 mb-3 font-semibold">ONLY $100</h3>
                  <button onClick={() => addToCart(productsData[3])} className="bg-pink-500 text-white font-bold px-6 py-2 rounded-full hover:bg-pink-600 transition-colors w-full sm:w-auto">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Makeup Section */}
      <section data-aos="fade-up" className="text-black body-font bag bg-pink-200" id="makeup">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col lg:flex-row w-full mb-20 items-center">
            <div className="lg:w-1/3 w-full mb-6 lg:mb-0 text-center lg:text-left ">
              <h1 className="sm:text-4xl lg:text-5xl font-bold title-font text-black mb-2">OUR <span className="text-pink-600">MAKEUP</span> SERVICES</h1>
              <div className="h-1 w-20 bg-pink-500 rounded mx-auto lg:mx-0"></div>
            </div>
            <p className="lg:w-2/3 w-full leading-relaxed text-base text-center lg:text-left mr-5">
              From natural glow to glamorous bridal looks, our expert makeup artists bring out your best features.
              <br />
              <button onClick={() => addToCart(productsData[4])} className="mt-4 bg-pink-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-pink-700 transition shadow-lg">
                BOOK FOR YOUR SPECIAL DAY
              </button>
            </p>
          </div>
          
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-full md:w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block rounded-lg shadow-md hover:opacity-90 transition border-3 border-pink-600 " src={b1} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block rounded-lg shadow-md hover:opacity-90 transition border-3 border-pink-600" src={b2} />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img alt="gallery" className="w-full h-64 md:h-full object-cover object-center block rounded-lg shadow-md hover:opacity-90 transition border-3 border-pink-600" src={b3} />
              </div>
            </div>
            <div className="flex flex-wrap w-full md:w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img alt="gallery" className="w-full h-64 md:h-full object-cover object-center block rounded-lg shadow-md hover:opacity-90 transition border-3 border-pink-600" src={b5} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block rounded-lg shadow-md hover:opacity-90 transition border-3 border-pink-600" src={b4} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block rounded-lg shadow-md hover:opacity-90 transition border-3 border-pink-600" src={b6} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section data-aos="fade-right" className="text-black bg-pink-200 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold title-font mb-12 text-black text-center">MEET OUR <span className="text-pink-600 border-b-4 border-pink-500">EXPERTS</span></h1>
          <div className="flex flex-wrap -mx-4 justify-center">
            {/* Expert 1 */}
            <div className="w-full md:w-1/2 lg:w-1/3 mb-10 px-4 text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-pink-500 borber-r-12 border-t-8 hover:border hover:border-b-12 hover:border-l-10 shadow-xl mb-6 ">
                <img alt="Makeup Artist" className="object-cover object-center h-full w-full" src={ex2} />
              </div>
              <h2 className="title-font text-2xl font-bold text-pink-600 mb-2">Best Makeup Artist</h2>
              <p className="leading-relaxed text-gray-600 font-medium mb-4">Available with 50% off.<br/>Book now for a transformation.</p>
              <button onClick={() => addToCart(productsData[18])} className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Select</button>
            </div>
            {/* Expert 2 */}
            <div className="w-full md:w-1/2 lg:w-1/3 mb-10 px-4 text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-pink-500 borber-r-12 border-t-8 hover:border hover:border-b-12 hover:border-l-10 shadow-xl mb-6 ">
                <img alt="Hair Stylist" className="object-cover object-center h-full w-full" src={ex3} />
              </div>
              <h2 className="title-font text-2xl font-bold text-pink-600 mb-2">Best Hair Stylist</h2>
              <p className="leading-relaxed text-gray-600 font-medium mb-4">Available with 50% off.<br/>Expert styling for any occasion.</p>
              <button onClick={() => addToCart(productsData[19])} className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Select</button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section data-aos="fade-left" className="text-black bg-gray-50 body-font" id="products">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-5xl text-4xl font-bold title-font mb-4 text-black">OUR <span className="text-pink-600 border-b-4 border-pink-500">COSMETICS</span> BRAND</h1> <br />
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600">Premium quality cosmetics for your daily beauty routine.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Product Items */}
            {[
              { img: m1, title: "Foundations", desc: "Flawless coverage for all skin tones.", id: 10 },
              { img: m2, title: "Highlighters", desc: "Get that perfect glow instantly.", id: 11 },
              { img: m3, title: "Nail Paints", desc: "Vibrant colors that last longer.", id: 12 },
              { img: m4, title: "Fragrances", desc: "Scents that leave a lasting impression.", id: 13 }
            ].map((item, index) => (
              <div key={index} className="p-4 lg:w-1/2 w-full">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                  <img alt={item.title} className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-4 border-pink-700 " src={item.img} />
                  <div className="grow sm:pl-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="mb-4 text-gray-600">{item.desc}</p>
                    <button onClick={() => addToCart(productsData[item.id])} className="bg-pink-500 text-white font-bold px-4 py-2 rounded hover:bg-pink-600 transition">Add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products 2 Section */}
      <section data-aos="fade-right" className="text-black bg-white body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-5xl text-3xl font-bold title-font mb-4 text-black">BEST SELLING <span className='text-pink-600 border-b-4 border-pink-500'>PRODUCTS</span></h1>
          </div>
          <div className="flex flex-wrap -m-4">
             {[
              { img: m5, title: "Powders", desc: "Set your makeup perfectly.", id: 14 },
              { img: m6, title: "Lipsticks", desc: "Rich color and moisture.", id: 15 },
              { img: m7, title: "Lip Gloss", desc: "Shine bright like a diamond.", id: 16 },
              { img: m8, title: "Concealers", desc: "Hide imperfections effortlessly.", id: 17 }
            ].map((item, index) => (
              <div key={index} className="p-4 lg:w-1/2 w-full">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <img alt={item.title} className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-4 border-pink-600" src={item.img} />
                  <div className="grow sm:pl-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="mb-4 text-gray-600">{item.desc}</p>
                    <button onClick={() => addToCart(productsData[item.id])} className="bg-pink-500 text-white font-bold px-4 py-2 rounded hover:bg-pink-600 transition">Add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section data-aos="fade-up" className="text-gray-900 body-font overflow-hidden relative bg-pink-200" id="membership">
        <div className="container px-5 py-24 mx-auto relative z-10">
          <div className="flex flex-col text-center w-full mb-20">
            <span className="text-pink-500 font-semibold tracking-widest text-sm mb-3">MEMBERSHIP PLANS</span>
            <h1 className="sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Choose Your 
              <span className="text-pink-600"> Perfect </span> Plan
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-600 text-lg">Flexible pricing designed to grow with you.</p>
          </div>
          
          <div className="flex flex-wrap -m-4 justify-center">
            {/* Free Plan */}
            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-pink-600 flex flex-col relative overflow-hidden hover:border-pink-300 transition-colors bg-white">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">STARTER</h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free</h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full shrink-0">✓</span>
                  Access to basic tutorials
                </p>
                <button onClick={() => addToCart(productsData[20])} className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Get Started</button>
              </div>
            </div>
            {/* Pro Plan */}
            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-pink-500 flex flex-col relative overflow-hidden bg-white shadow-lg transform md:-translate-y-2">
                <span className="bg-pink-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">PROFESSIONAL</h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-baseline pb-4 mb-4 border-b border-gray-200">
                  <span>$38</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
                </h1>
                 <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-pink-500 text-white rounded-full shrink-0">✓</span>
                  Priority booking
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-pink-500 text-white rounded-full shrink-0">✓</span>
                  10% off on products
                </p>
                <button onClick={() => addToCart(productsData[21])} className="flex items-center mt-auto text-white bg-pink-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-pink-600 rounded">Get Started</button>
              </div>
            </div>
            {/* Business Plan */}
            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
               <div className="h-full p-6 rounded-lg border-2 border-pink-600 flex flex-col relative overflow-hidden hover:border-pink-300 transition-colors bg-white">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">ENTERPRISE</h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-baseline pb-4 mb-4 border-b border-gray-200">
                  <span>$72</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full shrink-0">✓</span>
                  All Professional features
                </p>
                 <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full shrink-0">✓</span>
                  Exclusive VIP events
                </p>
                <button onClick={() => addToCart(productsData[22])} className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section data-aos="fade-right" className="text-gray-900 body-font bg-pink-50 font-bold" id="testinomial">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-16">
            <h1 className="sm:text-6xl  lg:text-6xl font-bold mb-4 text-black">What Our <span className="text-pink-600">Clients</span> Say</h1>
          </div>
          <div className="flex flex-wrap -m-4">
             {/* Testimonial 1 */}
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-white p-8 rounded-lg shadow-md  border-pink-600 border-2">
                <p className="leading-relaxed mb-6 text-gray-600">"The best spa experience I've ever had. The staff is professional and the atmosphere is incredibly relaxing. Highly recommended!"</p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://dummyimage.com/106x106" className="w-12 h-12 rounded-full shrink-0 object-cover object-center"/>
                  <span className="grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Sarah Johnson</span>
                    <span className="text-gray-500 text-sm">Regular Customer</span>
                  </span>
                </a>
              </div>
            </div>
             {/* Testimonial 2 */}
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-white p-8 rounded-lg shadow-md  border-pink-600 border-2">
                <p className="leading-relaxed mb-6 text-gray-600">"I love their makeup services for special occasions. They always make me look and feel my best. The products they use are top notch."</p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://dummyimage.com/107x107" className="w-12 h-12 rounded-full shrink-0 object-cover object-center"/>
                  <span className="grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Emily Davis</span>
                    <span className="text-gray-500 text-sm">Model</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section data-aos="fade-left" className="text-gray-900 body-font relative bg-pink-200" id="contact">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl lg:text-6xl font-bold title-font mb-4 text-gray-900">Contact Us</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">We'd love to hear from you. Drop us a message!</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                  <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-aos="fade-up" className="text-gray-600 body-font bg-pink-100 font-bold cursor-pointer ">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row flex-col flex-wrap">
          <div className="w-64 shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
               <img src={logo} className="h-10" alt="Logo" />
              {/* <span className="ml-3 text-xl font-bold">BeautyStore</span> */}
            </a>
            <p className="mt-2 text-sm text-gray-500">Your one-stop destination for all things beauty.</p>
          </div>
          <div className="grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li><a className="text-gray-600 hover:text-gray-800">Skincare</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">Makeup</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">Haircare</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">Fragrance</a></li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">SUPPORT</h2>
              <nav className="list-none mb-10">
                <li><a className="text-gray-600 hover:text-gray-800">Contact Us</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">FAQ</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">Returns</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">Shipping</a></li>
              </nav>
            </div>
             <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">LEGAL</h2>
              <nav className="list-none mb-10">
                <li><a className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
                <li><a className="text-gray-600 hover:text-gray-800">Terms of Service</a></li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2026 BeautyStore —
              <a href="#" className="text-pink-600 ml-1 font-bold text-xl" rel="noopener noreferrer" target="_blank">@iqraaslam</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;