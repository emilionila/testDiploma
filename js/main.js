//ФУНКЦІЯ КАРУСЕЛІ НОВИХ ТОВАРІВ
document.addEventListener('DOMContentLoaded', function () {
    const itemsSlider = document.querySelector('.items_slider');
    const itemSliders = document.querySelectorAll('.item_slider');
    const arrowRight = document.querySelector('.arrow_right_slider');
    const totalItems = itemSliders.length;
    const itemsToShow = 4;
    let currentIndex = 0;
    const itemWidth = itemSliders[0].offsetWidth + 40;

    // Розрахунок ширини для .items_slider
    const sliderWidth = (itemWidth * totalItems) + (20 * (totalItems - 1));
    itemsSlider.style.width = `${sliderWidth}px`;

    function updateSlider() {
        itemsSlider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Додаємо клас active до видимих елементів
        itemSliders.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + itemsToShow) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
  
    arrowRight.addEventListener('click', function () {
        if (currentIndex < totalItems - itemsToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
  
    updateSlider();
});


//ФУНКЦІЯ КАРУСЕЛІ ЧОМУ МИ
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.arrow-right_whyus');

    let currentIndex = 0;

    const updateSlidePosition = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
    };

    const moveToSlide = (index) => {
      currentIndex = index;
      updateSlidePosition();
    };

    nextButton.addEventListener('click', () => {
      if (currentIndex === slides.length - 1) {
        moveToSlide(0);
      } else {
        moveToSlide(currentIndex + 1);
      }
    });

    updateSlidePosition();
  });

  //ФУНКЦІЯ АКАРДЕОНУ
  document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion_item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const arrow = item.querySelector('.arrow_down');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            accordionItems.forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.display = 'none';
                content.style.opacity = 0;
                item.querySelector('.arrow_down').classList.remove('rotate');
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.display = 'block';
                setTimeout(() => {
                    content.style.opacity = 1;
                }, 10);
                arrow.classList.add('rotate');
            }
        });
    });
});


//ФУНКЦІЯ ЗАМІНИ ЗОБРАЖЕНЬ ІКОНОК ДЛЯ HOVER-ЕФЕКТІВ
const icons = document.querySelectorAll('.lang_loc_search_icons img');
const accountIcons = document.querySelectorAll('.selected_account_cart img');

function changeImage(event) {
  const currentImage = event.target;
  const altText = currentImage.alt;
  const newImageSrc = getNewImageSrc(altText);

  if (newImageSrc) {
    currentImage.src = newImageSrc;
  }
}
function restoreOriginalImage(event) {
  const currentImage = event.target;
  const altText = currentImage.alt;
  const originalImageSrc = getOriginalImageSrc(altText);

  if (originalImageSrc) {
    currentImage.src = originalImageSrc;
  }
}

function getNewImageSrc(altText) {
  switch (altText) {
    case 'ua':
      return './img/ua_hover.png';
    case 'location_icon':
      return './img/location_hover.png'; 
    case 'search_icon':
      return './img/search_hover.png';
    case 'acc_icon':
      return './img/acc_hover.png';
    case 'heart_icon':
      return './img/heart_hover.png'; 
    case 'cart_icon':
      return './img/cart_hover.png';
    default:
      return null;
  }
}

function getOriginalImageSrc(altText) {
  switch (altText) {
    case 'ua':
      return './img/ua.png';
    case 'location_icon':
      return './img/location_icon.png'; 
    case 'search_icon':
      return './img/search_icon.png';
    case 'acc_icon':
      return './img/acc_icon.png';
    case 'heart_icon':
      return './img/heart_icon.png'; 
    case 'cart_icon':
      return './img/cart_icon.png';
    default:
      return null;
  }
}

icons.forEach(icon => {
  icon.addEventListener('mouseover', changeImage);
  icon.addEventListener('mouseout', restoreOriginalImage);
});

accountIcons.forEach(icon => {
  icon.addEventListener('mouseover', changeImage);
  icon.addEventListener('mouseout', restoreOriginalImage);
});

function changeImage(event) {
  const currentImage = event.target;
  const altText = currentImage.alt;
  const newImageSrc = getNewImageSrc(altText);

  if (!isLikeGoodsPage() || altText !== 'heart_icon') {
    if (newImageSrc) {
      currentImage.src = newImageSrc;
    }
  }
}

function restoreOriginalImage(event) {
  const currentImage = event.target;
  const altText = currentImage.alt;
  const originalImageSrc = getOriginalImageSrc(altText);

  if (!isCartPage() || altText !== 'cart_icon') {
    if (originalImageSrc) {
      currentImage.src = originalImageSrc;
    }
  }
}

function restoreOriginalImage(event) {
  const currentImage = event.target;
  const altText = currentImage.alt;
  const originalImageSrc = getOriginalImageSrc(altText);

  if (!isCatalogPage() || altText !== 'search_icon') {
    if (originalImageSrc) {
      currentImage.src = originalImageSrc;
    }
  }
}

function isLikeGoodsPage() {
  return location.pathname.includes('like_goods.html');
}

function isCartPage() {
  return location.pathname.includes('cart.html');
}

function isCatalogPage() {
  return location.pathname.includes('all_goods.html');
}



//ФУНКЦІЯ ПОЯВИ ФОРМИ ЗВОРОТНЬОГО І СПОВІЩЕНЬ
document.addEventListener('DOMContentLoaded', function() {
    const consultationButton = document.querySelector('.buttons_rew .fill_button');
    const formReview = document.querySelector('.form_review');
    const closeButtons = document.querySelectorAll('.x-close');
    const submitButton = document.querySelector('.submit_button');
    const notification = document.querySelector('.notification');
    const closeNotificationButton = document.querySelector('.x-close_ntfcn');
    const overlay = document.createElement('div');

    document.body.appendChild(overlay);

    consultationButton.addEventListener('click', function() {
        formReview.style.display = 'block';
        overlay.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            formReview.style.display = 'none';
            notification.style.display = 'none';
            overlay.style.display = 'none';
        });
    });

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        formReview.style.display = 'none';
        notification.style.display = 'flex';
        overlay.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
            overlay.style.display = 'none';
        }, 3000);
    });

    closeNotificationButton.addEventListener('click', function() {
        notification.style.display = 'none';
        overlay.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const consultationButton = document.querySelector('.consultation_button');
    const formHelp = document.querySelector('.form_help');
    const xClose = document.querySelector('.x-close_helpForm');
    const body = document.querySelector('body');

    consultationButton.addEventListener('click', () => {
        formHelp.style.display = 'block';
    });

    xClose.addEventListener('click', () => {
        formHelp.style.display = 'none';
        body.style.overflow = '';
        body.style.backgroundColor = '';
    });
});

//ФУНКЦІЯ ВІДКРИВАННЯ СОЦІАЛЬНИХ МЕРЕЖ
const gmailIcon = document.querySelector('.gmail_icon_help');
const instIcon = document.querySelector('.inst_icon_help');
const tgIcon = document.querySelector('.tg_icon_help');

gmailIcon.addEventListener('click', () => {
  window.location.href = 'https://mail.google.com/';
});

instIcon.addEventListener('click', () => {
  window.location.href = 'https://www.instagram.com/';
});

tgIcon.addEventListener('click', () => {
  window.location.href = 'https://web.telegram.org/';
});

const closeButton = document.querySelector('.logo_footer');

closeButton.addEventListener('click', () => {
  window.location.href = 'home.html';
});


//ФУНКЦІЯ ДЛЯ ПОЛЯ ВВОДУ НОМЕРУ ТЕЛЕФОНУ
document.addEventListener('DOMContentLoaded', () => {
  // Функція для форматування вводу телефону
  const formatPhoneInput = (input) => {
    const rawInput = input.replace(/\D/g, '').substring(0, 12);
    const formattedInput = rawInput.replace(/(\d{3})(\d{2})(\d{3})(\d{2})/, '$1 $2 $3 $4');
    return formattedInput;
  };

  // Додаємо обробник події до всіх полів з плейсхолдером '380 ХХ ХХХ ХХ ХХ'
  document.querySelectorAll('input[placeholder="380 ХХ ХХХ ХХ ХХ"]').forEach(input => {
    input.addEventListener('input', (event) => {
      event.target.value = formatPhoneInput(event.target.value);
    });
  });

  // Обробник події для кнопки з класом 'logo_long'
  const logoButton = document.querySelector('.logo_long');
  if (logoButton) {
    logoButton.addEventListener('click', () => {
      window.location.href = 'home.html';
    });
  }
});

//ФУНКЦІЯ ПОЯВИ ФОРМИ І СПОВІЩЕННЯ ДЛЯ ВІДГУКА
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('.form_help .submit_button');
    const formHelp = document.querySelector('.form_help');
    const notificationHelp = document.querySelector('.notification_help');
    const xCloseForm = document.querySelector('.x-close_helpForm');
    const xCloseNotification = document.querySelector('.x-close_ntfcn_help');
    const body = document.querySelector('body');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Показуємо сповіщення та ховаємо форму
        notificationHelp.style.display = 'block';
        formHelp.style.display = 'none';

        // Автоматично закриваємо сповіщення через 3 секунди
        setTimeout(() => {
            notificationHelp.style.display = 'none';
            body.style.overflow = '';
            body.style.backgroundColor = '';
        }, 3000);
    });

    xCloseForm.addEventListener('click', () => {
        formHelp.style.display = 'none';
        body.style.overflow = '';
        body.style.backgroundColor = '';
    });

    xCloseNotification.addEventListener('click', () => {
        notificationHelp.style.display = 'none';
        body.style.overflow = '';
        body.style.backgroundColor = '';

        formHelp.style.display = 'none';
    });
});

//ФУНКЦІЯ ВИПАДАЮЧИХ СПИСКІВ ГАМБУРГЕР МЕНЮ
document.addEventListener('DOMContentLoaded', () => {
  const burgerIcon = document.querySelector('.burger_icon');
  const openMenu = document.querySelector('.open_menu_hamburger');
  const closeMenuBtn = document.querySelector('.btn_close_menu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  burgerIcon.addEventListener('click', () => {
    openMenu.classList.add('active');
  });

  closeMenuBtn.addEventListener('click', () => {
    openMenu.classList.remove('active');
  });

  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdownToggle.parentElement.classList.toggle('active');
  });
});


//ФУНКЦІЯ ДЛЯ ВІДКРИТТЯ ВІКОН АКАУНТА
document.addEventListener('DOMContentLoaded', () => {
  const openAccountBtn = document.querySelector('.acc_icon');
  const closeAccountBtn = document.querySelector('.acc_btn_close');
  const openAccountBtn_ham = document.querySelector('#openacc_menu_ham');
  const accountOverlay = document.querySelector('.account_open_login');

  openAccountBtn.addEventListener('click', () => {
    accountOverlay.classList.add('show-account');
  });

  closeAccountBtn.addEventListener('click', () => {
    accountOverlay.classList.remove('show-account');
  });

  if (openAccountBtn_ham) {
    openAccountBtn_ham.addEventListener('click', () => {
      closeAllForms();
      accountOverlay.classList.add('show-account');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Функція для форматування поля "Код"
  const formatCodeInput = (input) => {
    let value = input.value.replace(/\D/g, '').substring(0, 6); // Лише цифри, максимум 6 символів
    value = value.replace(/(\d{3})(\d{0,3})/, '$1 $2'); // Формат XXX XXX
    input.value = value.trim();
  };

  // Додаємо обробник подій для всіх полів з плейсхолдером "Код"
  document.querySelectorAll('input[placeholder="Код"]').forEach(input => {
    input.addEventListener('input', () => {
      formatCodeInput(input);
    });
  });
});

//ФУНКЦІЯ ПЕРЕХОМУ МІЖ ВІКНАМИ АКАУНТА
document.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.querySelector('.stroke_button_SIGNIN');
  const signUpBtn = document.querySelector('.stroke_button_LOGIN');
  const myAccountBtn = document.querySelector('.fill_button_myacc');
  const signInForm = document.querySelector('.account_open_signin');
  const loginForm = document.querySelector('.account_open_login');
  const myAccountForm = document.querySelector('.account_open_myacc');
  const logoutBtn = document.querySelector('.stroke_button_LOGOUT');

  // Функція для закриття всіх вікон
  function closeAllForms() {
    signInForm.classList.remove('show-account');
    loginForm.classList.remove('show-account');
    myAccountForm.classList.remove('show-account');
  }

  signInBtn.addEventListener('click', () => {
    closeAllForms();
    signInForm.classList.add('show-account');
  });

  signUpBtn.addEventListener('click', () => {
    closeAllForms();
    loginForm.classList.add('show-account');
  });

  myAccountBtn.addEventListener('click', () => {
    closeAllForms();
    myAccountForm.classList.add('show-account');
  });

  const fillButtonSignIn = document.querySelector('.fill_button_SIGNIN');
  const fillButtonLogin = document.querySelector('.fill_button_LOGIN');

  fillButtonSignIn.addEventListener('click', () => {
    closeAllForms();
    myAccountForm.classList.add('show-account');
  });

  fillButtonLogin.addEventListener('click', () => {
    closeAllForms();
    myAccountForm.classList.add('show-account');
  });

  logoutBtn.addEventListener('click', () => {
    closeAllForms();
    loginForm.classList.add('show-account');
  });

  // Додаємо обробник подій для закриття кожного з вікон
  const closeButtonSignin = signInForm.querySelector('.acc_btn_close_sign');
  const closeButtonLogin = loginForm.querySelector('.acc_btn_close');
  const closeButtonMyAcc = myAccountForm.querySelector('.acc_btn_close_myacc');

  closeButtonSignin.addEventListener('click', () => {
    signInForm.classList.remove('show-account');
  });

  closeButtonLogin.addEventListener('click', () => {
    loginForm.classList.remove('show-account');
  });

  closeButtonMyAcc.addEventListener('click', () => {
    myAccountForm.classList.remove('show-account');
  });
});

//ФУНКЦІЯ ДОДАВАННЯ ПОШТИ ДО АКАУНТА
document.addEventListener('DOMContentLoaded', () => {
  const addEmailButton = document.querySelector('.fill_button_myacc');
  const emailForm = document.querySelector('.acc_form_myacc');
  const lastPointData = document.querySelector('.point_data:last-child');

  // Функція для згортання форми та відображення останнього елемента .point_data
  function collapseFormAndShowLastPointData() {
    emailForm.classList.add('collapsing');
    setTimeout(() => {
      emailForm.style.display = "none";
      lastPointData.style.display = "flex";
    }, 400); // Затримка перед зникненням форми та з'явленням останнього елемента .point_data
  }

  addEmailButton.addEventListener('click', (event) => {
    event.preventDefault(); // Запобігає переходу по посиланню
    collapseFormAndShowLastPointData();
  });
});

//ФУНКЦІЯ ВІДКРИТТЯ ГАМБУРГЕР МЕНЮ
document.addEventListener('DOMContentLoaded', () => {
  const openAccMenuHam = document.getElementById('openacc_menu_ham');
  const openMenuHam = document.getElementById('open_menu_hamburger');
  const loginForm = document.querySelector('.account_open_login');

  openAccMenuHam.addEventListener('click', () => {
    loginForm.classList.add('show-account');
    openMenuHam.style.display = 'none';
  });
});

//ФУНКЦІЯ ХАВЕР-ЕФЕКТІВ ДЛЯ ІКОНОК СТОРІНКИ КОШИКУ ТА ОБРАНИХ ТОВАРІВ
document.addEventListener('DOMContentLoaded', () => {
  const heartIcon = document.querySelector('.heart_icon');
  const cartIcon = document.querySelector('.cart_icon');

  // Обробник кліку для heartIcon
  heartIcon.addEventListener('click', () => {
    window.location.href = 'like_goods.html';
  });

  // Обробник кліку для cartIcon
  cartIcon.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });

  // Перевірка URL і оновлення іконок
  const currentUrl = window.location.href;

  if (currentUrl.includes('like_goods.html')) {
    heartIcon.src = './img/heart_hover.png';
  }

  if (currentUrl.includes('cart.html')) {
    cartIcon.src = './img/cart_hover.png';
  }
});

//ФУНКЦІЯ ВІДКРИВАННЯ ПРИХОВАНИХ ВІДГУКІВ
document.addEventListener('DOMContentLoaded', function() {
  const expandButton = document.querySelector('.buttons_rew .stroke_button');
  const hiddenReviews = document.querySelectorAll('.review_item[hidden]');
  const allReviews = document.querySelectorAll('.review_item');

  expandButton.addEventListener('click', function() {
      if (expandButton.textContent === 'РОЗГОРНУТИ БІЛЬШЕ') {
          hiddenReviews.forEach(review => {
              review.removeAttribute('hidden');
              review.style.transition = 'max-height 0.5s ease-in-out';
              review.style.maxHeight = '1000px';
          });
          expandButton.textContent = 'ЗГОРНУТИ ВСЕ';
      } else {
          hiddenReviews.forEach(review => {
              review.setAttribute('hidden', '');
              review.style.transition = 'max-height 0.5s ease-in-out';
              review.style.maxHeight = '0';
          });
          expandButton.textContent = 'РОЗГОРНУТИ БІЛЬШЕ';
      }
  });
});

document.querySelectorAll('.dropdown-title').forEach(title => {
  title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      const isActive = title.classList.contains('active');

      // Закриття всіх випадаючих списків, окрім поточного
      document.querySelectorAll('.dropdown-content').forEach(item => {
          if (item !== content) {
              item.style.display = 'none';
          }
      });

      // Зняття класу "active" з усіх заголовків, окрім поточного
      document.querySelectorAll('.dropdown-title').forEach(item => {
          if (item !== title) {
              item.classList.remove('active');
          }
      });

      // Відкриття або закриття поточного списку
      if (!isActive) {
          content.style.display = 'flex';
          title.classList.add('active');
      } else {
          content.style.display = 'none'; // Закриття поточного списку
      }
  });
});

// Приховання контенту після вибору пункту з нього
document.querySelectorAll('.dropdown-content a').forEach(item => {
  item.addEventListener('click', (event) => {
      event.preventDefault(); // Заборона переходу за посиланням за замовчуванням
      const dropdownContent = item.parentElement;
      const dropdownTitle = dropdownContent.previousElementSibling;
      
      dropdownTitle.querySelector('.dropdown-header').textContent = item.textContent;
      dropdownContent.style.display = 'none';
      dropdownTitle.classList.remove('active');
  });
});

//ФУНКЦІЯ ВИПАДАЮЧИХ СПИСКІВ СТОРІНКИ ОБРАНОГО ТОВАРУ
document.addEventListener('DOMContentLoaded', () => {
  const dropdownTitles = document.querySelectorAll('.dropdown-title_material_gooditem, .dropdown-title_size_gooditem, .dropdown-title_packaging_gooditem');

  dropdownTitles.forEach(title => {
    title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      const isActive = title.classList.contains('active');

      // Close all dropdowns
      document.querySelectorAll('.dropdown-content_material_gooditem, .dropdown-content_size_gooditem, .dropdown-content_packaging_gooditem').forEach(item => {
        item.style.display = 'none';
      });

      document.querySelectorAll('.dropdown-title_material_gooditem, .dropdown-title_size_gooditem, .dropdown-title_packaging_gooditem').forEach(item => {
        item.classList.remove('active');
      });

      // Open the clicked dropdown if it was not already active
      if (!isActive) {
        content.style.display = 'flex';
        title.classList.add('active');
      }
    });

    // Update header text on selection
    title.nextElementSibling.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent link navigation
        const selectedText = item.textContent.toUpperCase();
        title.querySelector('h4').textContent = selectedText;

        // Close the dropdown after selection
        title.classList.remove('active');
        title.nextElementSibling.style.display = 'none';
      });
    });
  });

  // Close dropdowns when clicking outside
  window.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown_material_gooditem, .dropdown_size_gooditem, .dropdown_packaging_gooditem')) {
      document.querySelectorAll('.dropdown-content_material_gooditem, .dropdown-content_size_gooditem, .dropdown-content_packaging_gooditem').forEach(item => {
        item.style.display = 'none';
      });

      document.querySelectorAll('.dropdown-title_material_gooditem, .dropdown-title_size_gooditem, .dropdown-title_packaging_gooditem').forEach(item => {
        item.classList.remove('active');
      });
    }
  });
});

//ФУНКЦІЯ ОНОВЛЕННЯ КІЛЬКОСТІ ТОВАРІВ ЗАГОЛОВКА ТА ВИДАЛЕННЯ ТОВАРІВ В КОШИКУ
function updateTotal() {
  const prices = document.querySelectorAll('.price_cart h4');
  let total = 0;

  prices.forEach(price => {
      total += parseInt(price.textContent.replace(' ', '').replace('₴', ''), 10);
  });

  const totalElement = document.querySelector('.sum h3');
  totalElement.textContent = `${total} ₴`;

  const cartTitle = document.querySelector('.title_section');
  const itemCount = document.querySelectorAll('.card').length;
  cartTitle.textContent = `КОШИК(${itemCount})`;

  const cartCheck = document.querySelector('.cart_check');
  const btnBuy = document.querySelector('.fill_button_buy');

  console.log(`Item count: ${itemCount}`);
  console.log(`Cart check classList: ${cartCheck.classList}`);
  console.log(`btnBuy classList: ${btnBuy.classList}`);

  if (itemCount === 0) {
      cartCheck.classList.add('hide');
      btnBuy.classList.add('hide');
  } else {
      cartCheck.classList.remove('hide');
      btnBuy.classList.remove('hide');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateTotal();
  
  const deleteButtons = document.querySelectorAll('.stroke_button_deletefromcart');
  const deleteIcons = document.querySelectorAll('.delete_icon');
  
  deleteButtons.forEach(button => {
      button.addEventListener('click', deleteItem);
  });

  deleteIcons.forEach(icon => {
      icon.addEventListener('click', deleteItem);
  });
});

function deleteItem(event) {
  event.preventDefault();
  const card = event.target.closest('.card');
  if (card) {
      card.classList.add('delete-animation');
      setTimeout(() => {
          card.remove();
          updateTotal();
      }, 100);
  }
}

//СОРТУВАННЯ
document.addEventListener('DOMContentLoaded', () => {
  const dropdownTitle = document.getElementById('dropdownTitle_sort');
  const dropdownContent = document.getElementById('dropdownContent_sort');
  const selectedText = document.getElementById('selectedText_sort');

  dropdownTitle.addEventListener('click', () => {
      dropdownContent.classList.toggle('show');
      dropdownTitle.classList.toggle('open');
  });

  dropdownContent.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
          event.preventDefault();
          selectedText.textContent = event.target.getAttribute('data-value');
          dropdownContent.classList.remove('show');
          dropdownTitle.classList.remove('open');
      }
  });

  document.addEventListener('click', (event) => {
      if (!dropdownTitle.contains(event.target)) {
          dropdownContent.classList.remove('show');
          dropdownTitle.classList.remove('open');
      }
  });
});


//ФУНКЦІЯ ФІЛЬТРУ
document.addEventListener('DOMContentLoaded', () => {
  const filterPanel = document.querySelector('.open_filter');
  const titleFilter = document.querySelector('.filter');
  const closeFilterButton = document.querySelector('.btn_close_filter');
  const applyFiltersButton = document.querySelector('.fill_button_checkfilter');
  const clearFiltersButton = document.querySelector('#delete_filters');

  // Відкриття/закриття фільтра
  titleFilter.addEventListener('click', () => {
      filterPanel.classList.toggle('show');
  });

  // Закриття фільтра при кліку на кнопку закриття
  closeFilterButton.addEventListener('click', () => {
      filterPanel.classList.remove('show');
  });

  // Очищення всіх фільтрів
  clearFiltersButton.addEventListener('click', () => {
      // Скидання всіх чекбоксів
      document.querySelectorAll('.custom-checkbox input').forEach(checkbox => {
          checkbox.checked = false;
      });

      // Скидання всіх полів вводу
      document.querySelectorAll('.price_bottom').forEach(input => {
          input.value = '';
      });

      // Скидання тексту заголовків випадаючих списків
      document.querySelectorAll('.dropdown-title_colection h4, .dropdown-title_material h4, .dropdown-title_price h4').forEach(header => {
          header.textContent = header.getAttribute('data-default-text');
      });
  });

  // Застосування фільтрів
applyFiltersButton.addEventListener('click', () => {
  showToast('Фільтри застосовані');

  filterPanel.classList.remove('show');
});

  // Підтримка динамічного оновлення заголовків
  document.querySelectorAll('.dropdown-title_material, .dropdown-title_price, .dropdown-title_colection').forEach(title => {
      title.addEventListener('click', () => {
          const content = title.nextElementSibling;
          const isActive = title.classList.contains('active');

          document.querySelectorAll('.dropdown-content_material, .dropdown-content_price, .dropdown-content_colection').forEach(item => {
              item.classList.remove('show');
              item.style.maxHeight = '0';
          });

          document.querySelectorAll('.dropdown-title_material, .dropdown-title_price, .dropdown-title_colection').forEach(item => {
              item.classList.remove('active');
          });

          if (!isActive) {
              content.classList.add('show');
              content.style.maxHeight = content.scrollHeight + 'px';
              title.classList.add('active');
          }
      });

      // Додавання події для кожного посилання у випадаючих списках
      title.nextElementSibling.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', (event) => {
              event.preventDefault(); // Запобігання переходу по посиланню
              const selectedText = link.textContent;
              title.querySelector('h4').textContent = selectedText;

              // Закриття випадаючого списку після вибору
              title.nextElementSibling.classList.remove('show');
              title.nextElementSibling.style.maxHeight = '0';
              title.classList.remove('active');
          });
      });

      // Додавання подій для полів вводу у випадаючому списку ціни
      if (title.classList.contains('dropdown-title_price')) {
          const priceInputs = title.nextElementSibling.querySelectorAll('input');
          priceInputs.forEach(input => {
              input.addEventListener('input', () => {
                  const fromPrice = Math.min(priceInputs[0].value, 12000);
                  const toPrice = Math.min(priceInputs[1].value, 12000);

                  if (fromPrice && toPrice) {
                      title.querySelector('h4').textContent = `ВІД ${fromPrice} ₴ ДО ${toPrice} ₴`;
                  } else if (fromPrice) {
                      title.querySelector('h4').textContent = `ВІД ${fromPrice} ₴`;
                  } else if (toPrice) {
                      title.querySelector('h4').textContent = `ДО ${toPrice} ₴`;
                  } else {
                      title.querySelector('h4').textContent = 'ЦІНА';
                  }
                  
                  priceInputs[0].value = fromPrice;
                  priceInputs[1].value = toPrice;
              });

              // Додавання обмеження максимального значення
              input.addEventListener('keypress', (event) => {
                  const keyCode = event.which ? event.which : event.keyCode;
                  const keyChar = String.fromCharCode(keyCode);
                  const newValue = input.value + keyChar;

                  if (!/^\d*$/.test(keyChar) || newValue > 12000) {
                      event.preventDefault();
                  }
              });
          });
      }
  });

  // Збереження початкового тексту заголовків для відновлення при очищенні
  document.querySelectorAll('.dropdown-title_colection h4, .dropdown-title_material h4, .dropdown-title_price h4').forEach(header => {
      header.setAttribute('data-default-text', header.textContent);
  });
});

function showToast(message, duration = 2500) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
      toast.classList.add('show');
  }, 100);

  setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
          toast.remove();
      }, 500);
  }, duration);
}


// ФУНКЦІЯ ПЕРЕХОДУ НА СТОРІНКИ ОБРАНИХ ТОВАРІВ

document.addEventListener('DOMContentLoaded', function() {
  // Додавання обробника подій для кнопок .fill_button_tocart
  document.querySelectorAll('.fill_button_tocart').forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      showNotification();
    });
  });

  // Функція показу сповіщення
  function showNotification() {
    const notification = document.getElementById('notification_tocart');
    notification.style.display = 'block';
    notification.style.opacity = '1';

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 500); // Затримка для плавного зникнення
    }, 2000); // Затримка перед початком зникнення
  }
});

// ФУНКЦІЯ СПИСКУ МІСТ
document.addEventListener('DOMContentLoaded', () => {
  const dropdownTitle = document.querySelector('.dropdown-title_town');
  const dropdownContent = document.querySelector('.dropdown-content_town');

  // Відкриття/закриття випадаючого списку
  dropdownTitle.addEventListener('click', () => {
      const isActive = dropdownTitle.classList.contains('active');

      // Закриваємо всі відкриті випадаючі списки
      document.querySelectorAll('.dropdown-content_town').forEach(item => {
          item.classList.remove('show');
      });

      document.querySelectorAll('.dropdown-title_town').forEach(item => {
          item.classList.remove('active');
      });

      if (!isActive) {
          dropdownContent.classList.add('show');
          dropdownTitle.classList.add('active');
      }
  });

  // Закриття випадаючого списку при кліку поза ним
  window.addEventListener('click', (event) => {
      if (!event.target.closest('.dropdown-title_town')) {
          dropdownContent.classList.remove('show');
          dropdownTitle.classList.remove('active');
      }
  });

  // Оновлення заголовка при виборі пункту
  document.querySelectorAll('.dropdown-content_town a').forEach(item => {
      item.addEventListener('click', (event) => {
          event.preventDefault(); // Запобігання переходу по посиланню
          const selectedText = item.textContent;
          dropdownTitle.querySelector('h4').textContent = selectedText;

          // Закриття випадаючого списку після вибору
          dropdownContent.classList.remove('show');
          dropdownTitle.classList.remove('active');
      });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const dropdownTitles = document.querySelectorAll('.dropdown-title');

  dropdownTitles.forEach(dropdownTitle => {
    const dropdownContent = dropdownTitle.nextElementSibling;

    // Відкриття/закриття випадаючого списку
    dropdownTitle.addEventListener('click', () => {
      const isActive = dropdownContent.classList.contains('show');

      // Закриваємо всі випадаючі списки
      document.querySelectorAll('.dropdown-content').forEach(item => {
        item.classList.remove('show');
      });

      dropdownTitles.forEach(item => {
        item.classList.remove('active');
      });

      // Відкриваємо/закриваємо випадаючий список, якщо він не активний
      if (!isActive) {
        dropdownContent.classList.add('show');
        dropdownTitle.classList.add('active');
      }
    });

    // Оновлення заголовка при виборі пункту
    dropdownContent.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); // Запобігання переходу по посиланню
        const selectedText = item.textContent;
        dropdownTitle.querySelector('h4').textContent = selectedText;

        // Закриття випадаючого списку після вибору
        dropdownContent.classList.remove('show');
        dropdownTitle.classList.remove('active');
      });
    });
  });

  // Закриття випадаючого списку при кліку поза ним
  window.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-content').forEach(item => {
        item.classList.remove('show');
      });

      dropdownTitles.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
});


// ФУНКЦІЯ ПЕРЕХОДУ НА КОЛЕКЦІЇ ПО БЛОКАМИ
document.getElementById('bracelets').addEventListener('click', function() {
  window.location.href = 'braceletes.html';
});

document.getElementById('rings').addEventListener('click', function() {
  window.location.href = 'rings.html';
});

document.getElementById('pendants').addEventListener('click', function() {
  window.location.href = 'pendants.html';
});

document.getElementById('earrings').addEventListener('click', function() {
  window.location.href = 'eairings.html';
});

document.getElementById('coulombs').addEventListener('click', function() {
  window.location.href = 'coulomb.html';
});

document.getElementById('certificates').addEventListener('click', function() {
  window.location.href = 'gift.html';
});


document.addEventListener('DOMContentLoaded', () => {
  // Знаходимо елемент з id 'good_itemto'
  const goodItem = document.getElementById('good_itemto');

  // Додаємо обробник події 'click' до елемента 'good_itemto'
  goodItem.addEventListener('click', () => {
    // Отримуємо значення атрибута href елемента 'a' з класом 'fill_button_tocart'
    const link = goodItem.querySelector('.fill_button_tocart').getAttribute('href');
    
    // Перенаправляємо користувача на сторінку, вказану в атрибуті href
    window.location.href = link;
  });
});
