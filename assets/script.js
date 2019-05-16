class NewsPreview extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.createStyle()
  }

  static get observedAttributes() {
    return ['title', 'size', 'code']
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
      <div class="box">
        <slot name="code"></slot> 
        <i>${this.getAttribute('title')}</i>
      </div>
    `
    let container = this.shadow.appendChild(document.createElement('section'));
    container.innerHTML = template;
    let slot = container.querySelector('slot');
    slot.setAttribute('slot', 'code');
    slot.innerText = this.getAttribute('code');
    this.shadow.appendChild(container)
  }

  setStyle() {
    this.shadowStyles.textContent = `
      .box {
          border: 1px solid #000;
          padding: 10px;
      }
      .box p {
          font-size: ${this.getAttribute('size')}px;
          text-transform: capitalize;
          font-style: italic;
      }
    `;
  }

}

customElements.define('news-preview', NewsPreview);

function add() {
  // fetch('https://www.reddit.com/r/angular.json')
  fetch('https://www.reddit.com/r/webdev.json')
    .then(response => {
      response.json().then(
        response => {
          let data = response.data.children;
          var obj = {};
          data.forEach(function (currentValue, index) {
            let entry = currentValue.data;
            let n = obj[entry.title] = obj[entry.title] || {};
            n.title = entry.title;
            n.author = entry.author;
            n.permalink = entry.permalink;
            n.selftext = entry.selftext;
            // let box = document.body.appendChild(document.createElement('news-preview'));
            // box.setAttribute('title', n.title)
            //////
          })
          let index = 0,
            previous = document.querySelector('.previous'),
            next = document.querySelector('.next'),
            count = 5;
          let items = data.slice(0, count);
          /*разделить на равные части*/
          let array = data;
          let i,j,temparray,chunk = 4;
          for (i=0,j=array.length; i<j; i+=chunk) {
            temparray = array.slice(i,i+chunk);
            console.log(temparray)
          }
          ////////
          items.forEach(function (current, x) {
            let box = document.body.appendChild(document.createElement('section')),
              title = box.appendChild(document.createElement('p')),
              text = box.appendChild(document.createElement('p'));
            let item = current;
            displayItem(item);

            previous.addEventListener('click', function () {
              displayItem(data[--index]);
            });

            next.addEventListener('click', function () {
              displayItem(data[++index]);
            });

            function displayItem(item) {
              title.innerText = item.data.title;
              text.innerText = item.data.name;
              previous.disabled = index <= 0;
              next.disabled = index >= data.length - 1;
            }
          })

        }
      )
    })
}

add()

