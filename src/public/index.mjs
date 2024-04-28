class Client {
  constructor() {
    this.UI = new UI(this);

    this.menu = {
      'menu-1': {
        id: 'menu-1',
        name: '메뉴 이름',
        price: 12000,
        desc: '아아아아아아아',
        category: '추천 메뉴',
      },
      'menu-2': {
        id: 'menu-2',
        name: '메뉴 이름',
        price: 12000,
        desc: '아아아아아아아',
        category: '추천 메뉴',
      },
      'menu-3': {
        id: 'menu-3',
        name: '메뉴 이름',
        price: 12000,
        desc: '아아아아아아아',
        category: '뚜루룹',
      },
      'menu-4': {
        id: 'menu-4',
        name: '메뉴 이름',
        price: 12000,
        desc: '아아아아아아아',
        category: '뚜루룹',
      },
      'menu-5': {
        id: 'menu-5',
        name: '메뉴 이름',
        price: 12000,
        desc: '아아아아아아아',
        category: '뚜루룹',
        image: 'a',
      },
      'menu-6': {
        id: 'menu-6',
        name: '메뉴 이름',
        price: 12000,
        desc: '아아아아아아아',
        category: '뚜루룹',
      },
      'menu-alc-1': {
        id: 'menu-alc-1',
        name: '소주',
        price: 5000,
        desc: '아아아아아아아',
        category: '주류',
      },
      'menu-alc-2': {
        id: 'menu-alc-2',
        name: '맥주',
        price: 5000,
        desc: '아아아아아아아',
        category: '주류',
      },
      'menu-alc-3': {
        id: 'menu-alc-3',
        name: '샌주',
        price: 5000,
        desc: '아아아아아아아',
        category: '주류',
      },
    };
    this.cart = {};

    this.init();
  }

  async init() {
    this.UI.displayMenu();
  }

  async getMenu() {}

  async postCart() {}

  async getHistory() {}

  destroy() {}
}

class UI {
  constructor(client) {
    this.client = client;
    this.element = {
      panel: {
        bottom: document.querySelector('#panel-bottom'),
      },
    };
    this.button = {};

    const buttons = {
      'panel-bottom-left': (event) => {
        const phase = this.element.panel.bottom.getAttribute('phase');
        switch (phase) {
          case 'cart': {
            break;
          }
          case 'order': {
            this.panelBottomClose();
            break;
          }
          default: {
            this.call();
            break;
          }
        }
      },
      'panel-bottom-right': (event) => {
        const phase = this.element.panel.bottom.getAttribute('phase');
        switch (phase) {
          case 'cart': {
            this.panelBottomOrder();
            break;
          }
          case 'order': {
            break;
          }
          default: {
            this.panelBottomCart();
            break;
          }
        }
      },
      'panel-bottom-cart-close': (event) => {
        this.panelBottomClose();
      },
      'panel-bottom-order-close': (event) => {
        this.panelBottomClose();
      },
    };

    for (const buttonID in buttons) {
      const buttonElement = document.querySelector(`#button-${buttonID}`);
      buttonElement.addEventListener('click', buttons[buttonID]);
      const buttonName = buttonID.toUpperCase().replace(/\-/g, '_');
      this.button[buttonName] = buttonElement;
    }
  }

  scroll;

  displayMenu() {
    document.querySelector('#menu').innerHTML = '';

    let categories = {};
    for (const id in this.client.menu) {
      const menu = this.client.menu[id];
      if (!categories[menu.category]) {
        const categoryElement = createCategoryElement(menu.category);
        categories[menu.category] = categoryElement;
      }
      const menuElement = createMenuElement(menu);
      categories[menu.category]
        .querySelector('.content')
        .appendChild(menuElement);
    }

    for (const category in categories) {
      document.querySelector('#menu').appendChild(categories[category]);
    }

    const _this = this;
    function createCategoryElement(data) {
      const element = document.createElement('div');
      element.classList.add('category');
      element.setAttribute('category', data);
      let html = ``;
      html += `<div class="title">${data}</div>`;
      html += `<div class="content">`;
      html += `</div>`;
      element.innerHTML = html;
      return element;
    }
    function createMenuElement(data) {
      const element = document.createElement('div');
      element.classList.add('menu');
      element.setAttribute('menu', data.id);
      let html = ``;
      html += `<div class="wrapper">`;
      if (data.image) {
        html += `  <div class="image">`;
        html += `    <img src="${data.image}" />`;
        html += `  </div>`;
      }
      html += `  <div class="text">`;
      html += `    <div class="desc">`;
      html += `      <div class="title">`;
      html += `        <span class="text">${data.name}</span>`;
      html += `        <div class="buttons">`;
      html += `          <button class="remove"><span class="material-symbols-outlined">remove</span></button>`;
      html += `          <div class="count">0</div>`;
      html += `          <button class="add"><span class="material-symbols-outlined">add</span></button>`;
      html += `        </div>`;
      html += `      </div>`;
      html += `      <div class="content">${data.desc}</div>`;
      html += `    </div>`;
      html += `    <div class="price">${data.price.toLocaleString(
        'ko-KR'
      )} 원</div>`;
      html += `  </div>`;
      html += `</div>`;
      element.innerHTML = html;
      element.addEventListener('click', (event) => {
        let target = event.target;
        while (!target.classList.contains('menu')) {
          target = target.parentElement;
        }
        target.style.background = 'rgba(255, 100, 60, 0.5)';
        setTimeout(() => {
          target.style.background = 'rgba(255, 100, 60, 0)';
          target.style.transition = 'background 0.4s ease-out';
        }, 100);
        setTimeout(() => {
          target.style.background = null;
          target.style.transition = null;
        }, 500);
        /*
        const rect = target.getBoundingClientRect();
        const temp = document.createElement('div');
        temp.style.position = 'absolute';
        temp.style.top = `${rect.top + window.scrollY}px`;
        temp.style.left = `0px`;
        temp.style.width = `${target.offsetWidth}px`;
        temp.style.height = `${target.offsetHeight}px`;
        temp.style.background = 'rgb(255, 100, 60, 0.5)';
        temp.style.borderRadius = '0.5rem';
        temp.style.transition =
          'top 0.5s ease-out, left 0.5s ease-out, ' +
          'width 0.5s ease-out, height 0.5s ease-out, ' +
          'background 0.5s ease-out';
        document.body.appendChild(temp);
        setTimeout(() => {
          const button = _this.button.PANEL_BOTTOM_RIGHT;
          const buttonRect = button.getBoundingClientRect();
          temp.style.top = `${buttonRect.top + window.scrollY}px`;
          temp.style.left = `${buttonRect.left}px`;
          temp.style.width = `${button.offsetWidth}px`;
          temp.style.height = `${button.offsetHeight}px`;
          temp.style.background = 'rgb(255, 100, 60, 0)';
        }, 0);
        setTimeout(() => {
          document.body.removeChild(temp);
        }, 500);*/
      });
      return element;
    }
  }

  call() {
    this.lineMessage('직원을 호출하였습니다. 잠시만 기다려주세요.');
    this.button.PANEL_BOTTOM_LEFT.disabled = true;
    this.button.PANEL_BOTTOM_RIGHT.disabled = true;
    setTimeout(() => {
      this.button.PANEL_BOTTOM_LEFT.disabled = false;
      this.button.PANEL_BOTTOM_RIGHT.disabled = false;
    }, 1000);
  }

  panelBottomCart() {
    this.element.panel.bottom.setAttribute('phase', 'cart');
    this.button.PANEL_BOTTOM_RIGHT.querySelector('.text').innerText =
      '주문하기';
    this.button.PANEL_BOTTOM_LEFT.disabled = true;
    this.button.PANEL_BOTTOM_RIGHT.disabled = true;
    setTimeout(() => {
      this.button.PANEL_BOTTOM_RIGHT.disabled = false;
    }, 1000);
    this.panelBottomUpdate(0);
  }

  panelBottomOrder() {
    this.element.panel.bottom.setAttribute('phase', 'order');
    this.button.PANEL_BOTTOM_LEFT.querySelector('.text').innerText = '닫기';
    this.button.PANEL_BOTTOM_LEFT.disabled = true;
    setTimeout(() => {
      this.button.PANEL_BOTTOM_LEFT.disabled = false;
    }, 1000);
    this.panelBottomUpdate(0);
  }

  panelBottomClose() {
    this.element.panel.bottom.setAttribute('phase', '');
    this.button.PANEL_BOTTOM_LEFT.querySelector('.text').innerText =
      '직원 호출';
    this.button.PANEL_BOTTOM_RIGHT.querySelector('.text').innerText =
      '담은 메뉴 보기';
    this.button.PANEL_BOTTOM_LEFT.disabled = false;
    this.button.PANEL_BOTTOM_RIGHT.disabled = false;
    this.panelBottomUpdate(10);
  }

  panelBottomUpdate(n) {
    const count = this.button.PANEL_BOTTOM_RIGHT.querySelector('.count');
    count.innerText = `메뉴 ${n}개 담음`;
    if (n <= 0) {
      count.setAttribute('phase', 'hide');
    } else {
      count.setAttribute('phase', 'show');
    }
  }

  openHistory() {}

  closeHistory() {}

  lineMessage(content) {
    const messages = document.querySelector('#panel-bottom > .fg-message');
    const message = document.createElement('div');
    message.setAttribute('phase', 'hide');
    message.setAttribute('linemessage', '');
    message.classList.add('message');
    message.innerHTML = content;
    messages.appendChild(message);
    setTimeout(() => {
      message.setAttribute('phase', 'show');
    }, 1);
    setTimeout(() => {
      message.setAttribute('phase', 'hide');
    }, 5000);
    setTimeout(() => {
      messages.removeChild(message);
    }, 5500);
  }
}

window.Client = new Client();

window.modal = async () => {
  return new Promise((resolve) => {
    const background = document.createElement('div');
    background.style.position = 'fixed';
    background.style.width = '100%';
    background.style.height = '100vh';

    const modal = document.createElement('div');
    resolve();
  });
};

document.addEventListener('scroll', (event) => {
  scroll();
});

function scroll() {
  const h = document.querySelector('header');
  const s = scrollY;
  const ht = h.offsetTop;
  const hb = ht + h.clientHeight;

  let p2 = Math.min(100, Math.max(0, (s / ht) * 100));

  const nav = document.querySelector('nav');
  const shadow = document.querySelector('#cover > .shadow');

  shadow.style.background = `rgba(0,0,0,${p2 / 200})`;
  shadow.style.webkitBackdropFilter = `blur(${p2 / 10}px)`;
  shadow.style.backdropFilter = `blur(${p2 / 10}px)`;

  if (s < ht) {
    nav.style.opacity = '0';
    nav.style.pointerEvents = 'none';
  } else {
    nav.style.opacity = '1';
    nav.style.pointerEvents = 'all';
  }
}

scroll();