class NewsPreview extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.createStyle()
    this.createBody()
  }

  static get observedAttributes() {
    return ['image', 'date', 'title', 'author', 'text', 'link', 'comments', 'score']
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.setStyle()
    this.setBody()
  }

  createStyle() {
    this.shadowStyles = document.createElement("style");
    this.shadow.appendChild(this.shadowStyles);
    this.shadowStyles.appendChild(document.createTextNode(``))
  }

  createBody() {
    this.shadowBody = document.createElement('section');
    this.shadow.appendChild(this.shadowBody);
    this.shadowBody.appendChild(document.createTextNode(``))
  }

  setBody() {
    let template = `
      <div class="row main_news">
          <div class="col-lg-6 col-12 main_news_image">
            <div style="background: url(${this.getAttribute('image')})"></div>
            <span>${this.getAttribute('date')}</span>
          </div>
          <div class="col-lg-6 col-12">
            <div class="main_news_content">
              <a href="${this.getAttribute('link')}">
                <h2>${this.getAttribute('title')}</h2>
              </a>
              <div class="main_news_content--date">
                <span>posted by:</span>
                <span>${this.getAttribute('author')}</span>
              </div>
              <p class="main_news_content--text"><slot name="text"></slot></p>
              <div class="main_news_content--links">
                <a href="#">Comments: ${this.getAttribute('comments')}</a>
                <a href="#">Score: ${this.getAttribute('score')}</a>
              </div>
            </div>
          </div>
        </div>
    `
    this.shadowBody.innerHTML = template
  }

  setStyle() {
    this.shadowStyles.textContent = `
                .row{
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
                  margin-right: -15px;
                  margin-left: -15px;
                }
                .col-lg-6{
                  flex: 0 0 50%;
                  max-width: 50%;
                  position: relative;
                  width: 100%;
                  padding-right: 15px;
                  padding-left: 15px;
                  box-sizing: border-box;
                }
                .main_news{
                  margin-bottom: 30px;
                }
                .main_news .main_news_image {
                    position: relative;
                }

                .main_news .main_news_image div {
                    position: relative;
                    background-repeat: no-repeat !important;
                    width: 100%;
                    background-size: 100% !important;
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

                .main_news .main_news_content a{
                    text-decoration: none;
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

function addMainNews() {
  fetch('https://www.reddit.com/r/webdev.json')
    .then(response => {
      response.json().then(
        response => {
          let data = response.data.children;
          let index = 0,
            previous = document.querySelector('.previous'),
            next = document.querySelector('.next'),
            count = 4;
          let items = data.slice(0, count);
          // let container = document.body.appendChild(document.createElement('div'));
          let container = document.getElementById('main_news');
          let jump = document.body.appendChild(document.createElement('article'));

          items.forEach(function (current, x) {
            let box = container.appendChild(document.createElement('news-preview')),
              title = document.createAttribute("title"),
              image = document.createAttribute('image'),
              date = document.createAttribute('date'),
              author = document.createAttribute('author'),
              text = document.createAttribute('text'),
              link = document.createAttribute('link'),
              comments = document.createAttribute('comments'),
              score = document.createAttribute('score');
            let item = current;
            displayItem(item);

            previous.addEventListener('click', function () {
              displayItem(data[--index]);
            });

            next.addEventListener('click', function () {
              displayItem(data[++index]);
            });

            function displayItem(item) {
              title = item.data.title;
              box.setAttribute('title', title);
              /**/
              image = item.data.thumbnail;
              image == 'self' || image == 'default' ? box.setAttribute('image', `assets/img/angular.png`) :
                box.setAttribute('image', image);
              /**/
              link.value = item.data.url;
              box.setAttributeNode(link);
              /**/
              let date_value = item.data.created,
                day = new Date(parseInt(date_value) * 1000);
              date.value = day.toDateString();
              box.setAttributeNode(date);
              /**/
              author.value = item.data.author;
              box.setAttributeNode(author)
              /**/
              comments.value = item.data.num_comments;
              box.setAttributeNode(comments)
              /**/
              score.value = item.data.score;
              box.setAttributeNode(score)
              /**/
              previous.disabled = index <= 0;
              next.disabled = index >= data.length - 1;
            }
          })
        }
      )
    })
}

addMainNews()

class ProgressElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const style = shadow.appendChild(document.createElement('style'));
    style.textContent = `
            .wrapper{
                width: 80%;
                background-color: ${this.getAttribute('background')};
                padding: 0px;
                border-radius: 30px;
                position: relative;
                display: inline-block;
            }
            .progress {
                width: ${this.getAttribute('width')}%;
                height: ${this.getAttribute('height')}px;
                background-color: ${this.getAttribute('color')};
                border-radius: 50px;
                position: relative;
                margin: 0 0px;
              }
              @media (max-width: 991px){
                .wrapper{
                  width: 85%;
                }
              }
        `
    let wrapper = shadow.appendChild(document.createElement('div'));
    wrapper.classList.add('wrapper');
    let progress = wrapper.appendChild(document.createElement('div'));
    progress.classList.add('progress');
  }
}

customElements.define('progress-element', ProgressElement);

