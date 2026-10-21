// ============================================================
// Модальное окно заказа
// ============================================================

const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// Если на странице нет модалки (например, contacts.html),
// просто не выполняем остальной код.
if (orderDialog && orderForm) {
  const selectedProductInput = document.getElementById('selected-product');
  const closeDialogButton = document.getElementById('close-order-dialog');

  // ----------------------------------------------------------
  // Открытие модалки по клику на «Заказать».
  // Используем делегирование: обработчик вешается один раз
  // на документ и работает для любых карточек, в том числе
  // добавленных позже (например, после фильтрации каталога).
  // ----------------------------------------------------------
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.product-card__button');
    if (!button) return;

    const productName = button.dataset.product || '';
    if (selectedProductInput) {
      selectedProductInput.value = productName;
    }

    // Сбрасываем состояние предыдущей заявки перед новым открытием.
    resetFormState();
    orderDialog.showModal();
  });

  // ----------------------------------------------------------
  // Закрытие по кнопке «Закрыть».
  // ----------------------------------------------------------
  if (closeDialogButton) {
    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }

  // ----------------------------------------------------------
  // Сброс формы при любом закрытии модалки
  // (кнопка, Esc, close() из кода).
  // ----------------------------------------------------------
  orderDialog.addEventListener('close', () => {
    resetFormState();
  });

  // ----------------------------------------------------------
  // Отправка формы.
  // ----------------------------------------------------------
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    clearInvalidMarks();

    if (!orderForm.checkValidity()) {
      markInvalidFields();
      orderForm.reportValidity();
      return;
    }

    if (successMessage) {
      successMessage.hidden = false;
    }

    orderForm.reset();
    if (selectedProductInput) {
      selectedProductInput.value = '';
    }
    orderDialog.close();
  });

  // ----------------------------------------------------------
  // Вспомогательные функции
  // ----------------------------------------------------------

  function resetFormState() {
    orderForm.reset();
    if (selectedProductInput) {
      selectedProductInput.value = '';
    }
    clearInvalidMarks();
  }

  function clearInvalidMarks() {
    Array.from(orderForm.elements).forEach((element) => {
      if (element instanceof HTMLElement && 'willValidate' in element) {
        element.removeAttribute('aria-invalid');
      }
    });
  }

  function markInvalidFields() {
    Array.from(orderForm.elements).forEach((element) => {
      if (
        element instanceof HTMLElement &&
        'willValidate' in element &&
        element.willValidate &&
        !element.checkValidity()
      ) {
        element.setAttribute('aria-invalid', 'true');
      }
    });
  }
}