class NewsPreview extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.createStyle()
  }

  static get observedAttributes() {
    return ['image', 'date', 'title', 'author', 'text']
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.createBody()
    this.setStyle()
  }

  createStyle() {
    this.shadowStyles = document.createElement("style");
    this.shadow.appendChild(this.shadowStyles);
    this.shadowStyles.appendChild(document.createTextNode(``))
  }

  createBody() {
    let template = `
      <div class="row main_news">
          <div class="col-lg-6 col-12 main_news_image">
            <div style="background: url(${this.getAttribute('image')})"></div>
            <span>${this.getAttribute('date')}</span>
          </div>
          <div class="col-lg-6 col-12">
            <div class="main_news_content">
              <a href="#">
                <h2>${this.getAttribute('title')}</h2>
              </a>
              <div class="main_news_content--date">
                <span>posted by</span>
                <i class="fas fa-circle"></i>
                <span>${this.getAttribute('author')}</span>
              </div>
              <p class="main_news_content--text"><slot name="text"></slot></p>
              <div class="main_news_content--links">
                <a href="#"><i class="fas fa-comments"></i>20</a>
                <a href="#"><i class="far fa-thumbs-up"></i>17</a>
              </div>
            </div>
          </div>
        </div>
    `
    let container = this.shadow.appendChild(document.createElement('section'));
    container.innerHTML = template;
    let slot = container.querySelector('slot');
    slot.setAttribute('slot', 'text');
    slot.innerText = this.getAttribute('text');
    this.shadow.appendChild(container)
  }

  setStyle() {
    this.shadowStyles.textContent = `
    .main_news .main_news_image {
        position: relative;
    }
    
    .main_news .main_news_image div {
        position: relative;
    }
    
    .main_news .main_news_image div:before {
        display: block;
        content: " ";
        width: 100%;
        padding-top: 56.25%;
    }
    
    .main_news .main_news_image div > .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .main_news .main_news_image span {
        position: absolute;
        right: 35px;
        top: 15px;
        font-size: 14px;
        color: #fff;
        background: #222627;
        padding: 6px 10px;
    }
    
    .main_news .main_news_content {
        margin-bottom: 30px;
    }
    
    .main_news .main_news_content a h2 {
        color: #fff;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 8px;
    }
    
    .main_news .main_news_content a:hover {
        text-decoration: none;
    }
    
    .main_news .main_news_content a:hover h2 {
        color: #DB4437;
    }
    
    .main_news .main_news_content--date {
        font-size: 14px;
        color: #393c3d;
        font-weight: 500;
        margin-bottom: 8px;
    }
    
    .main_news .main_news_content--date i {
        margin: 0 10px;
        font-size: 8px;
        vertical-align: middle;
    }
    
    .main_news .main_news_content--text {
        color: #a6a6a6;
        font-size: 14px;
        font-weight: normal;
        line-height: 2;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin-bottom: 8px;
    }
    
    .main_news .main_news_content--links {
        font-size: 14px;
    }
    
    .main_news .main_news_content--links a {
        margin-right: 20px;
        color: #a6a6a6;
    }
    
    .main_news .main_news_content--links a i {
        margin-right: 5px;
    }
    
    .main_news .main_news_content--links a:hover {
        color: #DB4437;
        text-decoration: none;
    }
    `;
  }

}

customElements.define('news-preview', NewsPreview);
// fetch('https://www.reddit.com/r/webdev.json')

function addMainNews() {
  fetch('https://www.reddit.com/r/angular.json')
    .then(response => {
      response.json().then(
        response => {
          let data = response.data.children;
          let index = 0,
            previous = document.querySelector('.previous'),
            next = document.querySelector('.next'),
            count = 5;
          let items = data.slice(0, count);
          let container = document.body.appendChild(document.createElement('article'));

          items.forEach(function (current, x) {
            let box = container.appendChild(document.createElement('news-preview')),
              title = document.createAttribute("title");
            let item = current;
            displayItem(item);

            function clearNews() {
              box.outerHTML = `<article></article>`;
              box = container.appendChild(document.createElement('news-preview'));
              title = document.createAttribute("title");
            }

            previous.addEventListener('click', function () {
              clearNews();
              displayItem(data[--index]);
            });

            next.addEventListener('click', function () {
              clearNews();
              displayItem(data[++index]);
            });

            function displayItem(item) {
              title.value = item.data.title;
              box.setAttributeNode(title);
              previous.disabled = index <= 0;
              next.disabled = index >= data.length - 1;
            }
          })
        }
      )
    })
}

addMainNews()


